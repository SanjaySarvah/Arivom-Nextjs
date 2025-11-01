"use client";
import { FC } from "react";
import Link from "next/link";

interface ReadMoreButtonProps {
  href: string;
}

const ReadMoreButton: FC<ReadMoreButtonProps> = ({ href }) => (
  <Link
    href={href}
    className="group inline-flex hover:text-[var(--secondary)] "
  >

    
    {/* Arrow */}
    <div >
      <div className="w-8 h-8 rounded-full bg-[var(--secondarylight)] group-hover:bg-[var(--secondary)] flex items-center justify-center transition-colors">
        <svg
          className="w-4 h-4 text-white group-hover:text-white transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  </Link>
);

export default ReadMoreButton;