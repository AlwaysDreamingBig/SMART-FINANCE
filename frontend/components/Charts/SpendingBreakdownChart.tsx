"use client";

import { spendingData } from "@/constants";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

// Color palette with fewer colors than categories
const colorPalette = [
  "#FF6347", // Tomato for Housing
  "#4682B4", // Steel blue for Transport
  "#32CD32", // Lime green for Food
  "#FFCC00", // Yellow for Utilities
  "#8A2BE2", // Blue violet for additional categories
];

const chartConfig = {
  label: {
    label: "Spending Breakdown",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function SpendingBreakdown() {
  const [chartData, setChartData] = useState<any[]>([]);

  // Fetch real data or simulate it from an API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating an API fetch with real data
        setTimeout(() => {
          const dataWithColors = spendingData.map((item, index) => ({
            ...item,
            fill: colorPalette[index % colorPalette.length], // Assign color from palette dynamically
          }));
          setChartData(dataWithColors);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error here if needed
      }
    };

    fetchData();
  }, []);

  if (chartData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{chartConfig.label.label}</CardTitle>{" "}
        {/* Using label text */}
        <CardDescription>Monthly spending categories</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              label
              nameKey="name"
              fill="fill"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing breakdown of monthly expenses
        </div>
      </CardFooter>
    </Card>
  );
}
