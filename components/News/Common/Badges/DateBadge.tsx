"use client";

import { FiClock } from "react-icons/fi";
import React from "react";

interface DateBadgeProps {
  date: string | Date;
  formatDate?: (date: string | Date) => string;
  icon?: React.ReactElement;
  className?: string;
}

const DateBadge: React.FC<DateBadgeProps> = ({
  date,
  formatDate = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString();
  },
  icon = <FiClock className="w-3.5 h-3.5 text-black text-xs" />, // 🖤 icon color changed
  className = "",
}) => {
  return (
    <span className={`flex items-center gap-1.5 text-xs text-black ${className}`}> {/* 🖤 text color added */}
      {icon}
      <span className="font-small">{formatDate(date)}</span>
    </span>
  );
};

export default DateBadge;
