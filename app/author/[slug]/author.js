"use client"
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { useState, useEffect } from "react";
import PostList from "@/components/postlist";

export default function AuthorPage({ author, posts }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set this to true once the component is mounted on the client
  }, []);


  return (
    <Container>
      <div className="mx-auto max-w-screen-md text-center">
        <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full">
          {author.avatar_url && (
            <Image
              src={author.avatar_url}
              alt={author.name}
              fill
              sizes="200px"
              className="object-cover"
            />
          )}
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
          {author.name}
  </h1>
        <div className="mt-2 text-gray-600 dark:text-gray-400">

          <div className="prose mx-auto my-3 dark:prose-invert prose-a:text-blue-600 text-sm md:text-md">
          {author.bio && <div>{author.bio}</div> || "This author has not added a bio yet."}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-screen-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
          Latest Posts by {author.name}
        </h2>
              <div className="grid mt-16  gap-10 md:grid-cols-2 lg:gap-10 ">
                  {posts
                    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)) // sort by newest first
                    .slice(0, 2).map(post => (
                    <PostList
                      key={post.title}
                      post={post}
                      aspect="landscape"
                      preloadImage={true}
                    />
                  ))}
              </div>
      </div>
    </Container>
  );
}

