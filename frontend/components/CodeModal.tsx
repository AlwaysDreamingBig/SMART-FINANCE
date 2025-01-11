"use client";

import { Code, Message } from "@/lib/apiSpecific";
import { extractHttpErrorMessage } from "@/lib/error-handler";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface CodeModalProps {
  email: string | null;
  codeLength: number; // Dynamic OTP length
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onVerifyCode: (data: Code) => Promise<Message>; // Verification functioN
  URL: string;
}

const CodeModal = ({
  email,
  codeLength,
  setIsOpen,
  onVerifyCode,
  URL,
}: CodeModalProps) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data: Code = { code };

    try {
      const success = await onVerifyCode(data); // Pass the Code object
      if (success) {
        setSuccessMessage(success.message);

        router.push(`${URL}`);
      } else {
        setErrorMessage("Verification failed");
      }
    } catch (error) {
      const errorString =
        error instanceof Error ? error.message : String(error);
      const errorMessage = extractHttpErrorMessage(errorString);
      setErrorMessage(errorMessage);
    }

    setIsLoading(false);
  };

  return (
    <AlertDialog open={true} onOpenChange={() => setIsOpen(false)}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">
            Enter Your Code
            <Image
              src="/assets/icons/close-dark.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => setIsOpen(false)}
              className="otp-close-button cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            We&apos;ve sent a code to{" "}
            <span className="pl-1 text-brand">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP maxLength={codeLength} value={code} onChange={setCode}>
          <InputOTPGroup className="shad-otp">
            {Array.from({ length: codeLength }).map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="shad-otp-slot"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction
              onClick={handleSubmit}
              className="shad-submit-btn h-12"
              type="button"
            >
              Submit
              {isLoading && (
                <Image
                  src="/assets/svg/rings.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2"
                />
              )}
            </AlertDialogAction>

            {successMessage && (
              <div className="text-center text-green-600">{successMessage}</div>
            )}

            {errorMessage && (
              <div className="text-center text-red-600">{errorMessage}</div>
            )}

            <div className="subtitle-2 mt-2 text-center text-light-100">
              Didn&apos;t get a code?{" "}
              <span className="pl-1 text-brand">
                Click on the resend button
              </span>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CodeModal;
