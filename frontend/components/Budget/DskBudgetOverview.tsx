import { budgetData } from "@/constants";
import React from "react";

const BudgetOverview: React.FC = () => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Budget Overview</h2>
      <div className="space-y-4">
        {budgetData.map((category) => {
          const remaining = category.budget - category.spent;
          const progress = (category.spent / category.budget) * 100;

          return (
            <div key={category.name} className="space-y-2">
              <div className="flex justify-between">
                <p className="font-medium">{category.name}</p>
                <p className="text-sm text-gray-500">
                  ${remaining.toLocaleString()} remaining
                </p>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-200">
                <div
                  className="h-2.5 rounded-full"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: progress > 80 ? "#EF4444" : "#3B82F6", // Red if over 80%, else blue
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                ${category.spent.toLocaleString()} of $
                {category.budget.toLocaleString()} spent
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetOverview;
