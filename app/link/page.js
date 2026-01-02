import Container from "@/components/container";
import Link from "next/link";
import Image from "next/image";
import { getAllLinks } from "@/lib/notion";

export const revalidate = 60;

export default async function LinkPage() {
  const links = await getAllLinks();

  return (
    <Container>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Links
        </h1>

        <div className="space-y-6">
          {links.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-200 p-5 transition hover:border-blue-500 dark:border-gray-800"
            >
              {item.image && (
                <div className="mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={300}
                    className="rounded-md object-cover"
                  />
                </div>
              )}

              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h2>

              {item.description && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              )}

              {item.url && (
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Visit link →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

