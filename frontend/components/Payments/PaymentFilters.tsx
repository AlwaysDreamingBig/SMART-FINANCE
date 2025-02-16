// components/payments/PaymentFilters.tsx
import { FiPlus, FiSearch } from "react-icons/fi";
import { Button } from "../General/Button";
import { Input } from "../General/Input";

interface PaymentFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onOpenModal: () => void;
}

export const PaymentFilters = ({
  searchQuery,
  onSearchChange,
  onOpenModal,
}: PaymentFiltersProps) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div className="flex w-full gap-4 md:w-auto">
        <Input
          icon={<FiSearch />}
          placeholder="Search payments..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select className="rounded-lg border px-3 py-2 text-sm">
          <option>All Statuses</option>
          <option>Upcoming</option>
          <option>Overdue</option>
          <option>Paid</option>
        </select>

        <select className="rounded-lg border px-3 py-2 text-sm">
          <option>All Types</option>
          <option>Bills</option>
          <option>Subscriptions</option>
          <option>Transfers</option>
        </select>

        <input
          type="date"
          className="rounded-lg border px-3 py-2 text-sm"
          placeholder="From Date"
        />

        <input
          type="date"
          className="rounded-lg border px-3 py-2 text-sm"
          placeholder="To Date"
        />
      </div>

      <Button onClick={onOpenModal}>
        <div className="flex">
          <FiPlus className="mr-2" /> Schedule Payment
        </div>
      </Button>
    </div>
  );
};
