"use client";

import React, { ReactNode } from "react";
import PfmNavigation from "@/components/menus/PFM_Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col space-y-10">
      <div className="sticky top-0 z-50 bg-white">
        <PfmNavigation />
      </div>

      <main className="grow overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;
