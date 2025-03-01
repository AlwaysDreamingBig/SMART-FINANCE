import React, { useCallback } from "react";
import Calendar from "react-calendar";
import { motion } from "framer-motion";
import "react-calendar/dist/Calendar.css";

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
  key: string;
}

interface DateRangeSelectorProps {
  dateRange: DateRange[];
  setDateRange: React.Dispatch<React.SetStateAction<DateRange[]>>;
  showDatePicker: boolean;
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  dateRange,
  setDateRange,
  showDatePicker,
  setShowDatePicker,
}) => {
  const handlePresetClick = useCallback(
    (preset: string) => {
      const today = new Date();
      let newStartDate = today;
      let newEndDate = today;

      switch (preset) {
        case "today":
          newStartDate = newEndDate = today;
          break;
        case "yesterday":
          newStartDate = newEndDate = new Date(today);
          newStartDate.setDate(today.getDate() - 1);
          break;
        case "thisWeek": {
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          newStartDate = startOfWeek;
          newEndDate = today;
          break;
        }
        case "lastWeek": {
          const startOfLastWeek = new Date(today);
          startOfLastWeek.setDate(today.getDate() - today.getDay() - 7);
          newStartDate = startOfLastWeek;
          const endOfLastWeek = new Date(today);
          endOfLastWeek.setDate(today.getDate() - today.getDay() - 1);
          newEndDate = endOfLastWeek;
          break;
        }
        case "thisMonth": {
          const startOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
          );
          newStartDate = startOfMonth;
          newEndDate = today;
          break;
        }
        case "lastMonth": {
          const startOfLastMonth = new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            1
          );
          newStartDate = startOfLastMonth;
          const endOfLastMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
          );
          newEndDate = endOfLastMonth;
          break;
        }
        default:
          break;
      }

      setDateRange([
        { startDate: newStartDate, endDate: newEndDate, key: "selection" },
      ]);
    },
    [setDateRange]
  );

  const handleDateChange = useCallback(
    (value: Date | [Date | null, Date | null] | null) => {
      if (Array.isArray(value) && value.length === 2) {
        const [start, end] = value;
        setDateRange([
          {
            startDate: start ?? null,
            endDate: end ?? null,
            key: "selection",
          },
        ]);
      } else if (value instanceof Date) {
        setDateRange([{ startDate: value, endDate: value, key: "selection" }]);
      } else {
        setDateRange([{ startDate: null, endDate: null, key: "selection" }]);
      }
    },
    [setDateRange]
  );

  return (
    <motion.div
      layout
      className="mx-auto max-w-6xl rounded-xl border p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="mb-6 text-xl font-semibold text-gray-800">
        Select Date Range
      </h2>

      <div className="grid grid-cols-2 gap-5">
        <div>
          {/* Preset Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Today", value: "today" },
              { label: "Yesterday", value: "yesterday" },
              { label: "This Week", value: "thisWeek" },
              { label: "Last Week", value: "lastWeek" },
              { label: "This Month", value: "thisMonth" },
              { label: "Last Month", value: "lastMonth" },
            ].map((preset) => (
              <motion.button
                key={preset.value}
                onClick={() => handlePresetClick(preset.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-blue-50 px-4 py-2 text-blue-700 transition-colors duration-200 hover:bg-blue-100"
              >
                {preset.label}
              </motion.button>
            ))}
          </div>

          {/* Selected Date Range Display */}
          <div className="mb-6 flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <span className="font-medium text-gray-700">
              {dateRange[0]?.startDate
                ? dateRange[0].startDate.toLocaleDateString()
                : "Start Date"}
            </span>
            <span className="mx-2 text-gray-400">-</span>
            <span className="font-medium text-gray-700">
              {dateRange[0]?.endDate
                ? dateRange[0].endDate.toLocaleDateString()
                : "End Date"}
            </span>
          </div>

          {/* Toggle Calendar Button */}
          <motion.button
            onClick={() => setShowDatePicker((prev) => !prev)} // Toggle the calendar visibility only
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-6 w-full rounded-lg bg-blue-600 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
          >
            {showDatePicker ? "Hide Calendar" : "Show Calendar"}
          </motion.button>
        </div>

        <div className="flex items-center justify-center">
          {/* Calendar */}
          {showDatePicker && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Calendar
                selectRange={true}
                onChange={handleDateChange}
                value={[
                  dateRange[0]?.startDate ?? null,
                  dateRange[0]?.endDate ?? null,
                ]}
                className="rounded-lg border border-gray-200 shadow-sm"
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DateRangeSelector;
