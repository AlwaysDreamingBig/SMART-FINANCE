"use client";

import { sampleBudgets } from "@/constants";
import { Budget, BudgetPeriod, HistoryEntry } from "@/types";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BudgetCategory,
  BudgetChart,
  BudgetModal,
  CategoryBreakdown,
  ProgressBar,
} from "./BudgetComponents";
import { BudgetForecast } from "./BudgetForecast";
import { BudgetHistory } from "./BudgetHistory";
import { BudgetQuickActions } from "./QuickActions";

const BudgetPage = () => {
  const [budgets, setBudgets] = useState<Budget[]>(sampleBudgets);
  const [selectedPeriod, setSelectedPeriod] = useState<
    "weekly" | "monthly" | "yearly"
  >("monthly");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Filter budgets based on selected period
  const filteredBudgets = useMemo(
    () => budgets.filter((budget) => budget.period === selectedPeriod),
    [budgets, selectedPeriod]
  );

  // Calculate totals based on filtered budgets
  const totalAllocated = useMemo(
    () => filteredBudgets.reduce((sum, b) => sum + b.allocated, 0),
    [filteredBudgets]
  );
  const totalSpent = useMemo(
    () => filteredBudgets.reduce((sum, b) => sum + b.spent, 0),
    [filteredBudgets]
  );

  const handleAddBudget = (newBudget: Budget) => {
    const now = new Date(); // Create timestamp once
    const changes: HistoryEntry[] = [];

    if (editingBudget) {
      const oldBudget = editingBudget;

      // Track allocation changes
      if (newBudget.allocated !== oldBudget.allocated) {
        changes.push({
          date: now,
          amount: newBudget.allocated - oldBudget.allocated,
          type: "adjustment",
          category: newBudget.category,
          period: newBudget.period,
          description: `Allocation changed from ${oldBudget.allocated} to ${newBudget.allocated}`,
        });
      }

      // Track spending changes
      if (newBudget.spent !== oldBudget.spent) {
        changes.push({
          date: now,
          amount: newBudget.spent - oldBudget.spent,
          type: "spending",
          category: newBudget.category,
          period: newBudget.period,
          description: `Spending updated from ${oldBudget.spent} to ${newBudget.spent}`,
        });
      }

      // Track period changes
      if (newBudget.period !== oldBudget.period) {
        changes.push({
          date: now,
          amount: newBudget.allocated,
          type: "adjustment",
          category: newBudget.category,
          period: newBudget.period,
          description: `Period changed from ${oldBudget.period} to ${newBudget.period}`,
        });
      }

      // Apply updates
      setHistory((prev) => [...prev, ...changes]);
      setBudgets((prev) =>
        prev.map((b) => (b.id === editingBudget.id ? newBudget : b))
      );
      setEditingBudget(null);
    } else {
      const budgetToAdd = { ...newBudget, period: selectedPeriod };

      // Create history entries for a new budget
      const newEntries: HistoryEntry[] = [
        {
          date: now,
          amount: budgetToAdd.allocated,
          type: "allocation",
          category: budgetToAdd.category,
          period: selectedPeriod,
          description: "New budget allocated",
        },
      ];

      if (budgetToAdd.spent > 0) {
        newEntries.push({
          date: now,
          amount: budgetToAdd.spent,
          type: "spending",
          category: budgetToAdd.category,
          period: selectedPeriod,
          description: "Initial spending recorded",
        });
      }

      // Apply updates
      setHistory((prev) => [...prev, ...newEntries]);
      setBudgets((prev) => [...prev, budgetToAdd]);
    }

    setIsModalOpen(false);
  };

  const handleEditBudget = (budget: Budget) => {
    setEditingBudget(budget); // Set the budget being edited
    setIsModalOpen(true); // Open the modal
  };

  // Update delete handler
  const handleDeleteBudget = (budget: Budget) => {
    setHistory((prev) => [
      ...prev,
      {
        date: new Date(),
        amount: budget.allocated,
        type: "deletion",
        category: budget.category,
        period: budget.period,
        description: "Budget deleted",
      },
    ]);
    setBudgets((prev) => prev.filter((b) => b.id !== budget.id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-7xl p-6"
    >
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Budget Management</h1>
        <select
          value={selectedPeriod}
          onChange={(e) => {
            const value = e.target.value as BudgetPeriod;
            setSelectedPeriod(value);
          }}
          className="rounded-lg border bg-transparent px-4 py-2"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <BudgetChart allocated={totalAllocated} spent={totalSpent} />

        <div className="flex-line col-span-2 flex gap-4 md:grid md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 className="mb-2 text-lg font-semibold">Quick Stats</h3>
            <p>Remaining: ${(totalAllocated - totalSpent).toLocaleString()}</p>
            <p>
              Utilization:{" "}
              {((totalSpent / totalAllocated) * 100 || 0).toFixed(1)}%
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center justify-center rounded-xl bg-blue-600 p-6 text-white"
          >
            <span className="mb-2 text-2xl">+</span>
            <span>Create New Budget</span>
          </motion.button>
        </div>
      </div>

      {/** Displaying the budgets */}
      <div className="grid max-h-[50vh] grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
        {filteredBudgets.map((budget, index) => (
          <motion.div
            key={budget.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <BudgetCategory
              {...budget}
              onEdit={() => handleEditBudget(budget)}
              onDelete={() => handleDeleteBudget(budget)}
            />
          </motion.div>
        ))}
      </div>

      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBudget(null); // Clear the editing state when modal is closed
        }}
        onSubmit={handleAddBudget}
        period={selectedPeriod}
        editingBudget={editingBudget} // Pass the budget being edited to the modal
      />

      <div className="mb-8">
        <BudgetQuickActions
          budgets={budgets} // Pass all budgets instead of filtered
          setBudgets={setBudgets}
          totalAllocated={totalAllocated}
          totalSpent={totalSpent}
          selectedPeriod={selectedPeriod}
        />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CategoryBreakdown budgets={filteredBudgets} />
        <BudgetHistory period={selectedPeriod} history={history} />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <BudgetForecast
          spendingTrend={15}
          allocated={totalAllocated}
          period={selectedPeriod}
        />
        <div className="max-h-[50vh] overflow-y-auto rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-4 font-semibold">Budget Health</h3>
          <div className="space-y-4">
            {budgets.map((budget) => (
              <div key={budget.id} className="flex items-center gap-4">
                <span className="text-2xl">{budget.icon}</span>
                <div className="flex-1">
                  <p className="font-medium">{budget.category}</p>
                  <ProgressBar
                    progress={(budget.spent / budget.allocated) * 100}
                  />
                </div>
                <span
                  className={`text-sm font-semibold ${
                    budget.spent > budget.allocated
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {budget.spent > budget.allocated ? "Over" : "Under"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetPage;
