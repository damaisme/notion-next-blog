"use client"; // <-- Tandai sebagai Client Component

// Pindahkan semua import yang berhubungan dengan UI ke sini
import Link from "next/link";
import Container from "@/components/container";
import PostList from "@/components/postlist";

// Komponen ini menerima 'posts' sebagai props
export default function HomePageClient({ settings, posts }) {
  // Semua JSX yang tadinya ada di page.js, sekarang ada di sini.
  return (
    <>
      {posts && posts.length > 0 && (
        <Container>
          <div className="text-center">
            <p className="text-lg">{settings?.quotes}<br/>- {settings.quotesBy}</p>
          </div>
          <div className="grid mt-8 gap-10 md:grid-cols-2 lg:gap-10 ">
            {posts.slice(0, 2).map(post => (
              <PostList
                key={post.slug}
                post={post}
                aspect="landscape"
                preloadImage={true}
              />
            ))}
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
            {posts.slice(2, 14).map(post => (
              <PostList key={post.slug} post={post} aspect="square" />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/archive"
              className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
            >
              <span>View all Posts</span>
            </Link>
          </div>
        </Container>
      )}
    </>
  );
}
