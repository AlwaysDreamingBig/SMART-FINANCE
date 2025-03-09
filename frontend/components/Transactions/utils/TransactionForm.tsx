import { DEFAULT_TRANSACTION } from "@/constants";
import { Transaction } from "@/types";

interface TransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
  currencies?: string[];
  recurrenceOptions?: boolean;
  onSave: (values: Transaction) => void;
}

export function TransactionForm({
  open,
  onOpenChange,
  transaction,
  currencies = ["USD"], // Default value for currencies if not provided.
  recurrenceOptions = false,
  onSave,
}: TransactionFormProps) {
  // Ensure that transaction is never null by defaulting to DEFAULT_TRANSACTION if null.
  const formTransaction = transaction || DEFAULT_TRANSACTION;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(formTransaction); // Always use formTransaction (fallback if transaction is null).
      }}
      className="flex w-full flex-col items-center justify-center space-y-10"
    >
      {/* Form fields here */}
      <div>Form fields</div>
      <button type="submit" className="w-full rounded-lg bg-green-400 py-2">
        Save
      </button>
    </form>
  );
}
