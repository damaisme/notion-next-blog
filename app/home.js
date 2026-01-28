
"use client";

import Link from "next/link";
import Container from "@/components/container";
import PostList from "@/components/postlist";

function hasCategory(post, name) {
  return post.categories?.some(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}

export default function HomePageClient({ settings, posts }) {
  if (!posts || posts.length === 0) return null;

  // ===== CATEGORY NAMES =====
  const ENGINEERING = "Engineering";
  const CYBER = "Cyber Security";

  // ===== FILTER POSTS =====
  const engineeringPosts = posts.filter((post) =>
    hasCategory(post, ENGINEERING)
  );

  const cyberPosts = posts.filter((post) =>
    hasCategory(post, CYBER)
  );

  const lifePosts = posts.filter(
    (post) =>
      !hasCategory(post, ENGINEERING) &&
      !hasCategory(post, CYBER)
  );

  return (
    <Container>
      {/* QUOTES */}
      <div className="text-center">
        <p className="text">
          {settings?.quotes}
          <br />- {settings?.quotesBy}
        </p>
      </div>



      {/* ================= ENGINEERING ================= */}
      {engineeringPosts.length > 0 && (
        <>
          <h1 className="mt-12 text-xl font-bold">
            <Link href={"/category/Engineering"}> Engineering</Link>
          </h1>
          <div className="grid mt-4 gap-10 gap-y-4 md:grid-cols-2 ">
            {engineeringPosts.slice(0, 1).map((post) => (
              <PostList
                key={post.slug}
                post={post}
                aspect={"landscape"}
                preloadImage
              />
            ))}
            <div className="grid gap-x-10 gap-y-4 md:grid-cols-2 ">
              {engineeringPosts.slice(1, 8).map((post) => (
                <PostList
                  key={post.slug}
                  post={post}
                  minimal
                />
              ))}
            </div>
          </div>
        </>
      )}


      {/* ================= CYBER SECURITY ================= */}
      {cyberPosts.length > 0 && (
        <>
          <h1 className="mt-12 text-xl font-bold">
            <Link href={"/category/Cyber Security"}>Cyber Security</Link>
          </h1>
          <div className="grid mt-4 gap-10 gap-y-4  md:grid-cols-2">
            {cyberPosts.slice(0, 1).map((post) => (
              <PostList
                key={post.slug}
                post={post}
                aspect={"landscape"}
                preloadImage
              />
            ))}
            <div className="grid gap-x-10 gap-y-4 md:grid-cols-2 ">
              {cyberPosts.slice(1, 8).map((post) => (
                <PostList
                  key={post.slug}
                  post={post}
                  minimal
                />
              ))}
            </div>
          </div>
        </>
      )}


      {/* ================= LIFE ================= */}
      {lifePosts.length > 0 && (
        <>
          <h1 className="mt-12 text-xl font-bold">
            <Link href={"/category/Engineering"}>Life & Curiosity</Link>
          </h1>
          <div className="grid mt-4 gap-10 gap-y-4 md:grid-cols-2 ">
            {lifePosts.slice(0, 1).map((post) => (
              <PostList
                key={post.slug}
                post={post}
                aspect="landscape"
                preloadImage
              />
            ))}
            <div className="grid gap-x-10 gap-y-4 md:grid-cols-2 ">
              {lifePosts.slice(1, 8).map((post) => (
                <PostList
                  key={post.slug}
                  post={post}
                  minimal
                />
              ))}
            </div>
          </div>

        </>
      )}







      {/* CTA */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/archive"
          className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
        >
          <span>View all Posts</span>
        </Link>
      </div>
    </Container>
  );
}

