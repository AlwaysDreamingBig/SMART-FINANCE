"use client";

import { netWorthData } from "@/constants";
import { calculateNetWorthTrend } from "@/lib/utils";
import { NetWorthData } from "@/types";
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
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Net Worth",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function NetWorthTrendChart() {
  const [chartData, setChartData] = useState<NetWorthData[]>([]);
  const [trend, setTrend] = useState<number>(0);

  useEffect(() => {
    const fetchNetWorthData = async () => {
      try {
        // Simulating an API response with the new data values
        setChartData(netWorthData);

        // Calculate the trend once the data is fetched
        const calculatedTrend = calculateNetWorthTrend(netWorthData);
        setTrend(calculatedTrend);
      } catch (error) {
        console.error("Error fetching net worth data:", error);
      }
    };

    fetchNetWorthData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Net Worth Trend</CardTitle>
        <CardDescription>
          Showing your net worth over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)} // Display only first 3 letters of the month
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="netWorth"
              type="linear"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by {trend.toFixed(1)}% this month{" "}
              <TrendingUp className="size-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
