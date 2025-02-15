import { connectedtUser } from "@/redux/user/userSlice";
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const LmcNavigation: React.FC = () => {
  // Navigation items for LMC_Navigation
  const navItems = [
    { label: "Dashboard", to: "/LMC/:sessionId/:userId/Dashboard" },
    { label: "Checklist", to: "/LMC/:sessionId/:userId/AppChecklist" },
    {
      label: "Calculator",
      to: "/LMC/:sessionId/:userId/AffordabilityCalculator",
    },
    { label: "Loan", to: "/LMC/:sessionId/:userId/LoanComparison" },
    { label: "Repayment", to: "/LMC/:sessionId/:userId/RepaymentSchedule" },
    { label: "Savings", to: "/LMC/:sessionId/:userId/Savings" },
    { label: "Ressources", to: "/LMC/:sessionId/:userId/TipsRessources" },
  ];

  // Get `userId` and `sessionId` from Redux
  const currentUser = useSelector(connectedtUser);
  const { id = "", session = "" } = currentUser || {};

  return (
    <Navbar
      brandName="L.M.C"
      navItems={navItems}
      sessionId={session}
      userId={id}
    />
  );
};

export default LmcNavigation;
