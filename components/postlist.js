import Image from "next/image";
import Link from "next/link";
import { cx } from "@/utils/all";
import { parseISO, format } from "date-fns";
import { PhotoIcon } from "@heroicons/react/24/solid";
import CategoryLabel from "@/components/blog/category";

export default function PostList({
  post,
  aspect,
  minimal,
  pathPrefix,
  preloadImage,
  fontSize,
  fontWeight
}) {

  return (
    <>
      <div
        className={cx(
          "group cursor-pointer",
        )}>
        {/* IMAGE — HIDDEN WHEN minimal === true */}
        {!minimal && (
          <div
            className={cx(
              "overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800"
            )}
          >
            <Link
              className={cx(
                "relative block",
                aspect === "landscape"
                  ? "aspect-video"
                  : aspect === "custom"
                    ? "aspect-[5/4]"
                    : "aspect-square"
              )}
              href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${post.slug}`}
            >
              {post?.cover ? (
                <Image
                  src={post.cover}
                  alt={post?.mainImage?.alt || "Thumbnail"}
                  priority={!!preloadImage}
                  className="object-cover transition-all"
                  fill
                  sizes="(max-width: 768px) 30vw, 33vw"
                />
              ) : (
                <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200">
                  <PhotoIcon />
                </span>
              )}
            </Link>
          </div>
        )}

        <div className={cx(minimal && "")}>
          <div>
            <CategoryLabel
              categories={post.categories}
              nomargin={minimal}
            />
            <h2
              className={cx(
                minimal ? "mt-0" : "mt-2",
                fontSize === "large"
                  ? "text-2xl"
                  : "text-lg",
                fontWeight === "normal"
                  ? "line-clamp-2 font-medium  tracking-normal text-black"
                  : "font-semibold leading-snug tracking-tight",
                "dark:text-white"
              )}>
              <Link
                href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${post.slug
                  }`}>
                <span
                  className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom
      bg-no-repeat
      transition-[background-size]
      duration-300
      hover:bg-[length:100%_3px]
      active:bg-[length:100%_3px]
      focus:bg-[length:100%_3px]
      group-hover:bg-[length:100%_10px]
      group-focus:bg-[length:100%_10px]
      group-active:bg-[length:100%_10px]
      dark:from-purple-800 dark:to-purple-900">
                  {post.title}
                </span>
              </Link>
            </h2>

            <div className="hidden">
              {post.excerpt && (
                <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                  <Link
                    href={`/post/${pathPrefix ? `${pathPrefix}/` : ""
                      }${post.slug}`}>
                    {post.excerpt}
                  </Link>
                </p>
              )}
            </div>

            <div className={cx(
              minimal ? "" : "mt-3",
              "flex items-center space-x-3 text-gray-500 dark:text-gray-400")}>
              <Link className={`${minimal ? "hidden" : ""}`} href={`/author/${post?.author?.slug}`}>
                <div className="flex items-center gap-3">
                  <div className="relative h-5 w-5 flex-shrink-0">
                    {post?.author?.avatar_url && (
                      <Image
                        src={post?.author?.avatar_url}
                        alt={post?.author?.name}
                        priority={true}
                        className="rounded-full object-cover"
                        fill
                        sizes="20px"
                      />
                    )}
                  </div>
                  <span className="truncate text-sm">
                    {post?.author?.name}
                  </span>
                </div>
              </Link>
              <span className={`${minimal ? "hidden" : ""} text-xs text-gray-300 dark:text-gray-600`}>
                &bull;
              </span>
              <time
                className="truncate text-sm"
                dateTime={post?.published || post._createdAt}>
                {format(
                  parseISO(post?.published || post._createdAt),
                  "MMMM dd, yyyy"
                )}
              </time>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
