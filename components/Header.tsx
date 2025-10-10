"use client";

import React from "react";
import HeaderPrimary from "./HeaderPrimary";
import { usePathname } from "next/navigation";
import CommonFooter from "./CommonFooter";
import DetailFooter from "./Common/DetailViews/DetailFooter";

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="w-full bg-white">
      {/* First Row - Logo, Social Icons, Profile (scrolls away) */}
      <HeaderPrimary />

      {/* Footer Section */}
      {pathname.match(/\/(news|articles)\/[^\/]+$/) ? <DetailFooter /> : <CommonFooter />}
    </header>
  );
};

export default Header;
