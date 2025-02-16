"use client";

import { useState } from "react";
import { FiBell, FiCreditCard, FiDownload, FiPlus } from "react-icons/fi";
import { Button } from "../General/Button";

interface FABProps {
  onNewPayment: () => void;
  onExport: () => void;
  onSetReminder: () => void;
}

export const FloatingActionButton: React.FC<FABProps> = ({
  onNewPayment,
  onExport,
  onSetReminder,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8">
      <div className="group relative">
        {/* Main Floating Button */}
        <Button
          className="size-12 rounded-full bg-blue-600 p-0 text-white shadow-lg transition hover:bg-blue-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiPlus className="text-xl" />
        </Button>

        {/* Action Menu */}
        <div
          className={`absolute bottom-14 right-0 min-w-48 space-y-2 rounded-lg bg-white p-2 shadow-lg transition-opacity duration-200 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
        >
          <button
            className="flex w-full items-center rounded p-2 hover:bg-gray-100"
            onClick={onNewPayment}
          >
            <FiCreditCard className="mr-2" /> New Payment
          </button>
          <button
            className="flex w-full items-center rounded p-2 hover:bg-gray-100"
            onClick={onExport}
          >
            <FiDownload className="mr-2" /> Export
          </button>
          <button
            className="flex w-full items-center rounded p-2 hover:bg-gray-100"
            onClick={onSetReminder}
          >
            <FiBell className="mr-2" /> Set Reminder
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingActionButton;
