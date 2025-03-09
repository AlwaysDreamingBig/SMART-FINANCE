import { statusVariants } from "@/constants";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types";
import { Badge } from "@/components/ui/badge";
import { format, isValid, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { Repeat } from "lucide-react";
import { CategoryIcon } from "./CategoryIcon";

interface TransactionCardProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
}

export function TransactionCard({ transaction, onEdit }: TransactionCardProps) {
  // Ensure transaction.date is valid before formatting
  let formattedDate = "No Date"; // Default if date is missing

  if (transaction.date) {
    const parsedDate =
      typeof transaction.date === "string"
        ? parseISO(transaction.date)
        : new Date(transaction.date);

    if (isValid(parsedDate)) {
      formattedDate = format(parsedDate, "MMM dd, yyyy");
    } else {
      formattedDate = "Invalid Date";
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-lg border bg-background p-4 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CategoryIcon category={transaction.category} />
            <Badge variant="outline">{transaction.category}</Badge>
            {transaction.recurring && (
              <Repeat className="size-4 text-muted-foreground" />
            )}
          </div>
          <h3 className="mt-2 font-medium">{transaction.description}</h3>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
        <div className="text-right">
          <p
            className={cn(
              "font-medium",
              transaction.type === "income" ? "text-green-600" : "text-red-600"
            )}
          >
            {transaction.type === "income" ? "+" : "-"}${transaction.amount}
          </p>
          <Badge className={statusVariants[transaction.status]}>
            {transaction.status}
          </Badge>
        </div>
      </div>
    </motion.div>
  );
}
