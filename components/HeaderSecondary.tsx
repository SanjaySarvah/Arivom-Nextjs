"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaRegNewspaper, FaBook } from "react-icons/fa";
import { getAllArticles } from "@/lib/getData";

const HeaderSecondary: React.FC = () => {
  const pathname = usePathname();
  const articles = getAllArticles();

  // 🧠 Build Category → Subcategory → Subsubcategory tree dynamically
  const categoryTree = useMemo(() => {
    const map = new Map<
      string,
      {
        id: string;
        title: string;
        slug: string;
        children: {
          id: string;
          title: string;
          slug: string;
          children: { id: string; title: string; slug: string }[];
        }[];
      }
    >();

    articles.forEach((article) => {
      const catKey = article.category?.trim();
      const subKey = article.subcategory?.trim();
      const subSubKey = article.subsubcategory?.trim();

      if (!catKey) return;

      // ✅ Category level
      if (!map.has(catKey)) {
        map.set(catKey, {
          id: catKey,
          title: article.tname || catKey,
          slug: encodeURIComponent(catKey),
          children: [],
        });
      }

      const cat = map.get(catKey)!;

      // ✅ Subcategory level
      if (subKey) {
        let sub = cat.children.find((s) => s.id === subKey);
        if (!sub) {
          sub = {
            id: subKey,
            title: subKey,
            slug: encodeURIComponent(subKey),
            children: [],
          };
          cat.children.push(sub);
        }

        // ✅ Sub-subcategory level
        if (subSubKey && !sub.children.some((x) => x.id === subSubKey)) {
          sub.children.push({
            id: subSubKey,
            title: subSubKey,
            slug: encodeURIComponent(subSubKey),
          });
        }
      }
    });

    return Array.from(map.values());
  }, [articles]);

  return (
    <div className="hidden xl:flex border-t border-gray-200 bg-white h-[80px]">
      <div className="grid grid-cols-12 items-center w-full max-w-[1320px] mx-auto px-[15px]">
        {/* 🔽 Left Column: ARTICLES Dropdown */}
        <div className="col-span-3 flex items-center">
          <div className="relative group flex-shrink-0">
            <button className="flex items-center gap-2 text-white bg-[#0c74d6] px-[14px] py-[16px] rounded-md text-sm font-medium hover:bg-[#0a66be]">
              ARTICLES
              <svg
                className="w-4 h-4 transition-transform group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown menu */}
            <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[240px]">
              <ul className="p-2">
                {categoryTree.map((category) => (
                  <li key={category.id} className="relative group/sub">
                    {/* Category */}
                    <button className="flex w-full items-center justify-between px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md">
                      <span>{category.title}</span>
                      {category.children.length > 0 && (
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>

                    {/* Subcategories */}
                    {category.children.length > 0 && (
                      <ul className="absolute left-full top-0 hidden group-hover/sub:block bg-white border border-gray-200 rounded-md shadow-lg w-56">
                        {category.children.map((sub) => (
                          <li key={sub.id} className="relative group/subsub">
                            <Link
                              href={`/articles/category/${category.slug}/${sub.slug}`}
                              className="flex justify-between items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                            >
                              {sub.title}
                              {sub.children.length > 0 && (
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M9 5l7 7-7 7" />
                                </svg>
                              )}
                            </Link>

                            {/* Sub-subcategories */}
                            {sub.children.length > 0 && (
                              <ul className="absolute left-full top-0 hidden group-hover/subsub:block bg-white border border-gray-200 rounded-md shadow-lg w-56">
                                {sub.children.map((subsub) => (
                                  <li key={subsub.id}>
                                    <Link
                                      href={`/articles/category/${category.slug}/${sub.slug}/${subsub.slug}`}
                                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                                    >
                                      {subsub.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 🔗 Center Navigation */}
        <div className="col-span-6 flex justify-center">
          <nav>
            <ul className="flex gap-6 text-sm font-semibold items-center">
              <li>
                <Link
                  href="/"
                  className={`flex items-center gap-2 ${
                    pathname === "/"
                      ? "text-[#e43131]"
                      : "text-gray-800 hover:text-[#e43131]"
                  }`}
                >
                  <FaHome size={14} />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className={`flex items-center gap-2 ${
                    pathname.startsWith("/news")
                      ? "text-[#e43131]"
                      : "text-gray-800 hover:text-[#e43131]"
                  }`}
                >
                  <FaRegNewspaper size={14} />
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className={`flex items-center gap-2 ${
                    pathname.startsWith("/articles")
                      ? "text-[#e43131]"
                      : "text-gray-800 hover:text-[#e43131]"
                  }`}
                >
                  <FaBook size={14} />
                  Articles
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* ➕ Right Placeholder */}
        <div className="col-span-3 flex justify-end"></div>
      </div>
    </div>
  );
};

export default HeaderSecondary;
