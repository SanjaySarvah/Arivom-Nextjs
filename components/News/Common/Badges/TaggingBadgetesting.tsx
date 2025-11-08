import React, { useEffect, useState } from "react";

export interface TaggingBadgeProps {
  tag?: string | string[];
  intervalMs?: number; // rotation interval (milliseconds)
}

const TaggingBadge: React.FC<TaggingBadgeProps> = ({ tag, intervalMs = 2000 }) => {
  const [currentTag, setCurrentTag] = useState<string>("");

  // ✅ Convert tag to array safely
  const tags = Array.isArray(tag)
    ? tag
    : typeof tag === "string"
    ? (() => {
        try {
          // if string is JSON-like
          const parsed = JSON.parse(tag);
          if (Array.isArray(parsed)) return parsed.map(String);
        } catch {
          // fallback for CSV-style strings
          return tag.replace(/[\[\]"]/g, "").split(",").map((t) => t.trim());
        }
        return [];
      })()
    : [];

  useEffect(() => {
    if (tags.length === 0) return;
    let index = 0;
    setCurrentTag(tags[index]); // show first tag

    const id = setInterval(() => {
      index = (index + 1) % tags.length;
      setCurrentTag(tags[index]);
    }, intervalMs);

    return () => clearInterval(id);
  }, [tag, intervalMs]);

  if (tags.length === 0) return null;

  return (
    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-700">
      {currentTag}
    </span>
  );
};

export default TaggingBadge;
