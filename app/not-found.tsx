import Link from 'next/link';
import Container from "@/components/container"

export default function NotFound() {
  return (
    <>
    <Container className="flex flex-col mt-5 items-center justify-center bg-white dark:bg-black">
      <h1 className="text-9xl font-extrabold tracking-widest text-gray-900 dark:text-white">404</h1>
      <div className="absolute rotate-12 rounded bg-blue-600 px-2 text-sm text-white">
        Page Not Found!
      </div>
      <div className="mt-8 text-center">
        <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Waduh!
        </p>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          Sorry, we couldn't find the page you were looking for.
        </p>
      </div>
    </Container>
    </>
  );
}
