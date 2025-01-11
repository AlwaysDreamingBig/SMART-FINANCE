import React from "react";
import TwoLayerSection from "@/components/auth/TwoLayerSection";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        {children}
      </section>

      <section className="hidden w-[45%] items-center justify-center lg:flex">
        <TwoLayerSection />
      </section>
    </div>
  );
};

export default Layout;
