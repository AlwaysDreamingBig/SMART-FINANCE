import React, { ElementType } from "react";
import { Bell, CreditCard, Mail } from "lucide-react";

export const NotificationIcon = ({
  icon: Icon,
  count,
}: {
  icon: ElementType;
  count: number;
}) => {
  return (
    <div className="relative p-2 transition-transform duration-200 hover:scale-110">
      <Icon className="size-8 text-gray-300 transition-colors duration-200 hover:text-green-400" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {count}
        </span>
      )}
    </div>
  );
};

const NotificationPanel = ({ alerts = 0, messages = 0, transactions = 0 }) => {
  return (
    <div className="flex gap-4 rounded-lg bg-gray-100 p-4 shadow-lg md:bg-gray-800">
      <NotificationIcon icon={Bell} count={alerts} />
      <NotificationIcon icon={Mail} count={messages} />
      <NotificationIcon icon={CreditCard} count={transactions} />
    </div>
  );
};

export default NotificationPanel;
