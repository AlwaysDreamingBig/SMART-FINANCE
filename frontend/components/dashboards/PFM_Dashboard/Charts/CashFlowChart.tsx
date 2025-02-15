"use client";

import { cashFlowData } from "@/constants";
import { calculateCashFlowTrend } from "@/lib/utils";
import { CashFlowData } from "@/types";
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
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CashFlowChart() {
  const [chartData, setChartData] = useState<CashFlowData[]>([]);

  // Fetch data from your API or simulate it here
  useEffect(() => {
    const fetchData = async () => {
      setChartData(cashFlowData);
    };

    fetchData();
  }, []);

  if (chartData.length === 0) {
    return <div>Loading...</div>;
  }

  const incomeTrend = calculateCashFlowTrend(chartData, "income");
  const expensesTrend = calculateCashFlowTrend(chartData, "expenses");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash Flow Chart</CardTitle>
        <CardDescription>Income vs. Expenses (Jan - May 2024)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="income" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="expenses" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by {incomeTrend.toFixed(2)}% this month{" "}
          <TrendingUp className="size-4" />
        </div>
        <div className="flex gap-2 font-medium leading-none">
          Expenses trending {expensesTrend.toFixed(2)}% this month
        </div>
        <div className="leading-none text-muted-foreground">
          Showing income vs. expenses from January to May 2024
        </div>
      </CardFooter>
    </Card>
  );
}
