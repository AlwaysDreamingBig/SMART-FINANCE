import { BarChart, Repeat, TrendingDown, Wallet } from "lucide-react";
import { StatCard } from "../utils/StatCard";

export function StatisticsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <StatCard
        title="Total Balance"
        value="$45,230.89"
        trend={2.5}
        icon={<Wallet />}
      />
      <StatCard
        title="Monthly Spend"
        value="$12,430.00"
        trend={-1.8}
        icon={<TrendingDown />}
      />
      <StatCard
        title="Recurring Payments"
        value="23"
        trend={4.2}
        icon={<Repeat />}
      />
      <StatCard
        title="Average Daily"
        value="$412.30"
        trend={0.5}
        icon={<BarChart />}
      />
    </div>
  );
}
