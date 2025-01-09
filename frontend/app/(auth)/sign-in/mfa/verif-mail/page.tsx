"use client";

import React, { JSX } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function VerifyEmail(): JSX.Element {
  const handleResendEmail = () => {
    // Handle resend email logic
  };

  const handleReturnToLogin = () => {
    // Handle return to login logic
  };

  return (
    <div className="m-auto flex max-h-screen items-center justify-center p-4">
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center space-y-6 p-8">
          <div className="mt-4 flex size-24 items-center justify-center rounded-full bg-[#90C695] p-4">
            <Mail className="size-24 text-green-800" />
          </div>

          <h1 className="h2 md:h1 text-center tracking-tight">
            Verify your email address
          </h1>

          <div>
            <p className="mb-2 text-center text-sm md:text-base">
              We have sent a verification link too
            </p>

            <p className="text-center text-sm md:text-base">
              Click on the link to complete the verification process.
              <br />
              You might need to{" "}
              <span className="font-semibold">check your spam folder.</span>
            </p>
          </div>

          <div className="flex w-full flex-row items-center justify-center sm:gap-10">
            <Button
              onClick={handleResendEmail}
              className="rounded-lg bg-brand px-2 text-xs font-medium leading-[20px] transition-all hover:bg-dollar sm:text-[14px]"
            >
              Resend email
            </Button>

            <Button
              variant="link"
              onClick={handleReturnToLogin}
              className="text-xs sm:text-base"
            >
              Return to login →
            </Button>
          </div>

          <p className="mt-6 text-xs font-thin italic text-black md:text-sm">
            You can contact us if you face any issue.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
