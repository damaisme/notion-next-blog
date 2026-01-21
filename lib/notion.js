import { Client } from "@notionhq/client"
import { NotionToMarkdown } from "notion-to-md"
import crypto from "crypto"
import { uploadToR2 } from "./r2"

/* ======================================================
   NOTION CLIENT
====================================================== */
const notion = new Client({ auth: process.env.NOTION_SECRET })
const n2md = new NotionToMarkdown({ notionClient: notion })

const postDatabaseId = process.env.NOTION_POST_DATABASE_ID
const settingDatabaseId = process.env.NOTION_SETTING_DATABASE_ID
const authorDatabaseId = process.env.NOTION_AUTHOR_DATABASE_ID
const linkDatabaseId = process.env.NOTION_LINK_DATABASE_ID

/* ======================================================
   GLOBAL IN-MEMORY CACHE
====================================================== */
const cache = {
  authors: null,
  authorMap: null,
  posts: null,
  settings: null,
  links: null,
}

// Notion signed URL -> R2 URL
const imageUrlCache = new Map()


export function clearNotionCache() {
  cache.posts = null
  cache.authors = null
  cache.settings = null
  cache.links = null
}

/* ======================================================
   IMAGE MIRROR (NOTION -> R2) + CACHE
====================================================== */
export async function mirrorNotionImage(url) {
  if (!url) return null

  // bukan image notion
  if (!url.includes("amazonaws.com")) {
    return url
  }

  // cache hit
  if (imageUrlCache.has(url)) {
    return imageUrlCache.get(url)
  }

  const res = await fetch(url, { redirect: "follow" })
  const contentType = res.headers.get("content-type") || ""

  if (!contentType.startsWith("image/")) {
    console.warn("mirrorNotionImage: bukan image", contentType)
    return url
  }

  const buffer = Buffer.from(await res.arrayBuffer())

  // uploadToR2 WAJIB pakai hash dari buffer
  const r2Url = await uploadToR2(buffer, url)

  imageUrlCache.set(url, r2Url)
  return r2Url
}

/* ======================================================
   FIX MARKDOWN IMAGE (CONTENT)
====================================================== */
export async function fixMarkdownImages(markdown) {
  if (!markdown) return markdown

  const regex = /!\[([^\]]*)\]\((https:\/\/prod-files-secure[^\s)]+)\)/g
  const matches = [...markdown.matchAll(regex)]

  let result = markdown

  for (const match of matches) {
    const originalUrl = match[2]
    const mirrored = await mirrorNotionImage(originalUrl)
    result = result.replace(originalUrl, mirrored)
  }

  return result
}

/* ======================================================
   AUTHORS (CACHED)
====================================================== */
export async function getAllAuthors() {
  if (cache.authors) return cache.authors

  const response = await notion.databases.query({
    database_id: authorDatabaseId,
  })

  const authors = await Promise.all(
    response.results.map(async (author) => {
      const image =
        author.properties.Image?.files?.[0]?.file?.url ||
        author.properties.Image?.files?.[0]?.external?.url ||
        null

      return {
        id: author.id,
        name: author.properties.Name?.title?.[0]?.plain_text || "",
        slug: author.properties.Slug?.rich_text?.[0]?.plain_text || "",
        bio: author.properties.Bio?.rich_text?.[0]?.plain_text || "",
        avatar_url: image ? await mirrorNotionImage(image) : null,
      }
    })
  )

  cache.authors = authors
  cache.authorMap = new Map(authors.map((a) => [a.id, a]))

  return authors
}

/* ======================================================
   POSTS (LIST) – CACHED
====================================================== */

export async function getPublishedPosts() {
  if (cache.posts) return cache.posts

  const response = await notion.databases.query({
    database_id: postDatabaseId,
    filter: {
      property: "Status",
      status: { equals: "Published" },
    },
    sorts: [{ property: "Publish Date", direction: "descending" }],
  })

  const authors = await getAllAuthors()
  const authorMap = cache.authorMap

  const posts = await Promise.all(
    response.results.map(async (page) => {
      const cover =
        page.cover?.external?.url || page.cover?.file?.url || null

      return {
        id: page.id,
        title: page.properties.Title?.title?.[0]?.plain_text || "",
        slug: page.properties.Slug?.rich_text?.[0]?.plain_text || "",
        published: page.properties["Publish Date"]?.date?.start,
        cover: cover ? await mirrorNotionImage(cover) : null,
        author: authorMap.get(
          page.properties["Author"]?.relation?.[0]?.id
        ),
        categories: page.properties["Category"]?.multi_select || [],
      }
    })
  )

  cache.posts = posts
  return posts
}


