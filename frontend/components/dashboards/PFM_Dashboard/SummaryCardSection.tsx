import { financeData } from "@/constants";
import { calculateTrend } from "@/lib/utils";
import React from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaChartLine,
  FaPiggyBank,
  FaWallet,
} from "react-icons/fa";
import SummaryCard from "@/components/Cards/SummaryCard_DS";

const SummaryCardsSection: React.FC = () => {
  // Destructure data
  const { current, previous } = financeData;

  // Calculate trends
  const totalBalanceTrend = calculateTrend(
    current.totalBalance,
    previous.totalBalance
  );
  const totalIncomeTrend = calculateTrend(
    current.totalIncome,
    previous.totalIncome
  );
  const totalExpensesTrend = calculateTrend(
    current.totalExpenses,
    previous.totalExpenses
  );
  const savingsRateTrend = calculateTrend(
    current.savingsRate,
    previous.savingsRate
  );
  const netWorthTrend = calculateTrend(current.netWorth, previous.netWorth);

  return (
    <div className="space-y-6 py-2">
      {/* Summary Cards Grid */}
      <div className="grid grid-cols-3 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* Total Balance */}
        <SummaryCard
          title="Total Balance"
          value={`$${current.totalBalance.toLocaleString()}`}
          icon={<FaWallet className="text-blue-500" />}
          trend={totalBalanceTrend}
          trendColor={
            current.totalBalance >= previous.totalBalance
              ? "text-green-500"
              : "text-red-500"
          }
        />

        {/* Total Income */}
        <SummaryCard
          title="Total Income"
          value={`$${current.totalIncome.toLocaleString()}`}
          icon={<FaArrowUp className="text-green-500" />}
          trend={totalIncomeTrend}
          trendColor={
            current.totalIncome >= previous.totalIncome
              ? "text-green-500"
              : "text-red-500"
          }
        />

        {/* Total Expenses */}
        <SummaryCard
          title="Total Expenses"
          value={`$${current.totalExpenses.toLocaleString()}`}
          icon={<FaArrowDown className="text-red-500" />}
          trend={totalExpensesTrend}
          trendColor={
            current.totalExpenses <= previous.totalExpenses
              ? "text-green-500"
              : "text-red-500"
          }
        />

        {/* Savings Rate */}
        <SummaryCard
          title="Savings Rate"
          value={`${current.savingsRate}%`}
          icon={<FaPiggyBank className="text-yellow-500" />}
          trend={savingsRateTrend}
          trendColor={
            current.savingsRate >= previous.savingsRate
              ? "text-green-500"
              : "text-red-500"
          }
        />

        {/* Net Worth */}
        <SummaryCard
          title="Net Worth"
          value={`$${current.netWorth.toLocaleString()}`}
          icon={<FaChartLine className="text-purple-500" />}
          trend={netWorthTrend}
          trendColor={
            current.netWorth >= previous.netWorth
              ? "text-green-500"
              : "text-red-500"
          }
        />
      </div>
    </div>
  );
};

export default SummaryCardsSection;
