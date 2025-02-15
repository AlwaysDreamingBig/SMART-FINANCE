import { connectedtUser } from "@/redux/user/userSlice";
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const BankNavigation: React.FC = () => {
  // Navigation items for bank_Navigation
  const navItems = [
    { label: "Dashboard", to: "/bank/:sessionId/:userId/ConnectBank" },
    { label: "Connect", to: "/bank/:sessionId/:userId/Budgets" },
    { label: "My Banks", to: "/bank/:sessionId/:userId/ConnectBank" },
  ];

  // Get `userId` and `sessionId` from Redux
  const currentUser = useSelector(connectedtUser);
  const { id = "", session = "" } = currentUser || {};

  return (
    <Navbar
      brandName="Banks"
      navItems={navItems}
      sessionId={session}
      userId={id}
    />
  );
};

export default BankNavigation;
