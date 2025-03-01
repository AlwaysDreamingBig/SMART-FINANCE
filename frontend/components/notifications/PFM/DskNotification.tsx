"use client";

import { sampleNotifications } from "@/constants";
import { Notifications } from "@/types";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FilterBar } from "./FilterBar";
import { Header } from "./Header";
import { NotificationList } from "./NotificationList";
import { Sidebar } from "./Sidebar";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<
    "all" | "unread" | "alerts" | "transactions"
  >("all");
  const [notifications, setNotifications] =
    useState<Notifications[]>(sampleNotifications);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const toggleReadStatus = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleNotificationClick = (notification: Notifications) => {
    if (!notification.read) {
      toggleReadStatus(notification.id);
    }
    router.push(notification.link);
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      if (activeTab === "unread" && notification.read) return false;
      if (activeTab === "alerts" && notification.type !== "alert") return false;
      if (
        activeTab === "transactions" &&
        notification.category !== "transaction"
      ) {
        return false;
      }

      if (
        selectedCategory !== "all" &&
        notification.category !== selectedCategory
      ) {
        return false;
      }

      const now = new Date();
      const notificationDate = new Date(notification.date);
      if (
        dateFilter === "7d" &&
        notificationDate < new Date(now.setDate(now.getDate() - 7))
      ) {
        return false;
      }
      if (
        dateFilter === "30d" &&
        notificationDate < new Date(now.setDate(now.getDate() - 30))
      ) {
        return false;
      }

      const searchLower = searchQuery.toLowerCase();
      if (
        searchLower &&
        !notification.message.toLowerCase().includes(searchLower) &&
        !notification.category.toLowerCase().includes(searchLower)
      ) {
        return false;
      }

      return true;
    });
  }, [notifications, activeTab, selectedCategory, dateFilter, searchQuery]);

  const priorityAlerts = filteredNotifications
    .filter((n) => n.priority === "high")
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl p-8">
      <Header markAllAsRead={markAllAsRead} />
      <FilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {["all", "unread", "alerts", "transactions"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`border-b-2 px-1 py-4 font-medium ${
                      activeTab === tab
                        ? "border-purple-600 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
            <NotificationList
              notifications={filteredNotifications}
              toggleReadStatus={toggleReadStatus}
              deleteNotification={deleteNotification}
              handleNotificationClick={handleNotificationClick}
            />
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">
                  Showing 1-10 of 84 notifications
                </p>
                <div className="flex gap-2">
                  <button className="pagination-btn">Previous</button>
                  <button className="pagination-btn active">1</button>
                  <button className="pagination-btn">2</button>
                  <button className="pagination-btn">3</button>
                  <button className="pagination-btn">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Sidebar priorityAlerts={priorityAlerts} />
      </div>
    </div>
  );
}
