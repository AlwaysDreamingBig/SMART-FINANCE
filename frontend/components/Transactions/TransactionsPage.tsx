"use client";

import sampleTransactions, { sampleTrendData } from "@/constants";
import { BaseChartData, Transaction } from "@/types";
import { useState } from "react";
import { motion } from "framer-motion";
import { AIInsights } from "./Components/AIInsights";
import { ExportModal } from "./Components/ExportModal";
import { Filters } from "./Components/Filters";
import { KeyboardShortcuts } from "./Components/KeyboardShortcuts";
import { Pagination } from "./Components/Pagination";
import { QuickActions } from "./Components/QuickActions";
import { SmartSearch } from "./Components/SmartSearch";
import { StatisticsCards } from "./Components/StatisticsCards";
import { TransactionFormModal } from "./Components/TransactionFormModal";
import { TransactionsTable } from "./Components/TransactionsTable";
import { ViewModeRenderer } from "./Components/ViewModeRenderer";
import { Header } from "./headers/Header";

export const statusVariants = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
};

export function TransactionsPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(sampleTransactions);
  const [trend, setTrend] = useState<BaseChartData[]>(sampleTrendData);
  const [selectedIds, setSelectedIds] = useState<string[]>(["1"]);
  const [viewMode, setViewMode] = useState<"list" | "grid" | "chart">("list");
  const [currency, setCurrency] = useState("USD");
  const [openFilters, setOpenFilters] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(),
    end: new Date(),
  });

  const [columnVisibility, setColumnVisibility] = useState({
    tags: true,
    recurring: true,
    notes: false,
  });

  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(sampleTransactions);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  // Add handleExport function
  const handleExport = (format: string) => {
    // Implement export logic
    console.log("Exporting as:", format);
  };

  // setTransactions(sampleTransactions);

  return (
    <motion.div className="mx-auto space-y-10 p-2 lg:p-6">
      <Header
        setViewMode={setViewMode}
        currency={currency}
        setCurrency={setCurrency}
        setIsAddModalOpen={setIsAddModalOpen}
      />
      <Filters
        openFilters={openFilters}
        setOpenFilters={setOpenFilters}
        categories={[
          "Groceries",
          "Salary",
          "Rent",
          "Utilities",
          "Entertainment",
          "Transportation",
        ]}
      />
      <StatisticsCards />
      <TransactionsTable
        transactions={transactions}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        setSelectedTransaction={setSelectedTransaction}
        statusVariants={statusVariants} // Pass as prop
      />
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={(page) => console.log(page)}
      />
      <ExportModal
        formats={["CSV", "Excel", "PDF", "JSON"]}
        dateRange={dateRange}
        columns={columnVisibility}
        onExport={handleExport}
      />

      <QuickActions />
      <KeyboardShortcuts />

      <SmartSearch
        transactions={transactions}
        onFilteredTransactions={setFilteredTransactions}
      />

      <AIInsights />

      <ViewModeRenderer
        viewMode={viewMode}
        filteredTransactions={filteredTransactions}
        selectedIds={selectedIds}
        transactions={transactions}
        setSelectedIds={setSelectedIds}
        setEditingTransaction={setEditingTransaction} // Now properly defined
        trendData={trend}
      />

      <TransactionFormModal
        open={isAddModalOpen || !!editingTransaction}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddModalOpen(false);
            setEditingTransaction(null);
          }
        }}
        transaction={editingTransaction}
      />
    </motion.div>
  );
}
