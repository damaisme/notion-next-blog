import { getPublishedPosts } from "@/lib/notion";
import SearchPage from "./search";

export const revalidate = 3600;

export default async function Home() {
  const posts = await getPublishedPosts();
  return <SearchPage posts={posts} />;
}
