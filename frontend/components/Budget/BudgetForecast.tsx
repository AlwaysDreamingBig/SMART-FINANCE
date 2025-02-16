import { motion } from "framer-motion";

// Budget Forecasting Card
export const BudgetForecast = ({
  spendingTrend,
  allocated,
  period,
}: {
  spendingTrend: number;
  allocated: number;
  period: "weekly" | "monthly" | "yearly";
}) => {
  const projected = allocated + allocated * (spendingTrend / 100);
  const status = projected > allocated ? "Over Budget" : "Under Budget";

  return (
    <motion.div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
      <h3 className="mb-4 font-semibold">Spending Forecast ({period})</h3>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Projected {period} Spend
          </p>
          <p className="text-2xl font-bold">${projected.toLocaleString()}</p>
          <span
            className={`text-sm ${projected > allocated ? "text-red-500" : "text-green-500"}`}
          >
            {status} ({spendingTrend}%)
          </span>
        </div>
        <div className="size-24">
          <svg viewBox="0 0 100 100">
            <path
              d="M50 10 L90 90 L10 90 Z"
              className="fill-current text-blue-100"
              transform={`rotate(${spendingTrend > 0 ? 180 : 0} 50 50)`}
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
