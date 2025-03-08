"use client";

import { Transaction } from "@/types";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

interface SpendingChartProps {
  transactions: Transaction[];
}

const SpendingChart: React.FC<SpendingChartProps> = ({ transactions }) => {
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const groupedData = expenseTransactions.reduce<{
    [key: string]: {
      amount: number;
      tags: string[];
      frequency?: string;
      notes?: string;
    };
  }>((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = {
        amount: 0,
        tags: [],
        frequency: transaction.recurring?.frequency,
        notes: transaction.notes,
      };
    }
    acc[transaction.category].amount += transaction.amount;
    acc[transaction.category].tags = [
      ...new Set([...acc[transaction.category].tags, ...transaction.tags]),
    ];
    return acc;
  }, {});

  const chartData = Object.keys(groupedData).map((category, index) => ({
    name: category,
    value: groupedData[category].amount,
    fill: COLORS[index % COLORS.length],
    tags: groupedData[category].tags.join(", "),
    frequency: groupedData[category].frequency,
    notes: groupedData[category].notes,
  }));

  const id = "expense-chart";
  const [activeCategory, setActiveCategory] = React.useState(
    chartData[0]?.name || ""
  );
  const activeIndex = React.useMemo(
    () => chartData.findIndex((item) => item.name === activeCategory),
    [activeCategory]
  );
  const categories = React.useMemo(
    () => chartData.map((item) => item.name),
    [chartData]
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={{ value: { label: "Amount" } }} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Expense Breakdown</CardTitle>
          <CardDescription>Track your spending</CardDescription>
        </div>
        <Select value={activeCategory} onValueChange={setActiveCategory}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a category"
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {categories.map((key) => (
              <SelectItem
                key={key}
                value={key}
                className="rounded-lg [&_span]:flex"
              >
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="flex size-3 shrink-0 rounded-sm"
                    style={{ backgroundColor: `var(--color-${key})` }}
                  />
                  {key}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={{ value: { label: "Amount" } }}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          ${chartData[activeIndex]?.value?.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {chartData[activeIndex]?.name}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;
