import { cn } from "@/lib/utils";
import React from "react";

interface BudgetProgressProps {
  category: string;
  spent: number;
  limit: number;
}

export const BudgetProgress: React.FC<BudgetProgressProps> = ({
  category,
  spent,
  limit,
}) => {
  const percentage = Math.min((spent / limit) * 100, 100); // Cap at 100%
  const isOverBudget = spent > limit;

  return (
    <div className="space-y-2 rounded-xl bg-white p-3 shadow-md">
      <div className="flex items-center justify-between text-sm font-medium">
        <span className="text-gray-800">{category}</span>
        <span
          className={cn("text-gray-600", {
            "font-semibold text-red-500": isOverBudget,
          })}
        >
          ${spent.toLocaleString()} / ${limit.toLocaleString()}
        </span>
      </div>
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={cn(
            "absolute h-full rounded-full transition-all duration-500",
            isOverBudget
              ? "bg-red-500"
              : "bg-gradient-to-r from-blue-500 to-blue-400"
          )}
          style={{ width: `${percentage}%` }}
        >
          {percentage > 15 && (
            <span className="absolute right-2 text-xs font-semibold text-white">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
