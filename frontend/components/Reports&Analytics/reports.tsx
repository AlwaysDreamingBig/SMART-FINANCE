"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ChartComponent from "./ChartComponent";
import ChartControls from "./ChartControls";
import DateRangeSelector, { DateRange } from "./DateRangeSelector";
import FinancialHealthSnapshot from "./FinancialHealthSnapshot";
import ReportSelector from "./ReportSelector";

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<
    | "expenseSummary"
    | "incomeVsExpenses"
    | "spendingByCategory"
    | "financialHealth"
    | "custom"
  >("expenseSummary");
  const [dateRange, setDateRange] = useState<DateRange[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chartType, setChartType] = useState<"bar" | "line" | "pie" | "radar">(
    "bar"
  );
  const [comparisonMode, setComparisonMode] = useState(false);

  // Close Date Range Picker when the user clicks outside the modal
  const handleCloseModal = () => setShowDatePicker(false);

  return (
    <div className="space-y-6 bg-gray-50 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800"
      >
        Financial Insights
      </motion.h1>

      {/* Control Bar */}
      <ChartControls
        chartType={chartType}
        setChartType={setChartType}
        comparisonMode={comparisonMode}
        setComparisonMode={setComparisonMode}
      />

      {/* Button to Trigger Date Range Modal */}
      <button
        onClick={() => setShowDatePicker(true)}
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white"
      >
        Select Date Range
      </button>

      {/* Modal for Date Range Selector */}
      {showDatePicker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={handleCloseModal}
        >
          <div
            className="w-full max-w-6xl rounded-lg bg-white p-6"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <DateRangeSelector
              dateRange={dateRange}
              setDateRange={setDateRange}
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Report Selector */}
        <ReportSelector
          selectedReport={selectedReport}
          setSelectedReport={setSelectedReport}
        />

        {/* Main Visualization */}
        <div className="lg:col-span-2">
          {selectedReport === "financialHealth" ? (
            <FinancialHealthSnapshot />
          ) : (
            <ChartComponent
              selectedReport={selectedReport}
              chartType={chartType}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
