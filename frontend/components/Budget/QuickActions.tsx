import { BudgetQuickActionsProps } from "@/types";
import { motion } from "framer-motion";

export const BudgetQuickActions = ({
  budgets,
  setBudgets,
  totalAllocated,
  totalSpent,
  selectedPeriod,
}: BudgetQuickActionsProps) => {
  const handleDistributeEvenly = () => {
    const currentBudgets = budgets.filter((b) => b.period === selectedPeriod);
    if (currentBudgets.length === 0) return;

    const average = totalAllocated / currentBudgets.length;
    const updatedCurrent = currentBudgets.map((b) => ({
      ...b,
      allocated: average,
    }));
    const otherBudgets = budgets.filter((b) => b.period !== selectedPeriod);
    setBudgets([...otherBudgets, ...updatedCurrent]);
  };

  const handleResetAllocations = () => {
    const currentBudgets = budgets.filter((b) => b.period === selectedPeriod);
    const updatedCurrent = currentBudgets.map((b) => ({ ...b, allocated: 0 }));
    const otherBudgets = budgets.filter((b) => b.period !== selectedPeriod);
    setBudgets([...otherBudgets, ...updatedCurrent]);
  };

  const handleIncreaseByPercentage = (percentage: number) => {
    const currentBudgets = budgets.filter((b) => b.period === selectedPeriod);
    const updatedCurrent = currentBudgets.map((b) => ({
      ...b,
      allocated: b.allocated * (1 + percentage / 100),
    }));
    const otherBudgets = budgets.filter((b) => b.period !== selectedPeriod);
    setBudgets([...otherBudgets, ...updatedCurrent]);
  };

  const handleApplySurplus = () => {
    const remaining = totalAllocated - totalSpent;
    if (remaining <= 0) return;

    const currentBudgets = budgets.filter((b) => b.period === selectedPeriod);
    const perCategory = remaining / currentBudgets.length;
    const updatedCurrent = currentBudgets.map((b) => ({
      ...b,
      allocated: b.allocated + perCategory,
    }));
    const otherBudgets = budgets.filter((b) => b.period !== selectedPeriod);
    setBudgets([...otherBudgets, ...updatedCurrent]);
  };

  const handleCloneLast = () => {
    const currentBudgets = budgets.filter((b) => b.period === selectedPeriod);
    if (currentBudgets.length === 0) return;

    const lastBudget = currentBudgets[currentBudgets.length - 1];
    const newBudget = {
      ...lastBudget,
      id: Date.now().toString(),
      spent: 0,
    };
    setBudgets([...budgets, newBudget]); // Add to all budgets
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
      <h3 className="mb-4 font-semibold">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDistributeEvenly}
          className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 disabled:opacity-50"
          disabled={budgets.length === 0}
        >
          ⚖️ Distribute Evenly
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleResetAllocations}
          className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-800 disabled:opacity-50"
          disabled={budgets.length === 0}
        >
          ↺ Reset Allocations
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleIncreaseByPercentage(10)}
          className="rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-800 disabled:opacity-50"
          disabled={budgets.length === 0}
        >
          ↑ Increase by 10%
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleIncreaseByPercentage(-10)}
          className="rounded-lg bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800 disabled:opacity-50"
          disabled={budgets.length === 0}
        >
          ↓ Decrease by 10%
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleApplySurplus}
          className="rounded-lg bg-purple-100 px-4 py-2 text-sm font-medium text-purple-800 disabled:opacity-50"
          disabled={totalAllocated <= totalSpent || budgets.length === 0}
        >
          💰 Apply Surplus
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCloneLast}
          className="rounded-lg bg-pink-100 px-4 py-2 text-sm font-medium text-pink-800 disabled:opacity-50"
          disabled={budgets.length === 0}
        >
          🧬 Clone Last
        </motion.button>
      </div>
    </div>
  );
};
