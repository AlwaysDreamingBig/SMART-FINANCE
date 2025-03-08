import { BaseChartData, Transaction } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, PieChart, Wallet } from "lucide-react";
import IncomeChart from "../charts/IncomeBarChart";
import SpendingChart from "../charts/SpendingChart";
import { TrendLineChart } from "../charts/TrendLineChart";

interface AnalyticsTabsProps {
  transactions: Transaction[];
  trendData: BaseChartData[];
}

export function AnalyticsTabs({ transactions, trendData }: AnalyticsTabsProps) {
  return (
    <Tabs defaultValue="spending" className="w-full">
      <TabsList>
        <TabsTrigger value="spending">
          <PieChart className="mr-2 size-4" /> Spending
        </TabsTrigger>
        <TabsTrigger value="income">
          <Wallet className="mr-2 size-4" /> Income
        </TabsTrigger>
        <TabsTrigger value="trends">
          <BarChart className="mr-2 size-4" /> Trends
        </TabsTrigger>
      </TabsList>
      <TabsContent value="spending">
        <SpendingChart transactions={transactions} />
      </TabsContent>
      <TabsContent value="income">
        <IncomeChart transactions={transactions} />
      </TabsContent>
      <TabsContent value="trends">
        <TrendLineChart trendData={trendData} />
      </TabsContent>
    </Tabs>
  );
}
