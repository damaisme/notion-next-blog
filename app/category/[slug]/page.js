import { getPostsByCategory, getAllCategories } from "@/lib/notion";
import PostList from "@/components/postlist";
import Container from "@/components/container";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({ slug: cat.name }));
}

export const revalidate = 3600; // Regenerate every 60 seconds

export default async function CategoryPage({ params }) {
  var {slug} = await params
  slug = decodeURIComponent(slug)
  const posts = await getPostsByCategory(slug);

  return (
    <Container>
      <h1 className="text-center text-3xl font-bold mt-10 mb-6 capitalize">
        {slug}
      </h1>
      {posts.length > 0 ? (
        <div className="grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {posts.map((post) => (
            <PostList key={post.slug} post={post} aspect="square" />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No posts available for this category.
        </p>
      )}
    </Container>
  );
}

