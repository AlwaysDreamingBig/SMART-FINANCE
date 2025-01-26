import React from "react";
import Sidebar from "@/components/menus/MainMenu";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-200 p-1">
      {/* Sidebar */}
      <section className="sm:w-24">
        <Sidebar />
      </section>

      {/* Main content */}
      <section className="flex-1 overflow-auto rounded-lg bg-white p-2">
        {children}
      </section>
    </div>
  );
};

export default Layout;
