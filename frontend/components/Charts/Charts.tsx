import { ChartData } from "@/types";
import React from "react";
import { Bar, Line, Pie, Radar } from "react-chartjs-2";
// _app.tsx or a dedicated config file
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: ChartData;
  xAxis?: string;
  yAxis?: string | string[];
}

export const BarChart: React.FC<ChartProps> = ({
  data,
  xAxis = "x",
  yAxis = "y",
}) => (
  <Bar
    data={data}
    options={{
      scales: {
        x: { title: { display: true, text: xAxis } },
        y: {
          title: {
            display: true,
            text: Array.isArray(yAxis) ? yAxis.join(" / ") : yAxis,
          },
        },
      },
    }}
  />
);

export const LineChart: React.FC<ChartProps> = ({
  data,
  xAxis = "x",
  yAxis = "y",
}) => (
  <Line
    data={data}
    options={{
      scales: {
        x: { title: { display: true, text: xAxis } },
        y: {
          title: {
            display: true,
            text: Array.isArray(yAxis) ? yAxis.join(" / ") : yAxis,
          },
        },
      },
    }}
  />
);

export const PieChart: React.FC<ChartProps> = ({ data }) => <Pie data={data} />;

export const RadarChart: React.FC<ChartProps> = ({ data }) => (
  <Radar data={data} />
);
