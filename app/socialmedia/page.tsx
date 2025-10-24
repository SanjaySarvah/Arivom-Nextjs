// app/social-media/page.tsx
"use client";

import { useState } from "react";
import SocialTabs from "./components/SocialTabs";
import TrendGrid from "./components/TrendGrid";
import { mockTrends } from "./data/mockTrends";

export default function SocialMediaPage() {
  const [activeTab, setActiveTab] = useState("instagram");
  const current = mockTrends[activeTab as keyof typeof mockTrends];

  // ✅ Combine videos and memes into one array
  const combinedItems = [...current.videos, ...current.memes];

  // ✅ Optional: Sort by ID ascending or descending
  // For descending (latest first):
  combinedItems.sort((a, b) => b.id - a.id);
  // For ascending (oldest first): combinedItems.sort((a, b) => a.id - b.id);

  return (
    <div className="container mx-auto px-4 py-10">
   
      <SocialTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* ✅ Single grid for all items */}
      <TrendGrid items={combinedItems} sectionTitle="🔥 Trending Now" />
    </div>
  );
}
