import { getAllCategories } from "@/lib/notion";
import Categories from "./categories";

export default async function ContactPage() {
  const categories = await getAllCategories();
  return <Categories categories={categories} />;
}

// export const revalidate = 3600;
