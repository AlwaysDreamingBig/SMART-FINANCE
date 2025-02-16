"use client";

import { Budget } from "@/types";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Dialog } from "@headlessui/react";
import EmojiPicker from "emoji-picker-react";
import { motion } from "framer-motion";

// Budget Category Card
export const BudgetCategory = ({
  category,
  allocated,
  spent,
  icon,
  onEdit,
  onDelete,
}: Budget & {
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const progress = (spent / allocated) * 100;

  return (
    <div className="relative rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <h3 className="font-semibold">{category}</h3>
        </div>
        <div className="flex gap-2">
          <button onClick={onEdit} className="text-blue-600">
            Edit
          </button>
          <button onClick={onDelete} className="text-red-600">
            ×
          </button>
        </div>
      </div>

      <ProgressBar progress={progress} />

      <div className="mt-2 flex justify-between text-sm">
        <span>${spent.toLocaleString()}</span>
        <span>${allocated.toLocaleString()}</span>
      </div>
    </div>
  );
};

// Animated Progress Bar
export const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
    <motion.div
      className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
      initial={{ width: 0 }}
      animate={{ width: `${Math.min(progress, 100)}%` }}
      transition={{ duration: 0.8 }}
    />
  </div>
);

// Budget Chart Component
export const BudgetChart = ({
  allocated,
  spent,
}: {
  allocated: number;
  spent: number;
}) => {
  const utilization = (spent / allocated) * 100 || 0;

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
      <h3 className="mb-4 font-semibold">Overall Utilization</h3>
      <div className="relative mx-auto size-40">
        <svg viewBox="0 0 100 100" className="-rotate-90">
          <circle
            cx="50"
            cy="50"
            r="45"
            className="stroke-current text-gray-200"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            className="stroke-current text-blue-600"
            strokeWidth="10"
            fill="none"
            strokeDasharray={`${utilization} 100`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
          {utilization.toFixed(1)}%
        </div>
      </div>
    </div>
  );
};

// Budget Modal Component
export const BudgetModal = ({
  isOpen,
  onClose,
  onSubmit,
  period,
  editingBudget,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (budget: Budget) => void;
  period: "weekly" | "monthly" | "yearly";
  editingBudget: Budget | null;
}) => {
  const [formData, setFormData] = useState<Omit<Budget, "id">>({
    category: "",
    allocated: 0,
    spent: 0,
    period,
    icon: "💰",
    date: new Date(),
  });

  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  useEffect(() => {
    if (editingBudget) {
      setFormData({
        category: editingBudget.category,
        allocated: editingBudget.allocated,
        spent: editingBudget.spent,
        period: editingBudget.period,
        icon: editingBudget.icon,
        date: editingBudget.date,
      });
    } else {
      setFormData({
        category: "",
        allocated: 0,
        spent: 0,
        period,
        icon: "💰",
        date: new Date(),
      });
    }
  }, [editingBudget, period]);

  const handleSubmit = () => {
    // If editingBudget exists, include its ID in the submitted data
    const budgetData = editingBudget
      ? { ...formData, id: editingBudget.id }
      : { ...formData, id: Math.random().toString() };
    onSubmit(budgetData);
  };

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setFormData((prev) => ({ ...prev, icon: emojiData.emoji }));
    setEmojiPickerVisible(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/30" />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-md rounded-xl bg-white p-6 dark:bg-gray-800"
      >
        <h3 className="mb-4 text-xl font-bold">
          {editingBudget ? "Edit Budget" : "Create New Budget"}
        </h3>

        <div className="space-y-4">
          <div>
            <label>Category</label>
            <input
              type="text"
              className="w-full rounded border p-2"
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
            />
          </div>

          <div>
            <label>Allocated Amount</label>
            <input
              type="number"
              className="w-full rounded border p-2"
              value={formData.allocated}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  allocated: Number(e.target.value),
                }))
              }
            />
          </div>

          <div>
            <label>Spent Amount</label>
            <input
              type="number"
              className="w-full rounded border p-2"
              value={formData.spent}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  spent: Number(e.target.value),
                }))
              }
            />
          </div>

          <div>
            <label>Icon</label>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded border border-r-gray-500 p-2"
              onClick={() => setEmojiPickerVisible((prev) => !prev)}
            >
              {formData.icon}
              <span>😊</span>
            </button>

            {emojiPickerVisible && (
              <div
                className="absolute z-10 mt-2"
                style={{
                  top: "-130px", // This will move the picker up
                  right: "0", // This will place it on the right side
                }}
              >
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {editingBudget ? "Save Changes" : "Create Budget"}
          </button>
        </div>
      </motion.div>
    </Dialog>
  );
};

// CategoryBreakdown
export const CategoryBreakdown = ({ budgets }: { budgets: Budget[] }) => {
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
      <h3 className="mb-4 font-semibold">Spending by Category</h3>
      <div className="relative h-64 w-full">
        <Pie
          data={{
            labels: budgets.map((b) => b.category),
            datasets: [
              {
                data: budgets.map((b) => b.spent),
                backgroundColor: [
                  "#3B82F6",
                  "#10B981",
                  "#F59E0B",
                  "#EF4444",
                  "#8B5CF6",
                ],
                borderWidth: 0,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  color: "#6B7280",
                  font: {
                    size: 14,
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: (ctx) => {
                    const value = ctx.parsed;
                    const percentage = (value / totalSpent) * 100;
                    return `${ctx.label}: $${value.toLocaleString()} (${percentage.toFixed(1)}%)`;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
