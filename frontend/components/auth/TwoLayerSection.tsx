"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface TwoLayerSectionProps {
  width?: string;
  backgroundImages?: string[];
  interval?: number;
}

const TwoLayerSection: React.FC<TwoLayerSectionProps> = ({
  width = "100%",
  backgroundImages = [
    "/assets/images/auth_bgImg.jpeg",
    "/assets/images/finance_bg1.jpg",
    "/assets/images/finance_bg2.png",
    "/assets/images/finance_bg3.jpg",
  ],
  interval = 10000,
}) => {
  const symbols = [
    { symbol: "$", color: "text-dollar" },
    { symbol: "€", color: "text-euro" },
    { symbol: "¥", color: "text-yen" },
    { symbol: "₩", color: "text-won" },
    { symbol: "₽", color: "text-ruble" },
    { symbol: "¥", color: "text-yuan" },
    { symbol: "£", color: "text-pound" },
    { symbol: "₹", color: "text-inr" },
    { symbol: "₣", color: "text-franc" },
    { symbol: "₺", color: "text-try" },
    { symbol: "₴", color: "text-uah" },
    { symbol: "₪", color: "text-ils" },
    { symbol: "₱", color: "text-peso" },
    { symbol: "฿", color: "text-thb" },
    { symbol: "₡", color: "text-colon" },
    { symbol: "د.إ", color: "text-aed" },
    { symbol: "﷼", color: "text-sar" },
    { symbol: "₲", color: "text-pyg" },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [randomSymbols, setRandomSymbols] = useState<
    { symbol: string; color: string; top: string; left: string }[]
  >([]);
  const length = backgroundImages.length;

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, interval);

    return () => clearInterval(sliderInterval);
  }, [backgroundImages.length, interval]);

  useEffect(() => {
    // Generate random symbols and positions client-side
    const generatedSymbols = [...Array(17)].map(() => {
      const { symbol, color } =
        symbols[Math.floor(Math.random() * symbols.length)];
      return {
        symbol,
        color,
        top: `${Math.random() * 80}vh`,
        left: `${Math.random() * 80}vw`,
      };
    });
    setRandomSymbols(generatedSymbols);
  }, []);

  return (
    <div
      className="transition-background relative h-full overflow-hidden font-poppins"
      style={{
        width,
        backgroundImage:
          length > 0 ? `url(${backgroundImages[currentImageIndex]})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: length > 0 ? "transparent" : "black",
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {randomSymbols.map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.color} animate-bounce-circle text-4xl font-bold opacity-80`}
            style={{
              top: item.top,
              left: item.left,
              lineHeight: "3rem",
              textAlign: "center",
              animationDelay: `${index * 0.5}s`,
            }}
          >
            {item.symbol}
          </div>
        ))}
      </div>

      {/* Second Layer (Centered Rectangle) */}
      <div
        className="relative z-10 mx-auto mt-20 flex items-center justify-center rounded-xl p-4 opacity-100 shadow-lg backdrop-blur-md transition duration-500 ease-in-out"
        style={{
          width: "80%",
        }}
      >
        <div className="rounded-lg bg-gradient-to-b from-gray-800 to-gray-900 p-8 text-center shadow-lg">
          <h1 className="text-3xl font-extrabold text-green-400">
            Take Control of Your Financial Future
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-white">
            Welcome to{" "}
            <span className="font-bold text-green-400">SmartFinance</span>—your
            all-in-one solution to manage personal finances, optimize savings,
            calculate loans, and protect against fraud. Empower your financial
            journey today!
          </p>
          <div className="mt-8 space-y-4">
            <Link
              href="/"
              className="text-sm font-semibold text-blue-600 underline hover:text-blue-700"
              aria-label="See everything that’s new"
            >
              See everything that’s new →
            </Link>
            <p className="text-xs text-gray-400">
              No credit card required. Sign up in less than 2 minutes.
            </p>
          </div>
        </div>
      </div>

      {/* Image at the bottom center */}
      <div className="absolute bottom-[1%] right-[17%] translate-x-1/2 rounded-full opacity-100">
        <Image
          src="/assets/images/myLogo.png"
          alt="Bottom Center Image"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};

export default TwoLayerSection;
