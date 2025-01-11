"use client";

import { Message, sendVerifEmail, VerifyEmailCode } from "@/lib/apiSpecific";
import { extractHttpErrorMessage } from "@/lib/error-handler";
import { extractEmailFromPath } from "@/lib/utils";
import React, { JSX, useEffect, useState } from "react";
import CodeModal from "@/components/CodeModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function VerifyEmail(): JSX.Element {
  const [email, setEmail] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [enterCode, setEnterCode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname; // e.g., "/mfa/verif-email/email"
      const extractedEmail = extractEmailFromPath(currentPath);
      if (extractedEmail) {
        setEmail(extractedEmail);
      } else {
        setMessage("Invalid email link. Please check the URL.");
      }
    }
  }, []);

  const handleResendEmail = async () => {
    if (!email) {
      setMessage("No valid email found. Please check the URL.");
      return;
    }

    setIsLoading(true);
    try {
      const responseData: Message = await sendVerifEmail({ email });
      if (responseData.message) {
        setMessage(responseData.message);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="m-auto flex max-h-screen items-center justify-center p-4">
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center space-y-6 p-8">
          <div
            className="mt-4 flex size-24 items-center justify-center rounded-full bg-[#90C695] p-4"
            aria-label="Mail Icon"
          >
            <Mail className="size-24 text-green-800" />
          </div>

          <h1 className="h2 md:h1 text-center tracking-tight">
            Verify your email address
          </h1>

          <div>
            {email ? (
              <>
                <p className="mb-2 text-center text-sm md:text-base">
                  We have sent a verification link to {email}.
                </p>

                <p className="text-center text-sm md:text-base">
                  Click on the link to complete the verification process.
                  <br />
                  You might need to{" "}
                  <span className="font-semibold">check your spam folder.</span>
                </p>
              </>
            ) : (
              <p className="text-center text-sm text-red-500 md:text-base">
                Unable to extract email. Please check the URL.
              </p>
            )}
          </div>

          <div className="flex w-full flex-row items-center justify-center sm:gap-10">
            <Button
              onClick={handleResendEmail}
              disabled={isLoading || !email}
              className={`rounded-lg bg-brand px-2 text-xs font-medium leading-[20px] transition-all hover:bg-dollar sm:text-[14px] ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
              aria-label="Resend Email Button"
            >
              {isLoading ? "Resending..." : "Resend email"}
            </Button>

            <div className="flex flex-col items-center justify-center gap-4 sm:gap-10">
              <Button
                variant="link"
                onClick={() => setEnterCode(true)}
                className="text-xs sm:text-base"
                aria-label="Return to Login Button"
              >
                Resume login →
              </Button>
            </div>
          </div>

          {message && (
            <p
              className="mt-4 text-center text-xs text-red-500 md:text-sm"
              aria-live="polite"
            >
              {message}
            </p>
          )}

          <p className="mt-6 text-xs font-thin italic text-black md:text-sm">
            You can contact us if you face any issues.
          </p>
        </CardContent>
      </Card>
      {enterCode && (
        <CodeModal
          email={email}
          setIsOpen={setEnterCode}
          codeLength={8}
          onVerifyCode={VerifyEmailCode}
          URL="/sign-in"
        />
      )}{" "}
    </div>
  );
}
