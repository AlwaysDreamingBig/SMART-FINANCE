"use client";

import { connectedtUser } from "@/redux/user/userSlice";
import React, { JSX, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BellIcon } from "@heroicons/react/24/outline";
import { Headphones, Settings } from "lucide-react";

// Bottom items for the sidebar with dynamic routes
const bottomItems = [
  {
    icon: Settings,
    label: "Settings",
    route: "/user/:sessionId/:userId/Settings",
  },
  {
    icon: Headphones,
    label: "Support",
    route: "/user/:sessionId/:userId/Support",
  },
  {
    icon: BellIcon,
    label: "Support",
    route: "/user/:sessionId/:userId/Support",
  },
];

export default function AvatarButtonSection(): JSX.Element {
  const [selected, setSelected] = useState<number | null>(null); // Track the selected item
  const router = useRouter(); // Use useRouter from next/navigation

  // Get `userId` and `sessionId` from Redux
  const currentUser = useSelector(connectedtUser);
  const { id = "", session = "" } = currentUser || {};

  // Define navigation items with dynamic routing
  const navigationItems = [
    { label: "Profile", route: `/user/${session}/${id}/Profile` },
  ];

  // Handle navigation and selection
  const handleNavigation = (index: number, route: string) => {
    setSelected(index); // Set the selected item
    router.push(route); // Navigate to the route
  };

  return (
    <div className="hidden flex-col items-center gap-4 p-4 sm:flex">
      {/* Bottom items (Settings, Support) */}
      {bottomItems.map((item, index) => (
        <Button
          key={index}
          variant="ghost"
          size="icon"
          className={`size-[34px] text-green-500 ${
            selected === index ? "border" : ""
          }`} // Apply green color when selected
          onClick={() =>
            handleNavigation(
              index,
              item.route.replace(":userId", id).replace(":sessionId", session)
            )
          }
        >
          <item.icon className="size-full" />
        </Button>
      ))}

      {/* Avatar Section */}
      <Avatar
        className="size-[50px] cursor-pointer"
        onClick={() => handleNavigation(0, navigationItems[0].route)}
      >
        <AvatarImage src="/assets/images/profile.jpg" alt="User" />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
    </div>
  );
}
