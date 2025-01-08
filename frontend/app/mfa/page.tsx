"use client";

import React, { useState } from "react";
import MfaSetup from "@/components/auth/MfaSetup";
import OtpBox from "@/components/auth/OtpBox";
import { AnimatePresence, motion } from "framer-motion";

const Page = () => {
  const [showOtpBox, setShowOtpBox] = useState(false);
  const userId = "gghghg";

  // Function to handle the button click in MfaSetup
  const handleEnableMfa = () => {
    setShowOtpBox(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <AnimatePresence mode="wait">
        {!showOtpBox ? (
          <motion.div
            key="mfaSetup"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              duration: 1.5,
            }} // More natural, smooth sliding
          >
            <MfaSetup userId={userId} onEnableMfa={handleEnableMfa} />
          </motion.div>
        ) : (
          <motion.div
            key="otpBox"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              duration: 1.5,
            }} // Smooth slide in and out
          >
            <OtpBox userId={userId} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
