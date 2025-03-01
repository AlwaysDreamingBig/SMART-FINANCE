// components/Reports/ChartControls.tsx
import React from "react";
import { FaChartLine, FaFileCsv, FaFileExcel, FaFilePdf } from "react-icons/fa";

interface ChartControlsProps {
  chartType: "bar" | "line" | "pie" | "radar";
  setChartType: (type: "bar" | "line" | "pie" | "radar") => void;
  comparisonMode: boolean;
  setComparisonMode: (mode: boolean) => void;
}

const ChartControls: React.FC<ChartControlsProps> = ({
  chartType,
  setChartType,
  comparisonMode,
  setComparisonMode,
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-xl bg-white p-4 shadow-sm md:flex-row md:items-center">
      <div className="flex flex-wrap gap-2">
        <select
          value={chartType}
          onChange={(e) =>
            setChartType(e.target.value as "bar" | "line" | "pie" | "radar")
          }
          className="rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200"
        >
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="radar">Radar Chart</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          <FaFilePdf /> PDF
        </button>
        <button className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600">
          <FaFileCsv /> CSV
        </button>
        <button className="flex items-center gap-2 rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600">
          <FaFileExcel /> Excel
        </button>
      </div>

      <button
        onClick={() => setComparisonMode(!comparisonMode)}
        className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200"
      >
        <FaChartLine />
        {comparisonMode ? "Exit Comparison" : "Compare Periods"}
      </button>
    </div>
  );
};

export default ChartControls;
