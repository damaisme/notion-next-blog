import { getAllAuthors, getSettings } from "@/lib/notion";
import About from "./about";

export const revalidate = 3600;

export default async function AboutPage() {
  const authors = await getAllAuthors();
  const settings = await getSettings();
  return <About settings={settings} authors={authors} />;
}

// export const revalidate = 3600;

