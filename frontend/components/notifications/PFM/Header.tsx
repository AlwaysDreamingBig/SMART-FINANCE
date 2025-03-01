import { BellIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export const Header = ({ markAllAsRead }: { markAllAsRead: () => void }) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="flex items-center text-3xl font-bold">
          <BellIcon className="mr-3 size-8 text-purple-600" />
          Financial Alerts Center
        </h1>
        <p className="mt-2 text-gray-600">
          Stay updated on your financial activities and potential issues
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button className="btn-primary">
          <ChartBarIcon className="mr-2 size-5" />
          Alert Analytics
        </button>
        <button onClick={markAllAsRead} className="btn-secondary">
          Mark all as read
        </button>
      </div>
    </div>
  );
};
