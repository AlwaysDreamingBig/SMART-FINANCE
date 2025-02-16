"use client";

import { CalendarDay } from "@/types";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Card } from "../ui/card";

interface PaymentCalendarProps {
  days: CalendarDay[];
  onDayClick?: (date: Date) => void;
}

export const PaymentCalendar = ({ days, onDayClick }: PaymentCalendarProps) => {
  // Set initial month and year
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Function to change month
  const changeMonth = (direction: "prev" | "next") => {
    let newMonth = currentMonthIndex;
    let newYear = currentYear;

    if (direction === "prev") {
      if (newMonth === 0) {
        newMonth = 11;
        newYear--;
      } else {
        newMonth--;
      }
    } else {
      if (newMonth === 11) {
        newMonth = 0;
        newYear++;
      } else {
        newMonth++;
      }
    }

    setCurrentMonthIndex(newMonth);
    setCurrentYear(newYear);
  };

  // Get days for the current month
  const currentMonthDays = days.filter((day) => {
    return (
      day.date.getMonth() === currentMonthIndex &&
      day.date.getFullYear() === currentYear
    );
  });

  // Find the first day of the month to adjust for correct grid alignment
  const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1).getDay();

  return (
    <Card className="flex h-[80vh] grow flex-col p-6">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => changeMonth("prev")}
          className="text-gray-600 hover:text-gray-800"
        >
          Prev
        </button>
        <h2 className="text-lg font-bold">
          {months[currentMonthIndex]} {currentYear}
        </h2>
        <button
          onClick={() => changeMonth("next")}
          className="text-gray-600 hover:text-gray-800"
        >
          Next
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid min-h-0 flex-1 grid-cols-7 gap-px bg-gray-200">
        {/* Weekday Labels */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-2 text-center font-medium text-gray-600">
            {day}
          </div>
        ))}

        {/* Empty Cells Before First Day */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-gray-100"></div>
        ))}

        {/* Days of the Current Month */}
        {currentMonthDays.map((day, index) => (
          <div
            key={index}
            className="relative cursor-pointer bg-white p-2 transition-colors hover:bg-gray-50"
            onClick={() => onDayClick?.(day.date)}
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium">{day.date.getDate()}</span>
              {day.payments.length > 0 && (
                <span className="text-xs text-gray-500">
                  $
                  {day.payments
                    .reduce((sum, p) => sum + p.amount, 0)
                    .toFixed(2)}
                </span>
              )}
            </div>
            <div className="space-y-1">
              {day.payments.map((payment, i) => (
                <div
                  key={i}
                  className={`truncate rounded p-1 text-xs ${
                    payment.type === "bill"
                      ? "bg-blue-100"
                      : payment.type === "subscription"
                        ? "bg-green-100"
                        : "bg-yellow-100"
                  }`}
                >
                  {payment.payee} ${payment.amount.toFixed(2)}
                </div>
              ))}
            </div>
            {day.payments.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                <FiPlus className="size-5" />
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
