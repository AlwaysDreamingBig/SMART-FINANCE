import { Payment } from "@/types";
import { Button } from "../General/Button";
import { Card } from "../ui/card";

interface RecurringPaymentsListProps {
  payments: Payment[];
  onManage: (paymentId: string) => void;
}

export const RecurringPaymentsList = ({
  payments,
  onManage,
}: RecurringPaymentsListProps) => {
  const recurringPayments = payments.filter((p) => p.recurrence !== "none");

  if (recurringPayments.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 w-full">
      <h2 className="mb-4 text-base font-semibold">Recurring Payments</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {recurringPayments.map((payment) => (
          <Card key={payment.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{payment.payee}</h3>
                <p className="text-sm text-gray-600">
                  {payment.recurrence} • Next:{" "}
                  {new Date(payment.dueDate).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onManage(payment.id)}
              >
                Manage
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
