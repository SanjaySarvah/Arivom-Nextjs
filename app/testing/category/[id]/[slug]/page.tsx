'use client';

import { useEffect, useState } from 'react';

interface Params {
  id: string;
  slug: string;
}

export default function CategoryPage({ params }: { params: Params }) {
  const { id, slug } = params;
  const [categoryData, setCategoryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategoryInfo = async () => {
      try {
        const apiUrl = `https://datahub.webappgenie.com/api/categories/info?category_id=${id}&include_children=1&needs_articles=1&paginate_posts=1&posts_per_page=5`;
        const res = await fetch(apiUrl);

        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data = await res.json();
        setCategoryData(data);
      } catch (err: any) {
        console.error('Fetch Error:', err);
        setError('Failed to load data. Please check CORS or API connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryInfo();
  }, [id]);

  if (loading) return <div className="p-8 text-gray-500">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  const category = categoryData?.category;
  const children = categoryData?.children?.data || [];
  const posts = categoryData?.posts?.data || [];

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          {category?.title} ({slug})
        </h2>
        <p className="text-gray-500 mt-1">{category?.engname}</p>
      </div>

      {/* Subcategories */}
      {children.length > 0 && (
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Subcategories</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {children.map((child: any) => (
              <div
                key={child.id}
                className="p-4 bg-gray-50 border rounded-lg shadow-sm hover:bg-gray-100 transition"
              >
                <p className="font-medium text-gray-800">{child.name}</p>
                <p className="text-sm text-gray-500">{child.slug}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Posts */}
      <section>
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Recent Posts</h3>
        {posts.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {posts.map((post: any) => (
              <div
                key={post.id}
                className="border rounded-xl p-5 bg-white shadow hover:shadow-md transition"
              >
                <h4 className="text-lg font-bold text-gray-800 mb-1">{post.title}</h4>
                <p className="text-sm text-gray-500 mb-2">{post.slug}</p>
                <div
                  className="text-gray-600 text-sm line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.short_description }}
                />
                <p className="mt-3 text-xs text-blue-600 font-medium">
                  Type: {post.article_type?.toUpperCase() || 'N/A'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No posts available for this category.</p>
        )}
      </section>
    </div>
  );
}
