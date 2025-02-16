"use client";

import { generateCalendarDays } from "@/lib/utils";
import { CalendarDay, Payment, PaymentMethod } from "@/types";
import { useEffect, useState } from "react";
import { FiBell, FiCalendar, FiCreditCard } from "react-icons/fi";
import {
  addWeeks,
  endOfWeek,
  isWithinInterval,
  parseISO,
  startOfWeek,
} from "date-fns";
import { motion } from "framer-motion";
import { Calendar1Icon } from "lucide-react";
import Swal from "sweetalert2";
import { MetricCard } from "../Cards/MetricCard";
import { Button } from "../General/Button";
import Modal from "../General/Modal";
import FloatingActionButton from "./FloatingActionMenu";
import { PaymentCalendar } from "./PaymentCalendar";
import { PaymentFilters } from "./PaymentFilters";
import { PaymentsTable } from "./PaymentsTable";
import { RecurringPaymentsList } from "./RecurringPaymentCard";
import { SchedulePaymentModal } from "./SchedulePaymentModal";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

const PaymentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [currentMonthPayments, setCurrentMonthPayments] = useState<Payment[]>(
    []
  );
  const currentYear = new Date().getFullYear();
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [recurrentPayments, setRecurrentPayments] = useState<Payment[]>([]);
  const [newPayment, setNewPayment] = useState<Omit<Payment, "id">>({
    payee: "",
    amount: 0,
    dueDate: "",
    status: "upcoming",
    type: "bill",
    recurrence: "none",
    attachments: [],
    reminderDays: 0,
  });

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-indexed (0 = January, 1 = February, ...)
    const currentYear = currentDate.getFullYear();

    // Filter payments for the current month and year
    const filteredPayments = payments.filter((payment) => {
      const paymentDate = new Date(payment.dueDate);
      return (
        paymentDate.getMonth() === currentMonth &&
        paymentDate.getFullYear() === currentYear
      );
    });

    setCurrentMonthPayments(filteredPayments);
  }, [payments]); // This will run whenever the 'payments' state changes

  useEffect(() => {
    // Get start and end of the incoming week (next week)
    const startOfIncomingWeek = startOfWeek(addWeeks(new Date(), 1), {
      weekStartsOn: 1,
    }); // Monday of next week
    const endOfIncomingWeek = endOfWeek(addWeeks(new Date(), 1), {
      weekStartsOn: 1,
    }); // Sunday of next week

    // Group payments by (payee, amount) and filter occurrences for the incoming week
    const groupedPayments: Record<string, Payment[]> = {};

    payments.forEach((payment) => {
      if (payment.recurrence !== "none") {
        const key = `${payment.payee}-${payment.amount}`;
        const dueDate = parseISO(payment.dueDate); // Convert string to Date

        // Check if the due date falls within the incoming week (next week)
        if (
          isWithinInterval(dueDate, {
            start: startOfIncomingWeek,
            end: endOfIncomingWeek,
          })
        ) {
          if (!groupedPayments[key]) {
            groupedPayments[key] = [];
          }
          groupedPayments[key].push(payment);
        }
      }
    });

    // Flatten the grouped payments into an array
    const incomingPayments = Object.values(groupedPayments).flat();

    setRecurrentPayments(incomingPayments);
  }, [payments]); // Runs whenever 'payments' updates

  useEffect(() => {
    // Load payment methods from API
    setPaymentMethods([
      { id: "1", last4: "4242", brand: "visa", exp: "12/25" },
      { id: "2", last4: "1881", brand: "mastercard", exp: "06/24" },
    ]);
  }, []);

  // Update calendar days when payments or year changes
  useEffect(() => {
    setCalendarDays(generateCalendarDays(currentYear, payments));
  }, [currentYear, payments]); // Add payments to dependencies

  const handleFileUpload = (files: File[]) => {
    const newAttachments = files.map((file) => ({
      file: URL.createObjectURL(file),
      name: file.name,
    }));

    setNewPayment((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }));
  };

  // Handle adding a new payment
  const handleSubmit = async () => {
    if (!newPayment.payee || !newPayment.amount || !newPayment.dueDate) {
      Swal.fire("Error", "Please fill all required fields", "error");
      return;
    }

    try {
      const newPayments: Payment[] = [];
      const startDate = new Date(newPayment.dueDate);
      const recurrenceEndDate = newPayment.endDate
        ? new Date(newPayment.endDate)
        : null;

      if (newPayment.recurrence === "none" || !recurrenceEndDate) {
        // Single Payment (No Recurrence)
        newPayments.push({
          ...newPayment,
          id: String(payments.length + 1),
          status: "upcoming",
        });
      } else {
        // Recurring Payments
        let nextDate = new Date(startDate);
        let paymentCount = payments.length + 1;

        while (nextDate <= recurrenceEndDate) {
          newPayments.push({
            ...newPayment,
            id: String(paymentCount++), // Unique ID
            dueDate: nextDate.toISOString().split("T")[0], // YYYY-MM-DD format
            status: "upcoming",
          });

          console.log(newPayments);

          // Explicitly create a new Date instance to modify nextDate
          if (newPayment.recurrence === "weekly") {
            nextDate = new Date(nextDate.getTime()); // Clone date
            nextDate.setDate(nextDate.getDate() + 7);
          } else if (newPayment.recurrence === "monthly") {
            nextDate = new Date(nextDate.getTime()); // Clone date
            nextDate.setMonth(nextDate.getMonth() + 1);
          } else if (newPayment.recurrence === "yearly") {
            nextDate = new Date(nextDate.getTime()); // Clone date
            nextDate.setFullYear(nextDate.getFullYear() + 1);
          }
        }
      }

      // Update state with new payments
      setPayments((prev) => [...prev, ...newPayments]);
      setIsModalOpen(false);
      Swal.fire("Success", "Payment scheduled successfully", "success");
    } catch {
      Swal.fire("Error", "Failed to schedule payment", "error");
    }
  };

  // Handle clicking a day in the calendar
  const handleDayClick = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setNewPayment((prev) => ({ ...prev, dueDate: formattedDate }));
    setShowCalendarModal(false);
    setIsModalOpen(true);
  };

  const handleRemind = (paymentId: string) => {
    // Handle remind logic
  };

  const handlePay = (paymentId: string) => {
    // Handle payment logic
  };

  const handleManageRecurring = (paymentId: string) => {
    // Handle manage recurring payment logic
  };

  const handleNewPayment = () => {
    console.log("New Payment Clicked");
    // Open a modal or navigate to the payment form
  };

  const handleExport = () => {
    console.log("Export Clicked");
    // Trigger CSV or PDF export function
  };

  const handleSetReminder = () => {
    console.log("Set Reminder Clicked");
    // Open a reminder scheduling feature
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900"
        >
          Payment Management
        </motion.h1>

        {/* Header */}
        <PaymentFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenModal={() => setIsModalOpen(true)}
        />

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <MetricCard
            title="Total Upcoming"
            value="$1,234.56"
            icon={<FiCalendar />}
            color="blue"
          />
          <MetricCard
            title="Paid This Month"
            value="$987.65"
            icon={<FiCreditCard />}
            color="green"
          />
          <MetricCard
            title="Overdue Payments"
            value="$350.00"
            icon={<FiBell />}
            color="red"
          />
        </div>

        {/* Payments Table */}
        <PaymentsTable
          payments={currentMonthPayments}
          onRemind={handleRemind}
          onPay={handlePay}
        />

        {/* Calendar Section */}
        <div className="flex items-stretch gap-4">
          <div className="flex-1 rounded-lg bg-white p-2 shadow-sm">
            <RecurringPaymentsList
              payments={recurrentPayments}
              onManage={handleManageRecurring}
            />
          </div>
          <div className="flex items-stretch bg-green-100">
            <Button
              className="flex h-full items-center justify-center px-4"
              onClick={() => setShowCalendarModal(true)}
            >
              <Calendar1Icon className="mr-2" /> Show Calendar
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        onNewPayment={handleNewPayment}
        onExport={handleExport}
        onSetReminder={handleSetReminder}
      />

      <SchedulePaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        payment={newPayment}
        onChange={setNewPayment}
      />

      {/* Calendar Modal */}
      <Modal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        title="Payment Calendar"
        size="xl"
      >
        <div className="min-h-[80vh] bg-black">
          <PaymentCalendar days={calendarDays} onDayClick={handleDayClick} />
        </div>
      </Modal>
    </div>
  );
};

export default PaymentsPage;
