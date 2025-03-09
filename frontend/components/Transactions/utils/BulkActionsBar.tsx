import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Calendar, FileText, Flag, Tags, Trash2 } from "lucide-react";

interface BulkActionsBarProps {
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  onBulkDelete?: () => void;
  totalItems: number;
  onExport?: (format: "csv" | "pdf") => void;
  onSplitTransactions?: () => void;
  onMarkReviewed?: () => void;
  onSetCategory?: (category: string) => void;
  onSetFlag?: (flag: string) => void;
  onSaveFilters?: () => void;
}

export function BulkActionsBar({
  selectedIds,
  setSelectedIds,
  onBulkDelete,
  totalItems,
  onExport,
  onSplitTransactions,
  onMarkReviewed,
  onSetCategory,
  onSetFlag,
  onSaveFilters,
}: BulkActionsBarProps) {
  // Define hooks unconditionally, always at the top of the component
  const [category, setCategory] = useState<string>("");
  const [flag, setFlag] = useState<string>("");

  // Ensure early returns do not affect hook calls
  if (!selectedIds.length) return null;

  const isAllSelected = selectedIds.length === totalItems;

  const handleFlagChange = (selectedFlag: string) => {
    if (onSetFlag) {
      onSetFlag(selectedFlag); // Calls the parent function to set the flag
    }
    setFlag(selectedFlag); // Optionally update local state for UI display
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-lg bg-accent p-4"
    >
      <div className="flex items-center gap-4">
        <Checkbox
          checked={isAllSelected}
          onCheckedChange={() =>
            setSelectedIds(
              isAllSelected
                ? []
                : Array.from({ length: totalItems }, (_, i) => i.toString())
            )
          }
          aria-label="Select all items"
        />
        <span>{selectedIds.length} selected</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSetCategory?.(category)}
        >
          <Tags className="mr-2 size-4" />
          Set Category
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onBulkDelete}
          disabled={!onBulkDelete}
          aria-disabled={!onBulkDelete}
        >
          <Trash2 className="mr-2 size-4" />
          Delete
        </Button>
        <Button variant="ghost" size="sm" onClick={onSplitTransactions}>
          <FileText className="mr-2 size-4" />
          Split
        </Button>
        <Button variant="ghost" size="sm" onClick={onMarkReviewed}>
          <Flag className="mr-2 size-4" />
          Mark as Reviewed
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onExport?.("csv")}>
          <FileText className="mr-2 size-4" />
          Export CSV
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onExport?.("pdf")}>
          <FileText className="mr-2 size-4" />
          Export PDF
        </Button>
      </div>

      {/* Flag Button for assigning flags to selected transactions */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleFlagChange("Important")}
          className={flag === "Important" ? "bg-blue-500 text-white" : ""}
        >
          Important
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleFlagChange("Business")}
          className={flag === "Business" ? "bg-blue-500 text-white" : ""}
        >
          Business
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleFlagChange("Personal")}
          className={flag === "Personal" ? "bg-blue-500 text-white" : ""}
        >
          Personal
        </Button>

        <Button variant="ghost" size="sm" onClick={onSaveFilters}>
          <Calendar className="mr-2 size-4" />
          Save Filters
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setSelectedIds([])}>
          Clear Selection
        </Button>
      </div>
    </motion.div>
  );
}
