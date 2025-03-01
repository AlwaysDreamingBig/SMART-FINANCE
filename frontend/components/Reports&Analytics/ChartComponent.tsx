// components/Reports/ChartComponent.tsx
import { reportData } from "@/constants";
import { ChartData } from "@/types";
import React from "react";
import { BarChart, LineChart, PieChart, RadarChart } from "../Charts/Charts";

// Get the valid keys of reportData
type ReportKeys = keyof typeof reportData;

interface ChartComponentProps {
  selectedReport: ReportKeys;
  chartType: "bar" | "line" | "pie" | "radar";
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  selectedReport,
  chartType,
}) => {
  const data = reportData[selectedReport] as ChartData;

  switch (chartType) {
    case "bar":
      return <BarChart data={data} xAxis="Month" yAxis="Amount" />;
    case "line":
      return (
        <LineChart data={data} xAxis="Month" yAxis={["Income", "Expenses"]} />
      );
    case "pie":
      return <PieChart data={data} />;
    case "radar":
      return <RadarChart data={data} />;
    default:
      return <BarChart data={data} xAxis="Month" yAxis="Amount" />;
  }
};

export default ChartComponent;
