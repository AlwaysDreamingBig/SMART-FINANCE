import { BaseChartData, Transaction } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AnalyticsTabs } from "../utils/AnalyticsTabs";
import { BulkActionsBar } from "../utils/BulkActionsBar";
import { TransactionCard } from "../utils/TransactionCard";

interface ViewModeRendererProps {
  viewMode: "list" | "grid" | "chart";
  filteredTransactions: Transaction[];
  selectedIds: string[];
  transactions: Transaction[];
  trendData: BaseChartData[];
  setSelectedIds: (ids: string[]) => void;
  setEditingTransaction: (t: Transaction) => void;
}

export function ViewModeRenderer({
  viewMode,
  filteredTransactions,
  selectedIds,
  transactions,
  trendData,
  setSelectedIds,
  setEditingTransaction,
}: ViewModeRendererProps) {
  if (viewMode === "chart") {
    return <AnalyticsTabs transactions={transactions} trendData={trendData} />;
  }

  return viewMode === "list" ? (
    <ListView
      transactions={filteredTransactions}
      selectedIds={selectedIds}
      setSelectedIds={setSelectedIds}
      setEditingTransaction={setEditingTransaction}
    />
  ) : (
    <GridView
      transactions={filteredTransactions}
      setEditingTransaction={setEditingTransaction}
    />
  );
}

// List View Component
interface ListViewProps {
  transactions: Transaction[];
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  setEditingTransaction: (t: Transaction) => void;
}

function ListView({
  transactions,
  selectedIds,
  setSelectedIds,
  setEditingTransaction,
}: ListViewProps) {
  const onBulkDelete = () => {
    console.log("Deleting transactions:", selectedIds);
    setSelectedIds([]);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(
      selectedIds.includes(id)
        ? selectedIds.filter((selectedId) => selectedId !== id)
        : [...selectedIds, id]
    );
  };

  return (
    <div className="space-y-4">
      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        onBulkDelete={onBulkDelete}
        totalItems={transactions.length}
      />

      {/* Transactions Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={selectedIds.length === transactions.length}
                onCheckedChange={() =>
                  setSelectedIds(
                    selectedIds.length === transactions.length
                      ? []
                      : transactions.map((t) => t.id)
                  )
                }
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              onClick={() => setEditingTransaction(transaction)}
              className="cursor-pointer hover:bg-accent"
            >
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(transaction.id)}
                  onCheckedChange={() => toggleSelect(transaction.id)}
                  aria-label={`Select transaction ${transaction.id}`}
                />
              </TableCell>
              <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell className="font-medium">
                ${transaction.amount.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Grid View Component
interface GridViewProps {
  transactions: Transaction[];
  setEditingTransaction: (t: Transaction) => void;
}

function GridView({ transactions, setEditingTransaction }: GridViewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          onEdit={setEditingTransaction}
        />
      ))}
    </div>
  );
}
