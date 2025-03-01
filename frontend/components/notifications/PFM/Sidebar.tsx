import { Notifications } from "@/types";
import { ArchiveBoxIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export const Sidebar = ({
  priorityAlerts,
}: {
  priorityAlerts: Notifications[];
}) => {
  return (
    <div className="space-y-6">
      {/* Monthly Alert Summary */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center font-medium">
          <ChartBarIcon className="mr-2 size-5 text-purple-600" />
          Monthly Alert Trends
        </h3>
        <div className="flex h-48 items-center justify-center rounded-lg bg-gray-50">
          <span className="text-gray-400">Alert frequency chart</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>High Priority</span>
            <span className="font-medium">12 alerts</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Budget Related</span>
            <span className="font-medium">8 alerts</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center font-medium">
          <ArchiveBoxIcon className="mr-2 size-5 text-purple-600" />
          Notification Management
        </h3>
        <div className="space-y-3">
          <button className="quick-action-btn">
            Download Alert History (CSV)
          </button>
          <button className="quick-action-btn">Adjust Alert Preferences</button>
          <button className="quick-action-btn">
            Configure Notification Channels
          </button>
        </div>
      </div>

      {/* Priority Alerts */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-medium">High Priority Alerts (3)</h3>
        <div className="space-y-4">
          {priorityAlerts.map((alert) => (
            <div
              key={alert.id}
              className="rounded-lg border-l-4 border-red-600 bg-red-50 p-3"
            >
              <p className="text-sm font-medium text-red-800">
                {alert.message}
              </p>
              <p className="mt-1 text-xs text-red-600">
                {alert.date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
