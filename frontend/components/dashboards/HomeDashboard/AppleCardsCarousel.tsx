"use client";

import React from "react";
import Image from "next/image";
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";

export function AppleCardsCarousel() {
  const cards = myDdata.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="max-h-screen w-full">
      {/* Carousel */}
      <div className="">
        <Carousel items={cards} />
      </div>
    </div>
  );
}

const ContentPfm = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"content-pfm" + index}
            className="mb-4 rounded-3xl bg-[#F5F5F7] p-6 dark:bg-neutral-800 md:p-8"
          >
            <p className="mx-auto max-w-3xl font-sans text-base text-neutral-600 dark:text-neutral-400 md:text-2xl">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Take control of your finances and plan for the future.
              </span>{" "}
              SmartFinance3 provides easy-to-use tools for budgeting, tracking
              expenses, and setting financial goals. Stay on top of your
              savings, investments, and spending with personalized insights that
              help you make smarter financial decisions.
            </p>
            <Image
              src="https://assets.aceternity.com/finance.png" // Replace with a relevant image
              alt="Finance Management"
              height={500}
              width={500}
              className="mx-auto size-full object-contain md:size-1/2"
            />
          </div>
        );
      })}
    </>
  );
};

const ContentLmm = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"content-lmm" + index}
            className="mb-4 rounded-3xl bg-[#F5F5F7] p-6 dark:bg-neutral-800 md:p-8"
          >
            <p className="mx-auto max-w-3xl font-sans text-base text-neutral-600 dark:text-neutral-400 md:text-2xl">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Simplify your loan management with SmartFinance3.
              </span>{" "}
              Whether you&apos;re managing a mortgage or personal loans,
              SmartFinance3 helps you track, pay, and optimize your payments.
              Get personalized advice on how to reduce interest, save money, and
              pay off loans faster using smart loan strategies.
            </p>
            <Image
              src="https://assets.aceternity.com/loan.png" // Replace with a relevant image
              alt="Loan Management"
              height={500}
              width={500}
              className="mx-auto size-full object-contain md:size-1/2"
            />
          </div>
        );
      })}
    </>
  );
};

const ContentAifd = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"content-aifd" + index}
            className="mb-4 rounded-3xl bg-[#F5F5F7] p-6 dark:bg-neutral-800 md:p-8"
          >
            <p className="mx-auto max-w-3xl font-sans text-base text-neutral-600 dark:text-neutral-400 md:text-2xl">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Stay protected with AI-powered fraud detection.
              </span>{" "}
              Our advanced AI algorithms analyze transactions in real time to
              identify suspicious activities and prevent fraud before it
              happens. Whether it&apos;s credit card fraud, account takeovers,
              or other malicious actions, SmartFinance3 helps you stay one step
              ahead with reliable security and alerts.
            </p>
            <Image
              src="https://assets.aceternity.com/fraud-detection.png" // Replace with a relevant image
              alt="AI Fraud Detection"
              height={500}
              width={500}
              className="mx-auto size-full object-contain md:size-1/2"
            />
          </div>
        );
      })}
    </>
  );
};

const ContentPromotions = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"content-promotions" + index}
            className="mb-4 rounded-3xl bg-[#F5F5F7] p-6 dark:bg-neutral-800 md:p-8"
          >
            <p className="mx-auto max-w-3xl font-sans text-base text-neutral-600 dark:text-neutral-400 md:text-2xl">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Don&apos;t miss our exclusive promotional offers!
              </span>{" "}
              Get access to limited-time deals on all our services. Whether
              it&apos;s personalized finance tips, better loan rates, or new
              AI-powered features, SmartFinance3 is here to make your financial
              journey easier and more rewarding. Act fast—these offers
              won&apos;t last long!
            </p>
            <Image
              src="https://assets.aceternity.com/promotion.png" // Replace with a relevant image
              alt="Promotions and Offers"
              height={500}
              width={500}
              className="mx-auto size-full object-contain md:size-1/2"
            />
          </div>
        );
      })}
    </>
  );
};

const ContentNewFeatures = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"content-newfeatures" + index}
            className="mb-4 rounded-3xl bg-[#F5F5F7] p-6 dark:bg-neutral-800 md:p-8"
          >
            <p className="mx-auto max-w-3xl font-sans text-base text-neutral-600 dark:text-neutral-400 md:text-2xl">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Discover our newest features designed just for you.
              </span>{" "}
              We’re constantly improving and expanding the tools that make
              managing your personal finances easier. From advanced AI-driven
              budgeting to smoother loan applications, SmartFinance3 keeps
              adding exciting features to help you make the most of your
              financial journey.
            </p>
            <Image
              src="https://assets.aceternity.com/new-features.png" // Replace with a relevant image
              alt="New Features in SmartFinance3"
              height={500}
              width={500}
              className="mx-auto size-full object-contain md:size-1/2"
            />
          </div>
        );
      })}
    </>
  );
};

const myDdata = [
  {
    category: "Personal Finance Management",
    title: "Master your finances with PFM tools.",
    src: "/assets/images/masterfinance.jpg",
    content: <ContentPfm />,
  },
  {
    category: "Loan and Mortgage Management",
    title: "Simplify loan applications and management.",
    src: "/assets/images/loan.png",
    content: <ContentLmm />,
  },
  {
    category: "AI Fraud Detection",
    title: "Stay safe with AI-powered fraud detection.",
    src: "/assets/images/aifd.jpg",
    content: <ContentAifd />,
  },
  {
    category: "Promotions",
    title: "Check out our latest promotions and offers.",
    src: "/assets/images/promotions.jpg",
    content: <ContentPromotions />,
  },
  {
    category: "New Features",
    title: "Discover new features to improve your experience.",
    src: "/assets/images/features.jpg",
    content: <ContentNewFeatures />,
  },
];
