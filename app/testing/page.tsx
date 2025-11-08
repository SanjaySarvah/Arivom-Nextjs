"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TestingPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const apiUrl =
      "https://datahub.webappgenie.com/api/categories?type=News&options=all";

    fetch(apiUrl)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        const json = await res.json();
        setCategories(json.data || []);
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        setError("CORS or network issue. Please enable ModHeader!");
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        🗂 Categories
      </h2>

      {error && <div className="text-red-500 mb-3">{error}</div>}

      {!error && categories.length === 0 && <div>Loading...</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`testing/category/${cat.id}/${cat.slug}`}
            className="block border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {cat.title}
            </h3>
            <p className="text-sm text-gray-500">{cat.engname}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
