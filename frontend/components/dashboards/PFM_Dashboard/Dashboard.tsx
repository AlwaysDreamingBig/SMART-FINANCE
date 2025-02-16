import { budgets } from "@/constants";
import { FiArrowUpRight, FiPlus } from "react-icons/fi";
import { BudgetProgress } from "@/components/Budget/BudgetProgress";
import { motion } from "framer-motion";
import { SpendingBreakdown } from "../../Charts/SpendingBreakdownChart";
import BankCardsSection from "./Bank cards/BankCardSection";
import { CashFlowChart } from "./Charts/CashFlowChart";
import { NetWorthTrendChart } from "./Charts/NetWorthTrendChart";
import SummaryCardsSection from "./SummaryCardSection";

const PfmDashboardPage = () => {
  return (
    <div className="bg-gray-50">
      {/* Main Content */}
      <div className="mx-auto p-2">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900"
          >
            Financial Dashboard
          </motion.h1>
          <button className="rounded-lg p-3 shadow-sm transition-shadow hover:shadow-md">
            <FiPlus className="size-5 text-gray-600" />
          </button>
        </div>

        {/* Grid Layout */}
        <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="flex h-full flex-col space-y-6 lg:col-span-2">
            {/* Account Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <SummaryCardsSection />
            </motion.div>

            {/* Net Worth Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid-cols-2 gap-2 rounded-xl bg-white shadow-sm sm:grid"
            >
              <NetWorthTrendChart />
              <CashFlowChart />
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-1 flex-col rounded-xl bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent Transactions</h2>
              </div>

              <div className="flex-1 overflow-auto">
                {/* Transactions list should go here */}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="h-full space-y-6 bg-white">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden rounded-xl bg-white p-6 sm:block"
            >
              <ButtonGrid />
            </motion.div>

            {/* Divider */}
            <div className="hidden border-t border-gray-200 sm:block"></div>

            {/* Account Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className=""
            >
              <BankCardsSection />
            </motion.div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Spending Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-6"
            >
              <h2 className="mb-4 text-lg font-semibold">Spending Breakdown</h2>
              <div className="min-h-64">
                <SpendingBreakdown />
              </div>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Budget Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <h2 className="mb-4 text-lg font-semibold">Budget Overview</h2>
              <div className="space-y-4">
                {budgets.map((budget) => (
                  <BudgetProgress
                    key={budget.category}
                    category={budget.category}
                    spent={budget.spent}
                    limit={budget.limit}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ButtonGrid = () => {
  const buttons = [
    {
      label: "Transfer",
      icon: <FiArrowUpRight />,
      bg: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
    },
    {
      label: "Budget",
      icon: <FiPlus />,
      bg: "bg-green-50",
      hoverBg: "hover:bg-green-100",
    },
    {
      label: "Report",
      icon: <FiArrowUpRight />,
      bg: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
    },
    {
      label: "Goals",
      icon: <FiPlus />,
      bg: "bg-green-50",
      hoverBg: "hover:bg-green-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`flex w-full items-center justify-between rounded-lg p-4 transition-colors ${button.bg} ${button.hoverBg}`}
        >
          <span>{button.label}</span>
          {button.icon}
        </button>
      ))}
    </div>
  );
};

export default PfmDashboardPage;
