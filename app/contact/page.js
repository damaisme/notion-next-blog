import { getSettings } from "@/lib/notion";
import Contact from "./contact";

export default async function ContactPage() {
  const settings = await getSettings();
  return <Contact settings={settings} />;
}

export const revalidate = 3600;
