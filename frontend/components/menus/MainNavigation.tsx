"use client";

import { connectedtUser } from "@/redux/user/userSlice";
import React, { JSX, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Updated import
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BarChart3, Bot, Building2, Home } from "lucide-react";

// Navigation items template for the sidebar
const navigationItemsTemplate = [
  {
    icon: BarChart3,
    label: "P.F.M",
    route: "/PFM/:sessionId/:userId/Dashboard",
  },
  { icon: Home, label: "L.M.C", route: "/LMC/:sessionId/:userId/Dashboard" },
  { icon: Bot, label: "AI.FDS", route: "/AIFDS/:sessionId/:userId/Dashboard" },
  {
    icon: Building2,
    label: "Banks",
    route: "/bank/:sessionId/:userId/Dashboard",
  },
];

export default function Navigation(): JSX.Element {
  const [selected, setSelected] = useState<number | null>(null); // Track the selected item
  const router = useRouter(); // Next.js navigation hook

  // Get `userId` and `sessionId` from Redux
  const currentUser = useSelector(connectedtUser);
  const { id = "", session = "" } = currentUser || {};

  // Replace placeholders in routes with dynamic values
  const navigationItems = navigationItemsTemplate.map((item) => ({
    ...item,
    route: item.route.replace(":userId", id).replace(":sessionId", session),
  }));

  const handleNavigation = (index: number, route: string) => {
    setSelected(index); // Set the selected item
    router.push(route); // Navigate to the route
  };

  return (
    <div className="flex w-full flex-row items-center gap-4 sm:flex-col">
      {navigationItems.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.2, opacity: 0.8 }} // Scale and opacity change on hover
          whileTap={{ rotate: 15, scale: 0.95 }} // Slight rotation and scale on click
          transition={{ type: "spring", stiffness: 300, damping: 20 }} // Smooth spring transition
          className={`relative flex w-full justify-center p-2 ${
            selected === index
              ? "before:absolute before:bottom-0 before:left-0 before:h-1 before:w-full before:bg-green-500 sm:before:absolute sm:before:left-0 sm:before:top-0 sm:before:h-full sm:before:w-1 sm:before:bg-green-500"
              : ""
          }`}
          onClick={() => handleNavigation(index, item.route)} // Handle navigation on click
        >
          <Button
            aria-label={`Navigate to ${item.label}`}
            variant="ghost"
            size="icon"
            className={`size-14 rounded-[20px] transition-colors ${
              selected === index
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-muted text-black hover:bg-muted/70"
            } hover:ring-2 hover:ring-green-500`}
          >
            <item.icon
              className={`size-6 ${
                selected === index ? "text-white" : "text-black"
              }`}
            />
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
