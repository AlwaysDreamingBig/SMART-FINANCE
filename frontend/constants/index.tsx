import { FinanceData } from "@/types";

export const cashFlowData = [
  { month: "Jan", income: 4000, expenses: 2500 },
  { month: "Feb", income: 4500, expenses: 2700 },
  { month: "Mar", income: 5000, expenses: 3200 },
  { month: "Apr", income: 4800, expenses: 2900 },
  { month: "May", income: 5200, expenses: 3100 },
];

export const netWorthData = [
  { month: "January", netWorth: 1986 },
  { month: "February", netWorth: 2045 },
  { month: "March", netWorth: 2103 },
  { month: "April", netWorth: 1872 },
  { month: "May", netWorth: 2204 },
  { month: "June", netWorth: 2157 },
];

export const subscriptionData = [
  { month: "Jan", Netflix: 15, Spotify: 10, Gym: 40, Software: 20 },
  { month: "Feb", Netflix: 15, Spotify: 10, Gym: 40, Software: 20 },
  { month: "Mar", Netflix: 15, Spotify: 10, Gym: 40, Software: 25 },
  { month: "Apr", Netflix: 15, Spotify: 10, Gym: 45, Software: 25 },
  { month: "May", Netflix: 15, Spotify: 12, Gym: 45, Software: 30 },
];

export const financeData: FinanceData = {
  current: {
    totalBalance: 5000,
    totalIncome: 3000,
    totalExpenses: 2000,
    savingsRate: 20, // Percentage
    netWorth: 50000,
  },
  previous: {
    totalBalance: 4900,
    totalIncome: 2700,
    totalExpenses: 1900,
    savingsRate: 22,
    netWorth: 48000,
  },
};
