import React from "react";
import { motion } from "framer-motion";

// Make sure to match the union type for selectedReport
export interface ReportSelectorProps {
  selectedReport:
    | "expenseSummary"
    | "incomeVsExpenses"
    | "spendingByCategory"
    | "financialHealth"
    | "custom";
  setSelectedReport: (
    report:
      | "expenseSummary"
      | "incomeVsExpenses"
      | "spendingByCategory"
      | "financialHealth"
      | "custom"
  ) => void;
}

const ReportSelector: React.FC<ReportSelectorProps> = ({
  selectedReport,
  setSelectedReport,
}) => {
  const reportTypes: (
    | "expenseSummary"
    | "incomeVsExpenses"
    | "spendingByCategory"
    | "financialHealth"
    | "custom"
  )[] = [
    "expenseSummary",
    "incomeVsExpenses",
    "spendingByCategory",
    "financialHealth",
    "custom",
  ];

  return (
    <motion.div layout className="rounded-xl bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Report Types</h2>
      <div className="space-y-2">
        {reportTypes.map((report) => (
          <motion.button
            key={report}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedReport(report)}
            className={`w-full rounded-lg p-3 text-left ${selectedReport === report ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
          >
            {report
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ReportSelector;
