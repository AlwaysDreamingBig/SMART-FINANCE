import { BudgetHistoryProps } from "@/types";
import { useMemo } from "react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(ArcElement, Tooltip, Legend);

// Budget History Timeline
export const BudgetHistory = ({ period, history }: BudgetHistoryProps) => {
  const filteredHistory = useMemo(
    () => history.filter((entry) => entry.period === period),
    [history, period]
  );

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
      <h3 className="mb-4 font-semibold">Budget History ({period})</h3>
      <div className="space-y-4">
        {filteredHistory.map((entry, i) => (
          <motion.div
            key={`${entry.date}-${i}`}
            className="flex items-center gap-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-700"
            whileHover={{ x: 5 }}
          >
            <div
              className={`flex size-8 items-center justify-center rounded-full ${
                entry.type === "spending"
                  ? "bg-red-100 text-red-600"
                  : entry.type === "allocation"
                    ? "bg-blue-100 text-blue-600"
                    : entry.type === "adjustment"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-100 text-gray-600"
              }`}
            >
              {entry.type === "spending"
                ? "↓"
                : entry.type === "allocation"
                  ? "↑"
                  : entry.type === "adjustment"
                    ? "↔"
                    : "✕"}
            </div>
            <div className="flex-1">
              <p className="font-medium">{entry.category}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {entry.date.toLocaleDateString()}
              </p>
              {entry.description && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {entry.description}
                </p>
              )}
            </div>
            <span
              className={`font-semibold ${
                entry.type === "spending"
                  ? "text-red-600"
                  : entry.type === "deletion"
                    ? "text-gray-600"
                    : "text-green-600"
              }`}
            >
              ${Math.abs(entry.amount).toLocaleString()}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
