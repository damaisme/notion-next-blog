import { getPublishedPosts } from "@/lib/notion";
import SearchPage from "./search"; 

export const revalidate = 100;

export default async function Home() {
  const posts = await getPublishedPosts();
  return <SearchPage posts={posts} />;
}
