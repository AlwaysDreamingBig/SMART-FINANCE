import { connectedtUser } from "@/redux/user/userSlice";
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const AifdsNavigation: React.FC = () => {
  // Navigation items for AIFDS_Navigation
  const navItems = [
    { label: "Dashboard", to: "/AIFDS/:sessionId/:userId/Dashboard" },
    { label: "Insights", to: "/AIFDS/:sessionId/:userId/AnalyticsInsights" },
    { label: "Flags", to: "/AIFDS/:sessionId/:userId/FlaggedTransactions" },
    { label: "Fraud", to: "/AIFDS/:sessionId/:userId/FraudPrevention" },
    { label: "Training", to: "/AIFDS/:sessionId/:userId/ModelTraining" },
    {
      label: "Monitoring",
      to: "/AIFDS/:sessionId/:userId/TransactionMonitoring",
    },
  ];

  // Get `userId` and `sessionId` from Redux
  const currentUser = useSelector(connectedtUser);
  const { id = "", session = "" } = currentUser || {};

  return (
    <Navbar
      brandName="AI.F.D.S"
      navItems={navItems}
      sessionId={session}
      userId={id}
    />
  );
};

export default AifdsNavigation;
