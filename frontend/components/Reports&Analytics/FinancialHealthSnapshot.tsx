// components/Reports/FinancialHealthSnapshot.tsx
import { reportData } from "@/constants";
import React from "react";
import { motion } from "framer-motion";

const FinancialHealthSnapshot: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 rounded-xl bg-white p-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Net Worth</h3>
        <span className="text-xl font-bold text-green-500">
          ${reportData.financialHealth.netWorth.toLocaleString()}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Debt-to-Income Ratio</span>
          <span
            className={`font-semibold ${reportData.financialHealth.debtToIncomeRatio > 0.35 ? "text-red-500" : "text-green-500"}`}
          >
            {(reportData.financialHealth.debtToIncomeRatio * 100).toFixed(1)}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-blue-500"
            style={{
              width: `${Math.min(reportData.financialHealth.debtToIncomeRatio * 100, 100)}%`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default FinancialHealthSnapshot;
