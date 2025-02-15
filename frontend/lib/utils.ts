import { CashFlowData } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authFormSchema = (type: string) =>
  z.object({
    // sign up
    firstName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    lastName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    address1: type === "sign-in" ? z.string().optional() : z.string().max(50),
    city: type === "sign-in" ? z.string().optional() : z.string().max(50),
    state:
      type === "sign-in" ? z.string().optional() : z.string().min(2).max(2),
    postalCode:
      type === "sign-in" ? z.string().optional() : z.string().min(3).max(6),
    dateOfBirth: type === "sign-in" ? z.string().optional() : z.string().min(3),
    ssn: type === "sign-in" ? z.string().optional() : z.string().min(3),
    // both
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
    role: z.string().optional(),
  });

export const extractEmailFromPath = (path: string): string | null => {
  const pathSegments = path.split("/");
  const potentialEmail = pathSegments[pathSegments.length - 1];
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(potentialEmail)
    ? decodeURIComponent(potentialEmail)
    : null;
};

/**
 * Delays the execution by a specified number of milliseconds.
 * @param ms - The number of milliseconds to delay.
 * @returns A Promise that resolves after the specified delay.
 */
export const customDelay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// utils/errorUtils.ts
export function getErrorMessage(
  error: unknown,
  extractMessage: (errorString: string) => string
): string {
  if (error instanceof Error) {
    const extractedMessage = extractMessage(error.message);
    return extractedMessage || "An unknown error occurred. Please try again.";
  }
  return "An unknown error occurred. Please try again.";
}

// utils/calculateTrend.ts
export function calculateNetWorthTrend(
  data: { month: string; netWorth: number }[]
): number {
  if (data.length < 2) return 0; // No trend if there's not enough data

  const firstValue = data[0].netWorth;
  const lastValue = data[data.length - 1].netWorth;

  // Calculate percentage change
  const trend = ((lastValue - firstValue) / firstValue) * 100;

  return trend;
}

// Utility function to calculate percentage change
export function calculateCashFlowTrend(
  data: CashFlowData[],
  key: "income" | "expenses"
): number {
  if (data.length < 2) return 0; // If there is not enough data to calculate a trend

  const lastMonth = data[data.length - 1];
  const previousMonth = data[data.length - 2];

  // Calculate the percentage change
  const trend =
    ((lastMonth[key] - previousMonth[key]) / previousMonth[key]) * 100;

  return trend;
}
export const calculateTrend = (current: number, previous: number): string => {
  if (previous === 0) return "0%"; // Avoid division by zero
  const change = ((current - previous) / previous) * 100;
  return `${change.toFixed(1)}%`; // Round to 1 decimal place
};
