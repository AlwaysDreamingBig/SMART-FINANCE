import React, { JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import AvatarButtonSection from "./AvatarButtons";
import Navigation from "./MainNavigation";

export default function Sidebar(): JSX.Element {
  return (
    <Card className="fixed bottom-1 left-0 h-16 w-full sm:left-0 sm:top-0 sm:h-full sm:w-24">
      <CardContent className="h-full p-0">
        <div className="flex h-full flex-col justify-center sm:justify-between">
          {/* Logo at the Top */}
          <Link href="/Dashboard">
            <div className="mt-6 hidden items-center justify-center gap-1 p-2 sm:flex">
              <Image
                src="/assets/svg/Logo_V1.svg"
                alt="Logo"
                className="rounded-lg"
                width={20}
                height={100}
              />
              <p className="h8 g:h1 font-ibm-plex-serif text-black-1 font-bold">
                SFINANCE3
              </p>
            </div>
          </Link>

          {/* Navigation at the Center */}
          <Navigation />

          {/* Avatar + Bottom Buttons */}
          <AvatarButtonSection />
        </div>
      </CardContent>
    </Card>
  );
}
