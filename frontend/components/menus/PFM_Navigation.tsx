import { connectedtUser } from "@/redux/user/userSlice";
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const PfmNavigation: React.FC = () => {
  // Navigation items for PFM_Navigation
  const navItems = [
    { label: "Dashboard", to: "/PFM/:sessionId/:userId/Dashboard" },
    { label: "Budgets", to: "/PFM/:sessionId/:userId/Budgets" },
    {
      label: "Notifications",
      to: "/PFM/:sessionId/:userId/NotificationsAlerts",
    },
    { label: "Payments", to: "/PFM/:sessionId/:userId/Payments" },
    { label: "Analytics", to: "/PFM/:sessionId/:userId/ReportsAnalytics" },
    { label: "Goals", to: "/PFM/:sessionId/:userId/SavingGoals" },
    { label: "Transactions", to: "/PFM/:sessionId/:userId/Transactions" },
  ];

  // Get `userId` and `sessionId` from Redux
  const currentUser = useSelector(connectedtUser);
  const { id = "", session = "" } = currentUser || {};

  return (
    <Navbar
      brandName="P.F.M"
      navItems={navItems}
      sessionId={session}
      userId={id}
    />
  );
};

export default PfmNavigation;
