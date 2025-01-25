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
