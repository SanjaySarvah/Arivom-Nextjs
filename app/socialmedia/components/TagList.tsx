// app/social-media/components/TagList.tsx

interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">🔥 Trending Tags</h2>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-gray-700 transition"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
