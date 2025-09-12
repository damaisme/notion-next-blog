import AuthorPage from "./author";

import { getAllPostsSlugs, getPostBySlug, getAllAuthors, getAllAuthorsSlugs, getAuthorPostsBySlug } from "@/lib/notion";

export const revalidate = 3600;


export async function generateStaticParams() {
  const authors = await getAllAuthors(); // Fetch all authors to pre-generate pages

  return authors.map((author) => ({
    slug: author.slug,
  }));
}

function bioToMetaDescription(bio, maxLength = 160) {
  if (!bio || !Array.isArray(bio)) return "";

  const plainText = bio
    .map((block) =>
      block.children
        .map((child) => child.text)
        .join("")
    )
    .join(" ");

  // Truncate to maxLength and append ellipsis if necessary
  return plainText.length > maxLength
    ? `${plainText.slice(0, maxLength).trim()}…`
    : plainText;
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const authors = await getAllAuthors();
  const author = authors.find((author) => author.slug === slug)
  const description = bioToMetaDescription(author.bio)


  return {
    title: author.name,
    description: description || "A great post on our blog.",
    headline: author.name,
    openGraph: {
      images: [
        {
          url: author.avatar_url || "/img/opengraph.jpg",
          width: 800,
          height: 600
        }
      ]
    },
    image: author.image,
    authors: {
      name: author.name,
    },
    twitter: {
      title: `${author?.name} | Filonef.id`,
      card: "summary_large_image"
    },
  };
}

export default async function AuthorDefault({ params }) {
  const { slug } = await params
  const authors = await getAllAuthors();
  const author = authors.find((author) => author.slug == slug)

  const posts = await getAuthorPostsBySlug(slug)

  return <AuthorPage author={author} posts={posts} />;
}

