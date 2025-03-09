// components/TransactionsTable.tsx
import { statusVariants } from "@/constants";
import { Transaction } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";
import { CategoryIcon } from "../utils/CategoryIcon";

interface TransactionsTableProps {
  transactions: Transaction[];
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  setSelectedTransaction: (transaction: Transaction) => void;
  statusVariants: typeof statusVariants; // Add this
}

export function TransactionsTable({
  transactions,
  selectedIds,
  setSelectedIds,
  setSelectedTransaction,
  statusVariants,
}: TransactionsTableProps) {
  return (
    <div className="rounded-md border shadow-sm">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>
              <Button variant="ghost" className="px-0">
                Date <ArrowUpDown className="ml-2 size-4" />
              </Button>
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <motion.tr
              key={transaction.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hover:bg-muted/50"
            >
              <TableCell>
                {new Date(transaction.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <CategoryIcon category={transaction.category} />
                  {transaction.category}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={statusVariants[transaction.status]}>
                  {transaction.status}
                </Badge>
              </TableCell>
              <TableCell
                className={`text-right font-medium ${
                  transaction.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}$
                {Math.abs(transaction.amount)}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  Edit
                </Button>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
