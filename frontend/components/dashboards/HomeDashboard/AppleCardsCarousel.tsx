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
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with a relevant image
    content: <ContentPfm />,
  },
  {
    category: "Loan and Mortgage Management",
    title: "Simplify loan applications and management.",
    src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with a relevant image
    content: <ContentLmm />,
  },
  {
    category: "AI Fraud Detection",
    title: "Stay safe with AI-powered fraud detection.",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with a relevant image
    content: <ContentAifd />,
  },
  {
    category: "Promotions",
    title: "Check out our latest promotions and offers.",
    src: "https://images.unsplash.com/photo-1605208138507-578b6cb0e1d1?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with a relevant image
    content: <ContentPromotions />,
  },
  {
    category: "New Features",
    title: "Discover new features to improve your experience.",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with a relevant image
    content: <ContentNewFeatures />,
  },
];
