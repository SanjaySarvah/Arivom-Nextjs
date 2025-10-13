"use client";
import { FC } from "react";
import Link from "next/link";

interface ReadMoreButtonProps {
  href: string;
}

const ReadMoreButton: FC<ReadMoreButtonProps> = ({ href }) => (
  <Link
    href={href}
    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white text-xs sm:text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg"
    style={{ backgroundColor: "var(--secondary)" }}
  >
    Read More
  </Link>
);

export default ReadMoreButton;
