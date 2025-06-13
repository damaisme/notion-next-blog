"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/container";
import PostList from "@/components/postlist";

export default function Search({ posts }) {
  const [query, setQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);

    const results = posts.filter((post) =>
      [post.title, post.author.name, ...post.categories.map((cat) => cat.title)]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery)
    );
    setFilteredPosts(results);
  };

  return (
    <Container>
      <div className="mx-auto max-w-screen-md">
      <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
        Search Post
      </h1>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search by title"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Display Results */}
        {filteredPosts.length > 0 ? (
          <>
            <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
              {filteredPosts.slice(0, 14).map((post) => (
                <PostList
                  key={post.id}
                  post={post}
                  aspect="landscape"
                  preloadImage={true}
                />
              ))}
            </div>

          </>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No posts found for "{query}"
          </p>
        )}

        {/* "View All Posts" Link */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/archive"
            className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300">
            <span>View all Posts</span>
          </Link>
        </div>
      </div>
    </Container>
  );
}