export async function getAuthorPostsBySlug(slug) {
  const authors = await getAllAuthors()
  const author = authors.find((a) => a.slug === slug)

  if (!author) return []

  const posts = await getPublishedPosts()

  return posts.filter(
    (post) => post.author?.id === author.id
  )
}

/* ======================================================
   SINGLE POST
====================================================== */
export async function getPostBySlug(slug) {
  const posts = await getPublishedPosts()
  const basePost = posts.find((p) => p.slug === slug)
  if (!basePost) return null

  const response = await notion.databases.query({
    database_id: postDatabaseId,
    filter: {
      property: "Slug",
      rich_text: { equals: slug },
    },
    page_size: 1,
  })

  if (!response.results.length) return null

  const page = response.results[0]

  const mdblocks = await n2md.pageToMarkdown(page.id)
  const mdString = await n2md.toMarkdownString(mdblocks)

  return {
    ...basePost,
    excerpt: page.properties.Excerpt?.rich_text?.[0]?.plain_text || "",
    content: await fixMarkdownImages(mdString.parent),
    cover: await mirrorNotionImage(basePost.cover),
  }
}

/* ======================================================
   PAGINATION
====================================================== */
export async function getPaginatedPosts({ pageIndex = 1, limit = 10 }) {
  const allPosts = await getPublishedPosts()

  const start = (pageIndex - 1) * limit
  const end = start + limit

  return allPosts.slice(start, end)
}


/* ======================================================
   CATEGORIES
====================================================== */
export async function getAllCategories() {
  const posts = await getPublishedPosts()
  const categories = posts.flatMap((p) => p.categories)

  const seen = new Set()
  return categories.filter((c) => {
    const key = JSON.stringify(c)
    return seen.has(key) ? false : seen.add(key)
  })
}

/* ======================================================
   POSTS BY CATEGORY
====================================================== */
export async function getPostsByCategory(category) {
  const posts = await getPublishedPosts()
  return posts.filter((p) =>
    p.categories.some((c) => c.name === category)
  )
}

/* ======================================================
   SETTINGS (CACHED)
====================================================== */
export async function getSettings() {
  if (cache.settings) return cache.settings

  const response = await notion.databases.query({
    database_id: settingDatabaseId,
  })

  const settings = response.results[0]
  const mdblocks = await n2md.pageToMarkdown(settings.id)
  const mdString = await n2md.toMarkdownString(mdblocks)

  cache.settings = {
    blog_name: settings.properties["Blog Name"]?.title?.[0]?.plain_text,
    quotes: settings.properties.Quotes?.rich_text?.[0]?.plain_text,
    description:
      settings.properties.Description?.rich_text?.[0]?.plain_text,
    quotesBy:
      settings.properties["Quotes By"]?.rich_text?.[0]?.plain_text,
    logo: await mirrorNotionImage(
      settings.properties.Logo?.files?.[0]?.file?.url
    ),
    favicon: await mirrorNotionImage(
      settings.properties.Favicon?.files?.[0]?.file?.url
    ),
    mainImage: await mirrorNotionImage(
      settings.properties["Main Image"]?.files?.[0]?.file?.url
    ),
    about: mdString.parent,
    email: settings.properties.Email?.email,
    phone: settings.properties.Phone?.phone_number,
    w3ckey:
      settings.properties["Web3forms Key"]?.rich_text?.[0]?.plain_text,
  }

  return cache.settings
}

/* ======================================================
   LINKS (CACHED)
====================================================== */
export async function getAllLinks() {
  if (cache.links) return cache.links

  const response = await notion.databases.query({
    database_id: linkDatabaseId,
  })

  cache.links = await Promise.all(
    response.results.map(async (page) => {
      const image =
        page.properties.Image?.files?.[0]?.file?.url ||
        page.properties.Image?.files?.[0]?.external?.url ||
        null

      return {
        id: page.id,
        title: page.properties.Name?.title?.[0]?.plain_text ?? "",
        description:
          page.properties.Description?.rich_text?.[0]?.plain_text ?? "",
        url: page.properties.Link?.url ?? "",
        image: image ? await mirrorNotionImage(image) : null,
      }
    })
  )

  return cache.links
}

/* ======================================================
   SLUGS
====================================================== */
export async function getAllPostSlugs() {
  const posts = await getPublishedPosts()
  return posts.filter((p) => p.slug).map((p) => ({ slug: p.slug }))
}

