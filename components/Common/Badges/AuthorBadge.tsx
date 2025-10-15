"use client";

import { FiUser } from "react-icons/fi";
import React from "react";

interface AuthorBadgeProps {
  author: string;
  icon?: React.ReactElement;
  className?: string;
}

const AuthorBadge: React.FC<AuthorBadgeProps> = ({
  author,
  icon = <FiUser className="w-3.5 h-3.5 text-gray-500 text-xs" />,
  className = "",
}) => {
  return (
    <span className={`flex items-center text-xs gap-1.5 ${className}`}>
      {icon}
      <span className="font-medium  text-xs text-black">{author}</span>
    </span>
  );
};

export default AuthorBadge;
