"use client";

import React from "react";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";

// Sends API request to enable MFA
const sendQrRequest = async (userId: string) => {
  console.log(`Resend QR Code for user: ${userId}`);
  // Add your API request logic here
};

// Sends API request to enable MFA
const validateQr = async (userId: string) => {
  console.log(`Validate QR Code for user: ${userId}`);
  // Add your API request logic here
};

// Sends API request to enable MFA
const cancel = () => {
  console.log("Back to sign-in");
  // Add your API request logic here to disable mfa otp
};

const OtpBox = ({ userId }: { userId: string }) => {
  return (
    <div className="shad-alert-dialog flex flex-col items-center justify-center gap-5 border">
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="h1"> Enter your OTP</p>
        <p>Please scan this QR Code with your authenticator app.</p>
        <p className="text-sm italic">
          The QR-Code is not loading?{" "}
          <span
            className="cursor-pointer text-blue-500 underline hover:text-blue-600"
            onClick={() => sendQrRequest(userId)}
          >
            Receive another qr-code
          </span>
        </p>
      </div>

      <div className="flex items-center justify-center">
        <Image
          src="/assets/images/myLogo.png"
          alt="QR-Code"
          className="h-auto max-w-full border-4"
          width={300}
          height={300}
        />
      </div>

      <div>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className="shad-otp-slot" />
            <InputOTPSlot index={1} className="shad-otp-slot" />
            <InputOTPSlot index={2} className="shad-otp-slot" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} className="shad-otp-slot" />
            <InputOTPSlot index={4} className="shad-otp-slot" />
            <InputOTPSlot index={5} className="shad-otp-slot" />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="flex w-full flex-col justify-between gap-2 py-4">
        <Button className="shad-submit-btn" onClick={() => validateQr(userId)}>
          Send
        </Button>

        <Button className="shad-cancel-btn" onClick={cancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default OtpBox;
