"use client";

import React from "react";
import { usePathname } from "next/navigation";
import CommonFooter from "./CommonFooter";
import DetailFooter from "./Common/DetailViews/DetailFooter";
import DetailsHeader from "./DetailsHeader";
import HeaderPrimary from "./HeaderPrimary";
import MobileHeader from "../components/Common/MobileHeader";

const Header: React.FC = () => {
  const pathname = usePathname();
  const isDetailPage = pathname.match(/\/(news|articles)\/[^\/]+$/);

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <header className="w-full bg-white">
      {isDetailPage ? (
        <DetailsHeader />
      ) : (
        <>
          {/* Show only MobileHeader on mobile, HeaderPrimary on desktop */}
          {!isMobile && <HeaderPrimary />}
          {isMobile && <MobileHeader />}

          <CommonFooter />
        </>
      )}
    </header>
  );
};

export default Header;
