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
    <div className="flex flex-col justify-between gap-4 md:flex-row">
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

      <div className="flex w-full gap-2 md:w-auto">
        <CurrencySelector value={currency} onChange={setCurrency} />
        <Button variant="outline">
          <Download className="mr-2 size-4" />
          Export
        </Button>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="group relative w-full md:w-auto"
        >
          <Plus className="size-4" />
          <span className="hidden group-hover:inline md:inline">
            {" "}
            Transaction
          </span>
        </Button>
      </div>
    </div>
  );
}
