import { Payment } from "@/types";
import {
  FiCalendar,
  FiCreditCard,
  FiPaperclip,
  FiRepeat,
  FiX,
} from "react-icons/fi";
import { FileUpload } from "../Cards/FileUploader";
import { Button } from "../General/Button";
import { Input } from "../General/Input";
import Modal from "../General/Modal";

interface SchedulePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  payment: Omit<Payment, "id">;
  onChange: (payment: Omit<Payment, "id">) => void;
}

export const SchedulePaymentModal = ({
  isOpen,
  onClose,
  onSubmit,
  payment,
  onChange,
}: SchedulePaymentModalProps) => {
  const handleFileUpload = (files: File[]) => {
    const newAttachments = files.map((file) => ({
      file: URL.createObjectURL(file),
      name: file.name,
    }));
    onChange({
      ...payment,
      attachments: [...payment.attachments, ...newAttachments],
    });
  };

  const removeAttachment = (index: number) => {
    const newAttachments = [...payment.attachments];
    newAttachments.splice(index, 1);
    onChange({ ...payment, attachments: newAttachments });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Payment" size="lg">
      <div className="space-y-4">
        {/* Payee Input */}
        <Input
          label="Payee"
          placeholder="Enter payee name"
          value={payment.payee}
          onChange={(e) => onChange({ ...payment, payee: e.target.value })}
          icon={<FiCreditCard />}
        />

        {/* Amount Input */}
        <Input
          label="Amount"
          type="number"
          placeholder="Enter amount"
          value={payment.amount}
          onChange={(e) =>
            onChange({ ...payment, amount: parseFloat(e.target.value) || 0 })
          }
          icon={<FiCreditCard />}
        />

        {/* Due Date Input */}
        <Input
          label="Due Date"
          type="date"
          value={payment.dueDate}
          onChange={(e) => onChange({ ...payment, dueDate: e.target.value })}
          icon={<FiCalendar />}
        />

        {/* Recurrence Select */}
        <div>
          <label className="block text-sm font-medium">Recurrence</label>
          <div className="relative">
            <select
              value={payment.recurrence}
              onChange={(e) =>
                onChange({
                  ...payment,
                  recurrence: e.target.value as
                    | "none"
                    | "weekly"
                    | "monthly"
                    | "yearly",
                })
              }
              className="w-full rounded border bg-white p-2"
            >
              <option value="none">None</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <FiRepeat className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* End Date Input (Visible only for recurring payments) */}
        {payment.recurrence !== "none" && (
          <Input
            label="End Date"
            type="date"
            value={payment.endDate || ""}
            onChange={(e) => onChange({ ...payment, endDate: e.target.value })}
            icon={<FiCalendar />}
          />
        )}

        {/* File Upload */}
        <FileUpload
          label="Attachments"
          onUpload={handleFileUpload}
          icon={<FiPaperclip />}
        />

        {/* Display Uploaded Files */}
        {payment.attachments.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Attachments:</p>
            <div className="space-y-1">
              {payment.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded bg-gray-100 p-2"
                >
                  <span className="truncate text-sm">{attachment.name}</span>
                  <button
                    onClick={() => removeAttachment(index)}
                    className="rounded-full p-1 hover:bg-gray-200"
                  >
                    <FiX className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button onClick={onSubmit}>Schedule Payment</Button>
        </div>
      </div>
    </Modal>
  );
};
