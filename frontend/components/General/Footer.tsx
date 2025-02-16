"use client";

import { User } from "@/types";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FooterProps {
  user: User;
  type?: "desktop" | "mobile";
}

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    console.log("Logging out.");
    // Redirect to login page or home after logging out
    router.push("/login");
  };

  // Define colors for the connection status
  const connectionStatusColor = {
    online: "bg-green-500",
    away: "bg-yellow-500",
    offline: "bg-gray-500",
    "out-of-office": "bg-red-500",
  };

  return (
    <footer className="footer flex items-center justify-between space-x-4 bg-white p-4 shadow-md">
      {/* First Column: User Initial in Circle with Connection Status */}
      <div className="relative flex items-center justify-center space-x-2">
        {/* Initial Circle */}
        <div className="flex size-16 items-center justify-center rounded-full bg-gray-200 text-4xl font-bold text-gray-700">
          {user?.firstName[0]}
        </div>

        {/* Connection Status Button Inside the Circle */}
        <div
          className={`absolute bottom-0 right-0 size-5 rounded-full ${connectionStatusColor[user.connectionStatus]} border-2 border-white`}
          title={user.connectionStatus} // Tooltip with the status
        ></div>
      </div>

      {/* Second Column: Name and Email */}
      <div className="flex flex-col items-start space-y-1">
        <h1 className="truncate text-sm font-semibold text-gray-700">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className="truncate text-sm font-normal text-gray-600">
          {user?.email}
        </p>
      </div>

      {/* Third Column: Logout Icon */}
      <div className="cursor-pointer" onClick={handleLogOut}>
        <Image
          src="assets/svg/logout-svgrepo-com.svg"
          width={24}
          height={24}
          alt="logout icon"
        />
      </div>
    </footer>
  );
};

export default Footer;
