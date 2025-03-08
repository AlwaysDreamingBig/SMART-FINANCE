// components/Header.tsx

import { Button } from "@/components/ui/button";
import { Currency, Download, Plus } from "lucide-react";
import { CurrencySelector } from "./CurrencySelector";

interface HeaderProps {
  setViewMode: (mode: "list" | "grid" | "chart") => void;
  currency: string;
  setCurrency: (currency: string) => void;
  setIsAddModalOpen: (isOpen: boolean) => void;
}

export function Header({
  setViewMode,
  currency,
  setCurrency,
  setIsAddModalOpen,
}: HeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row">
      <div className="space-y-1">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <Currency className="text-primary" /> Transactions
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setViewMode("list")}>
            List
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setViewMode("grid")}>
            Grid
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("chart")}
          >
            Charts
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        <CurrencySelector value={currency} onChange={setCurrency} />
        <Button variant="outline">
          <Download className="mr-2 size-4" />
          Export
        </Button>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 size-4" />
          Add Transaction
        </Button>
      </div>
    </div>
  );
}
