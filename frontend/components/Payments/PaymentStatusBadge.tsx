import { Payment } from "@/types";

export const PaymentStatusBadge: React.FC<{ status: Payment["status"] }> = ({
  status,
}) => {
  const statusStyles = {
    paid: "bg-green-100 text-green-800",
    upcoming: "bg-blue-100 text-blue-800",
    overdue: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
