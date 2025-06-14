import PostPage from "./post";

import { getAllPostSlugs, getPostBySlug } from "@/lib/notion";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  // console.log(slugs)
  return slugs  
}


export async function generateMetadata({ params }) {
  const { slug } = await params;

  let post;
  let retries = 3;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      post = await getPostBySlug(slug);
      break; // sukses, keluar dari loop
    } catch (error) {
      if (attempt === retries) {
        // kalau sudah percobaan terakhir dan tetap gagal
        throw new Error(`Failed to fetch post after ${retries} attempts: ${error.message}`);
      }
      // opsional: tunggu sebentar sebelum retry (contoh: 500ms)
      await new Promise(res => setTimeout(res, 500));
    }
  }


  return {
    title: `${post.title} | ${settings.blog_name}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
    },
  };
}


// export async function generateMetadata({ params }) {
//   const post = await getPostBySlug(params.slug);
//   return { title: post.title };
// }

// export const runtime = 'nodejs';

// export default async function PostDefault({ params }) {
//   const {slug} = await params
//   const post = await getPostBySlug(slug);
//   return <PostPage post={post} />;
// }

export default async function PostDefault({ params }) {
  const { slug } = await params;

  let post;
  let retries = 3;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      post = await getPostBySlug(slug);
      break; // sukses, keluar dari loop
    } catch (error) {
      if (attempt === retries) {
        // kalau sudah percobaan terakhir dan tetap gagal
        throw new Error(`Failed to fetch post after ${retries} attempts: ${error.message}`);
      }
      // opsional: tunggu sebentar sebelum retry (contoh: 500ms)
      await new Promise(res => setTimeout(res, 500));
    }
  }

  return <PostPage post={post} />;
}


// export const revalidate = 60;
