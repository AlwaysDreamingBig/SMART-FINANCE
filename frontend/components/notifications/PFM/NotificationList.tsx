import { Notifications } from "@/types";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export const NotificationList = ({
  notifications,
  toggleReadStatus,
  deleteNotification,
  handleNotificationClick,
}: {
  notifications: Notifications[];
  toggleReadStatus: (id: string) => void;
  deleteNotification: (id: string) => void;
  handleNotificationClick: (notification: Notifications) => void;
}) => {
  const getNotificationIcon = (type: string) => {
    const iconClass = "w-5 h-5 mr-3 flex-shrink-0";
    switch (type) {
      case "alert":
        return (
          <ExclamationTriangleIcon className={`${iconClass} text-red-500`} />
        );
      case "transaction":
        return (
          <InformationCircleIcon className={`${iconClass} text-blue-500`} />
        );
      case "success":
        return <CheckIcon className={`${iconClass} text-green-500`} />;
      default:
        return (
          <InformationCircleIcon className={`${iconClass} text-gray-500`} />
        );
    }
  };

  return (
    <div className="divide-y divide-gray-200">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`cursor-pointer p-6 transition-colors hover:bg-gray-50 ${
            !notification.read ? "border-l-4 border-blue-600 bg-blue-50" : ""
          }`}
          onClick={() => handleNotificationClick(notification)}
        >
          <div className="flex items-start gap-4">
            <div className="mt-1">{getNotificationIcon(notification.type)}</div>
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">
                  {notification.message}
                </span>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    notification.priority === "high"
                      ? "bg-red-100 text-red-800"
                      : notification.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {notification.category}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  {notification.date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleReadStatus(notification.id);
                    }}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    {notification.read ? "Mark unread" : "Mark read"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
