// components/payments/PaymentsTable.tsx
import { Payment } from "@/types";
import { FiCalendar } from "react-icons/fi";
import { Button } from "../General/Button";
import { Card } from "../ui/card";
import { PaymentStatusBadge } from "./PaymentStatusBadge";

interface PaymentsTableProps {
  payments: Payment[];
  onRemind: (paymentId: string) => void;
  onPay: (paymentId: string) => void;
}

export const PaymentsTable = ({
  payments,
  onRemind,
  onPay,
}: PaymentsTableProps) => {
  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {["Payee", "Amount", "Due Date", "Status", "Type", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-center text-sm font-medium text-gray-500"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-center">
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">{payment.payee}</td>
                <td className="px-6 py-4">${payment.amount.toFixed(2)}</td>
                <td className="px-6 py-4">
                  {new Date(payment.dueDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <PaymentStatusBadge status={payment.status} />
                </td>
                <td className="px-6 py-4 capitalize">{payment.type}</td>
                <td className="flex flex-row items-center justify-center space-x-2 px-6 py-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onRemind(payment.id)}
                    className="flex items-center justify-center px-4"
                  >
                    <FiCalendar className="mr-2" /> Remind
                  </Button>

                  <Button size="sm" onClick={() => onPay(payment.id)}>
                    Pay Now
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {payments.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No payments found matching your search
          </div>
        )}
      </div>
    </Card>
  );
};
