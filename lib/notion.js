import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({ auth: process.env.NOTION_SECRET });
const n2md = new NotionToMarkdown({ notionClient: notion });
const postDatabaseId = process.env.NOTION_POST_DATABASE_ID;
const settingDatabaseId = process.env.NOTION_SETTING_DATABASE_ID
const authorDatabaseId = process.env.NOTION_AUTHOR_DATABASE_ID
const linkDatabaseId = process.env.NOTION_LINK_DATABASE_ID

export async function getAllAuthors() {
  const response = await notion.databases.query({
    database_id: authorDatabaseId,
  });

  return response.results.map((author) => ({
    id: author.id,
    name: author.properties.Name.title[0].plain_text,
    slug: author.properties.Slug?.rich_text[0].plain_text,
    bio: author.properties.Bio?.rich_text[0].plain_text,
    avatar_url: author.properties.Image.files[0].file.url
  }));
}

export async function getAllLinks() {
  const response = await notion.databases.query({
    database_id: linkDatabaseId,
  });

  return response.results.map((page) => ({
    id: page.id,
    title: page.properties.Name?.title?.[0]?.plain_text ?? "",
    description:
      page.properties.Description?.rich_text?.[0]?.plain_text ?? "",
    url: page.properties.Link?.url ?? "",
    image:
      page.properties.Image?.files?.[0]?.file?.url ??
      page.properties.Image?.files?.[0]?.external?.url ??
      null,
  }));
}

export async function getAuthorPostsBySlug(slug) {
  const allAuthors = await getAllAuthors()
  const author = allAuthors.find((author) => author.slug === slug)

  const response = await notion.databases.query({
    database_id: postDatabaseId,
    filter: {
      and: [
        {
          property: "Status",
          status: {
            equals: "Published",
          },
        },
        {
          property: "Author",
          relation: {
            contains: author.id,
          },
        },
      ],
    },
    sorts: [
      {
        property: "Publish Date",
        direction: "descending",
      },
    ],
  });

  return response.results.map((page) => ({
    id: page.id,
    title: page.properties.Title.title[0]?.plain_text,
    slug: page.properties.Slug?.rich_text[0]?.plain_text,
    published: page.properties["Publish Date"]?.date?.start,
    cover: page.cover.external.url,
    author: allAuthors.find((a) => a.id == page.properties["Author"].relation[0].id),
    categories: page.properties["Category"].multi_select,
  }));
}


export async function getSettings() {
  const response = await notion.databases.query({
    database_id: settingDatabaseId,
  });

  const settings = response.results[0]

  const mdblocks = await n2md.pageToMarkdown(settings.id);
  const mdString = await n2md.toMarkdownString(mdblocks);

  return {
    blog_name: settings.properties["Blog Name"].title[0].plain_text,
    quotes: settings.properties.Quotes?.rich_text[0]?.plain_text,
    description: settings.properties.Description?.rich_text[0]?.plain_text,
    quotesBy: settings.properties["Quotes By"]?.rich_text[0]?.plain_text,
    logo: settings.properties.Logo?.files[0]?.file?.url,
    favicon: settings.properties.Favicon?.files[0]?.file?.url,
    mainImage: settings.properties["Main Image"]?.files[0]?.file?.url,
    about: mdString.parent,
    email: settings.properties.Email?.email,
    phone: settings.properties.Phone?.phone_number,
    w3ckey: settings.properties["Web3forms Key"]?.rich_text[0]?.plain_text,
  };
}


export async function getPublishedPosts() {
  const response = await notion.databases.query({
    database_id: postDatabaseId,
    filter: {
      property: "Status",
      status: { equals: "Published" },
    },
    sorts: [
      {
        property: "Publish Date",
        direction: "descending",
      },
    ],
  });
  //
  const allAuthors = await getAllAuthors()
  // console.log(allAuthors)

  // console.log(response.results[0].properties.Author.relation[0])

  return response.results.map((page) => ({
    id: page.id,
    title: page.properties.Title.title[0]?.plain_text,
    slug: page.properties.Slug.rich_text[0]?.plain_text,
    published: page.properties["Publish Date"]?.date?.start,
    cover: page.cover.external.url,
    author: allAuthors.find((a) => a.id == page.properties["Author"].relation[0].id),
    categories: page.properties["Category"].multi_select,
  }));
}

export async function getPaginatedPosts({ pageIndex = 1, limit = 10 }) {
  // 1. Fetch all published posts once. This is okay for a small to medium-sized blog.
  const allPosts = await getPublishedPosts();

  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);

  const paginatedPosts = allPosts.slice(pageIndex, limit);

  return paginatedPosts;
}

export async function getPostBySlug(slug) {
  // console.log(slug)
  try {
    const response = await notion.databases.query({
      database_id: postDatabaseId,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
      page_size: 1,
    });


    if (response.results.length === 0) {
      console.warn(`Halaman dengan slug "${slug}" tidak ditemukan.`);
      return null;
    }

    const page = response.results[0];

    const mdblocks = await n2md.pageToMarkdown(page.id);
    const mdString = await n2md.toMarkdownString(mdblocks);

    // console.log(page.properties["Author"])
    const allAuthors = await getAllAuthors()

    return {
      id: page.id,
      title: page.properties.Title.title[0]?.plain_text,
      slug: page.properties.Slug.rich_text[0]?.plain_text,
      excerpt: page.properties.Excerpt.rich_text[0]?.plain_text,
      published: page.properties["Publish Date"]?.date.start,
      author: allAuthors.find((a) => a.id == page.properties["Author"].relation[0].id),
      content: mdString.parent,
      cover: page.cover.external.url,
      categories: page.properties["Category"].multi_select,
    }
    return {
      properties: page.properties,
      content: mdString,
    };
  } catch (error) {
    console.error("Gagal mengambil halaman dari Notion:", error);
    throw new Error("Gagal mengambil data halaman.");
  }
}

export async function getAllPostSlugs() {
  const posts = await getPublishedPosts();

  const validPosts = posts.filter(post => post.slug);

  return validPosts.map((post) => {
    return {
      slug: post.slug,
    };
  });
}

export async function getAllCategories() {
  const posts = await getPublishedPosts();
  const categories = posts.flatMap(post => post.categories)

  const seen = new Set();
  const categoriesUnique = categories.filter(item => {
    const key = JSON.stringify(item);
    return seen.has(key) ? false : seen.add(key);
  });

  return categoriesUnique
}

export async function getPostsByCategory(category) {
  const response = await notion.databases.query({
    database_id: postDatabaseId,
    filter: {
      and: [
        {
          property: "Status",
          status: {
            equals: "Published",
          },
        },
        {
          property: "Category",
          multi_select: {
            contains: category,
          },
        },
      ],
    },
    sorts: [
      {
        property: "Publish Date",
        direction: "descending",
      },
    ],
  });

  const allAuthors = await getAllAuthors()

  return response.results.map((page) => ({
    id: page.id,
    title: page.properties.Title.title[0]?.plain_text,
    slug: page.properties.Slug?.rich_text[0]?.plain_text,
    published: page.properties["Publish Date"]?.date.start,
    cover: page.cover.external.url,
    author: allAuthors.find((a) => a.id == page.properties["Author"].relation[0].id),
    categories: page.properties["Category"].multi_select,
  }));
}

