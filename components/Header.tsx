"use client";
import React from "react";
import HeaderPrimary from "./HeaderPrimary";
import HeaderSecondary from "./HeaderSecondary";
import CommonFooter from "./CommonFooter";
import DetailFooter from "./Common/DetailViews/DetailFooter";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-gray-200 bg-white shadow-sm">
      <HeaderPrimary />
      <HeaderSecondary />
      {pathname.match(/\/(news|articles)\/[^\/]+$/) ? <DetailFooter /> : <CommonFooter />}
    </header>
  );
};

export default Header;
