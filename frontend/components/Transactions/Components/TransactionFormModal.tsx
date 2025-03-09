import { Transaction } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { TransactionForm } from "../utils/TransactionForm";

interface TransactionFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
}

export function TransactionFormModal({
  open,
  onOpenChange,
  transaction,
}: TransactionFormModalProps) {
  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {transaction ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
          <DialogDescription>This is the description</DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2">
          <TransactionForm
            open={open}
            onOpenChange={onOpenChange}
            transaction={transaction}
            currencies={["USD", "EUR", "GBP"]}
            recurrenceOptions
            onSave={(values) => {
              toast({ title: "Transaction saved successfully" });
              onOpenChange(false);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
