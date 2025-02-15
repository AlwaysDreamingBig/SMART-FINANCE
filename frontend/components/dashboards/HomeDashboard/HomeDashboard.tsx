import { User } from "@/types";
import React from "react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import {
  ArrowRightIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { AppleCardsCarousel } from "./AppleCardsCarousel";
import { HomeAnimatedTestimonials } from "./HomeAnimatedTestimonials";
import { HomeChartBar, HomeChartLine } from "./HomeChart";
import NotificationPanel from "./NotificationPanel";

const HomeDashboard: React.FC<{ user: User }> = ({ user }) => {
  const words = [
    { text: "Welcome" },
    { text: "back" },
    {
      text: user?.firstName || "Guest",
      className: "text-green-400 dark:text-purple-400",
    },
  ];

  return (
    <div>
      {/* Main Content */}
      <div className="flex flex-1 flex-col space-y-6 overflow-auto p-6">
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
          <div>
            <TypewriterEffect
              words={words}
              className="text-2xl font-bold text-gray-900 xl:text-3xl"
              cursorClassName="h-8"
            />
            <p className="mt-2 text-sm text-gray-600">
              Financial overview for{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <QuestionMarkCircleIcon className="size-6 cursor-pointer text-gray-400 hover:text-gray-600" />
            <NotificationPanel alerts={2} messages={7} transactions={4} />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">
                Total Assets
              </h3>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                +2.4%
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold">$245,320</p>
          </div>
          {/* Add 3 more metric cards similarly */}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Spending Trends</h3>
              <button className="flex items-center gap-1 text-sm text-purple-600">
                View details <ArrowRightIcon className="size-4" />
              </button>
            </div>
            <HomeChartLine />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Budget Allocation</h3>
              <div className="flex items-center gap-2">
                <button className="text-xs text-gray-500 hover:text-purple-600">
                  Month
                </button>
                <button className="text-xs text-gray-500 hover:text-purple-600">
                  Year
                </button>
              </div>
            </div>
            <HomeChartBar />
          </div>
        </div>

        {/* Testimonials & Cards Section */}
        <div className="grid grid-cols-1 gap-6 pb-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-medium text-gray-900">
              Client Testimonials
            </h3>
            <HomeAnimatedTestimonials />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Recent Transactions</h3>
              <button className="flex items-center gap-1 text-sm text-purple-600">
                View all <ArrowRightIcon className="size-4" />
              </button>
            </div>
            <AppleCardsCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
