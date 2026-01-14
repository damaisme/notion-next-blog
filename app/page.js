import { getPublishedPosts, getSettings } from "../lib/notion";
import HomePageClient from "./home";

export const revalidate = 3600;


export async function generateMetadata() {
  const settings = await getSettings();

  return {
    title: {
      default: settings.blog_name,
      template: `%s | ${settings.blog_name}`,
    },
    description: settings.description,
    openGraph: {
      title: settings.blog_name,
      description: settings.description,
      images: [settings.mainImage],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.blog_name,
      description: settings.description,
      images: [settings.mainImage],
    },
    icons: {
      icon: settings.favicon,
    },
  };
}

export default async function Home() {
  const posts = await getPublishedPosts();
  const settings = await getSettings();
  return <HomePageClient settings={settings} posts={posts} />;
}
