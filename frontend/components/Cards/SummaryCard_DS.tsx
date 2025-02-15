"use client";

import React from "react";

type SummaryCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendColor?: string;
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendColor = "text-gray-500",
}) => {
  return (
    <div className="w-full max-w-sm rounded-lg bg-white p-3 shadow-md transition-shadow duration-200 hover:shadow-lg sm:max-w-md sm:p-4 md:max-w-lg md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-medium text-gray-500 sm:text-sm md:text-lg">
            {title}
          </h3>
          <p className="mt-1 text-sm font-bold sm:text-xl md:text-2xl">
            {value}
          </p>
        </div>
        <div className={`text-xl sm:text-2xl md:text-3xl ${trendColor}`}>
          {icon}
        </div>
      </div>
      {trend && (
        <p className={`mt-1 text-xs sm:text-sm ${trendColor}`}>
          <span>{trend}</span> from last period
        </p>
      )}
    </div>
  );
};

export default SummaryCard;
