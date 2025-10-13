"use client";

import React from "react";
import HeaderPrimary from "./HeaderPrimary";
import { usePathname } from "next/navigation";
import CommonFooter from "./CommonFooter";
import DetailFooter from "./Common/DetailViews/DetailFooter";
import DetailsHeader from "./DetailsHeader";

const Header: React.FC = () => {
  const pathname = usePathname();

  // Check if current path is a detail page
  const isDetailPage = pathname.match(/\/(news|articles)\/[^\/]+$/);

  return (
    <header className="w-full bg-white">
      {isDetailPage ? (
        // Show only DetailsHeader on detail pages
        <DetailsHeader />
      ) : (
        // Show regular header layout on non-detail pages
        <>
          <HeaderPrimary />
          <CommonFooter />
        </>
      )}
    </header>
  );
};

export default Header;