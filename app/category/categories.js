import Link from "next/link";

import Container from "@/components/container";

export default function CategorySection({ categories }) {
  return (
  <Container>
    <div className="mx-auto max-w-screen-md">
      <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
        Category
      </h1>
      <div className="flex flex-wrap gap-4 mt-6 items-center justify-center">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.name}`}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  </Container>
  );
}

