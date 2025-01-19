"use client";

import {
  Eanable,
  EanableMfa,
  EanableResponse,
  EanableTotp,
} from "@/lib/apiSpecific";
import { extractHttpErrorMessage } from "@/lib/error-handler";
import { connectedtUser } from "@/redux/user/userSlice";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import MfaSetup from "@/components/auth/MfaSetup";
import OtpBox from "@/components/auth/OtpBox";
import { AnimatePresence, motion } from "framer-motion";

const Page = () => {
  const [showOtpBox, setShowOtpBox] = useState(false);
  const currentUser = useSelector(connectedtUser);
  const Eanable: Eanable = { userId: currentUser?.id, enable: true };
  const [message, setMessage] = useState<string | null>(null);
  const MODIF_MFA_OK = "MFA modification successful.";
  const MODIF_OTP_OK = "OTP modification successful.";

  // Function to handle the button click in MfaSetup
  const handleEnableMfa = async () => {
    try {
      const responseData: EanableResponse = await EanableMfa(Eanable);

      await handleEnableTotp(Eanable);

      console.log(responseData);
      if (responseData.message) {
        setMessage(responseData.message);

        setShowOtpBox(true);
      }
    } catch (error) {
      const errorString =
        error instanceof Error ? error.message : String(error);
      const errorMessage = extractHttpErrorMessage(errorString);
      setMessage(
        error instanceof Error
          ? errorMessage
          : "An unknown error occurred. Please try again."
      );
    }
  };

  const handleEnableTotp = async (Eanable: Eanable) => {
    try {
      const responseData: EanableResponse = await EanableTotp(Eanable);
      console.log(responseData);
      if (responseData.message) {
        setMessage(responseData.message);

        setShowOtpBox(true);
      }
    } catch (error) {
      const errorString =
        error instanceof Error ? error.message : String(error);
      const errorMessage = extractHttpErrorMessage(errorString);
      setMessage(
        error instanceof Error
          ? errorMessage
          : "An unknown error occurred. Please try again."
      );
    }
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
            <MfaSetup
              userId={currentUser?.id || ""}
              onEnableMfa={handleEnableMfa}
            />
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
            <OtpBox userId={currentUser?.id || ""} />
          </motion.div>
        )}
      </AnimatePresence>
      {message && (
        <p
          className={`mt-4 text-center text-xs md:text-sm ${
            message === MODIF_MFA_OK || MODIF_OTP_OK
              ? "text-green-600"
              : "text-red-500"
          }`}
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Page;
