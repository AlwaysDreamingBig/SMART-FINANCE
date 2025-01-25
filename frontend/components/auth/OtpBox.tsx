"use client";

import { ValidateTotpCode, ValidateUserCode } from "@/lib/apiSpecific";
import { extractHttpErrorMessage } from "@/lib/error-handler";
import { customDelay, getErrorMessage } from "@/lib/utils";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";

interface OtpProps {
  userId: string;
  qrCode: string;
  generateOPQrCodeLink: () => Promise<void>;
}

const OtpBox = ({ userId, qrCode, generateOPQrCodeLink }: OtpProps) => {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [loader, setLoader] = useState<boolean>(false);

  const INVALID_OTP = "Invalid OTP";

  const cancel = () => {
    router.replace("/sign-in");
  };

  // Sends API request to enable MFA
  const validateQr = async (code: string) => {
    try {
      const user: ValidateUserCode = { token: code, userId };
      const responseData = await ValidateTotpCode(user);

      if (responseData) {
        setMessage(responseData.message);

        setLoader(true);

        await customDelay(1000);

        router.replace("/Dashboard");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error, extractHttpErrorMessage);
      setMessage(errorMessage);
    }
  };

  return (
    <div className="shad-alert-dialog flex flex-col items-center justify-center gap-5 border">
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="h1"> Enter your OTP</p>
        <p className="text-center">
          Please scan this QR Code with your authenticator app.
        </p>
        <p className="text-center text-sm italic">
          The QR-Code is not loading?{" "}
          <span
            className="cursor-pointer text-blue-500 underline hover:text-blue-600"
            onClick={generateOPQrCodeLink}
          >
            Receive another qr-code
          </span>
        </p>
      </div>

      <div className="flex items-center justify-center">
        <Image
          src={qrCode}
          alt="QR-Code"
          className="h-auto max-w-full border-4"
          width={200}
          height={200}
        />
      </div>

      <div>
        <InputOTP maxLength={6} value={code} onChange={setCode}>
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
      {message === INVALID_OTP && (
        <div className="text-center text-sm text-red-600">
          The code you entered is not valid
        </div>
      )}

      {loader && (
        <div className="flex items-center justify-center space-x-2">
          <Image
            src="/assets/svg/spinning-circles.svg"
            alt="loader"
            width={24}
            height={24}
            className="ml-2 text-green-600"
          />

          <div className="text-center text-green-500">{message}</div>
        </div>
      )}

      <div className="flex w-full flex-col justify-between gap-2 py-4">
        <Button className="shad-submit-btn" onClick={() => validateQr(code)}>
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
