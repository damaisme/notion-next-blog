"use client";

import { Fragment, useEffect } from "react";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import Container from "@/components/container";
import Link from "next/link";
import cx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "@/styles/nprogress.css";
import ThemeSwitch from "@/components/themeSwitch";

export default function Navbar(props) {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    NProgress.done();
    return () => {
      NProgress.remove();
    };
  }, [pathname]);

  const leftmenu = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Links", href: "/link" },
    { label: "Contact", href: "/contact" },
    { label: "Archive", href: "/archive" },
  ];

  const rightmenu = [
    { label: "Category", href: "/category" },
    { label: "Search", href: "/search" },
  ];

  const menu = [...leftmenu, ...rightmenu];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div className="w-full sticky top-0 z-20 bg-white dark:bg-black">
      <Container>
        <nav>
          <Disclosure as="div">
            {({ open }) => (
              <>
                {/* BLOG NAME */}
                <div className="flex justify-between md:justify-center items-center">
                  <Link
                    href="/"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {props.blog_name}
                  </Link>

                  <div className="flex items-center gap-3 md:hidden">
                    <ThemeSwitch />
                    <Disclosure.Button
                      aria-label="Toggle Menu"
                      className="rounded-md px-2 py-1 text-gray-600 dark:text-gray-300"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {open ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        )}
                      </svg>
                    </Disclosure.Button>
                  </div>
                </div>

                {/* DESKTOP MENU */}
                <div className="hidden md:flex items-center justify-center gap-2 pt-2">
                  {menu.map((item, index) => (
                    <Fragment key={`${item.label}${index}`}>
                      {item.children ? (
                        <DropdownMenu
                          menu={item}
                          items={item.children}
                          active={isActive(item.href)}
                        />
                      ) : (
                        <Link
                          href={item.href}
                          className={cx(
                            "relative px-4 py-2 text-sm font-medium transition-colors",
                            isActive(item.href)
                              ? "text-blue-600 dark:text-blue-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-blue-600 dark:after:bg-blue-400"
                              : "text-gray-600 hover:text-blue-500 dark:text-gray-400"
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </Fragment>
                  ))}
                  <ThemeSwitch />
                </div>

                {/* MOBILE MENU */}
                <Disclosure.Panel className="md:hidden mt-3">
                  <div className="flex flex-col">
                    {menu.map((item, index) => (
                      <Fragment key={`${item.label}${index}`}>
                        {item.children ? (
                          <DropdownMenu
                            menu={item}
                            items={item.children}
                            mobile
                          />
                        ) : (
                          <Disclosure.Button
                            as={Link}
                            href={item.href}
                            className={cx(
                              " py-3 text-sm font-medium",
                              isActive(item.href)
                                ? "text-blue-600 underline underline-offset-4"
                                : "text-gray-600 hover:text-blue-500 dark:text-gray-400"
                            )}
                          >
                            {item.label}
                          </Disclosure.Button>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </nav>
      </Container>
    </div>
  );
}

const DropdownMenu = ({ menu, items, mobile, active }) => {
  return (
    <Menu as="div" className={cx("relative", mobile && "w-full")}>
      {({ open }) => (
        <>
          <Menu.Button
            className={cx(
              "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors",
              active
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 hover:text-blue-500 dark:text-gray-400",
              mobile && "w-full justify-between"
            )}
          >
            {menu.label}
            <ChevronDownIcon className="h-4 w-4" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-20 mt-2 w-56 rounded-md bg-white shadow-lg dark:bg-gray-800">
              <div className="py-2">
                {items.map((item, index) => (
                  <Menu.Item key={`${item.title}${index}`}>
                    {({ active }) => (
                      <Link
                        href={item.path || "#"}
                        className={cx(
                          "block px-5 py-2 text-sm",
                          active
                            ? "text-blue-600"
                            : "text-gray-700 hover:text-blue-500 dark:text-gray-300"
                        )}
                      >
                        {item.title}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

