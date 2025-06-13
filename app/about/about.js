import Container from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function About({ authors, settings }) {
  return (
    <Container>
      <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
        About
      </h1>
      <article className="mx-auto max-w-screen-md ">
        <div className="prose mx-auto my-3 dark:prose-invert md:text-md break-words">
          {settings.about && <ReactMarkdown>{settings.about}</ReactMarkdown>}
        </div>
      </article>
    </Container>
  );
}
