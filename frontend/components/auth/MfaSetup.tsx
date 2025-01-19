"use client";

import React, { JSX } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

const securityBenefits: string[] = [
  "Prevent unauthorized access, even if your password is stolen.",
  "Quick setup with your favorite authenticator app.",
  "Recommended by security experts worldwide.",
];

interface MfaSetupProps {
  userId: string;
  onEnableMfa: () => void; // Prop to trigger MFA setup
}

export default function MfaSetup({
  userId,
  onEnableMfa,
}: MfaSetupProps): JSX.Element {
  const router = useRouter();
  // Sends API request to enable MFA
  const enableMfa = async (userId: string) => {
    console.log(`Enabling MFA for user: ${userId}`);
    // Add API request logic here
    // ...
    onEnableMfa();
  };

  // Navigate to the next page
  const skip = async () => {
    router.replace("/Dashboard");
  };

  return (
    <div className="mx-auto max-w-[900px] bg-[#f1f1f1] p-6 px-4 lg:p-8">
      <Card className="border-none">
        <CardHeader className="bg-[#f1f1f1] py-6 text-center">
          <CardTitle className="h3 md:h2 mb-2 text-center text-green-700">
            Keep your account secure
          </CardTitle>
          <CardDescription className="subtitle-2 mx-auto max-w-[789px] text-black">
            Enable Multi-Factor Authentication (MFA) to add an extra layer of
            security to your account. Protect yourself from unauthorized access
            and ensure your data stays safe.
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-12 pt-6">
          <h2 className="mb-8 text-center text-[18px] font-medium md:text-left md:text-[26px]">
            Use Microsoft Authenticator
          </h2>

          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex h-52 w-[123px] flex-col items-center justify-center rounded-lg border-8 border-gray-500 bg-white">
              <ShieldCheck size={70} className="mb-12 text-green-400" />
              <div className="h-[15px] w-14 bg-gray-500" />
            </div>

            <div className="flex-1">
              <h3 className="md:text-[26px mb-4 text-[22px] font-medium">
                Get the application
              </h3>

              <p className="mb-3 text-sm md:text-base">
                On your mobile device, please install Microsoft Authenticator:{" "}
                <a
                  href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Google Play Store (Android)
                </a>{" "}
                or{" "}
                <a
                  href="https://apps.apple.com/us/app/google-authenticator/id388497605"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  App Store (iOS)
                </a>
                .
              </p>

              <p className="mb-3 text-sm md:text-base">
                After installing the M.A app on your device, please choose
                &quot;<span className="text-green-500">Enable</span>&quot;.
              </p>

              <ul className="ml-8 list-disc space-y-2 text-sm md:text-base">
                {securityBenefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-row justify-between gap-4 py-4">
          <Button
            className="rounded-[10px] bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-[#f19699] md:px-6 md:py-4 md:text-base"
            onClick={skip}
          >
            Skip setup
          </Button>
          <Button
            className="rounded-[10px] bg-[#1c803a] px-4 py-2 text-sm font-semibold hover:bg-[#156830] md:px-6 md:py-4 md:text-base"
            onClick={() => enableMfa(userId)}
          >
            Enable
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
