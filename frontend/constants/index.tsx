import { Budget, BudgetCategory, FinanceData, SmBudget } from "@/types";

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

export const spendingData = [
  { name: "Housing", value: 1200 },
  { name: "Transport", value: 400 },
  { name: "Food", value: 600 },
  { name: "Utilities", value: 300 },
  { name: "Entertainment", value: 500 },
  { name: "Healthcare", value: 300 },
  { name: "Education", value: 700 },
  { name: "Insurance", value: 200 },
  { name: "Savings", value: 1000 },
];

export const budgets: SmBudget[] = [
  { category: "Food", spent: 600, limit: 800 },
  { category: "Entertainment", spent: 150, limit: 300 },
];

export const budgetData: BudgetCategory[] = [
  { name: "Food", budget: 500, spent: 300 },
  { name: "Transport", budget: 200, spent: 150 },
  { name: "Entertainment", budget: 100, spent: 80 },
  { name: "Utilities", budget: 300, spent: 250 },
  { name: "Others", budget: 150, spent: 100 },
];

export const sampleBudgets: Budget[] = [
  {
    id: "1",
    category: "Groceries",
    allocated: 500,
    spent: 320,
    period: "monthly",
    icon: "🛒",
    date: new Date("2025-02-01"),
  },
  {
    id: "2",
    category: "Rent",
    allocated: 1500,
    spent: 1500,
    period: "monthly",
    icon: "🏠",
    date: new Date("2025-02-01"),
  },
  {
    id: "3",
    category: "Entertainment",
    allocated: 200,
    spent: 120,
    period: "weekly",
    icon: "🎮",
    date: new Date("2025-02-03"),
  },
  {
    id: "4",
    category: "Transportation",
    allocated: 300,
    spent: 100,
    period: "monthly",
    icon: "🚗",
    date: new Date("2025-02-01"),
  },
  {
    id: "5",
    category: "Savings",
    allocated: 500,
    spent: 0,
    period: "monthly",
    icon: "💰",
    date: new Date("2025-02-01"),
  },
  {
    id: "6",
    category: "Health & Wellness",
    allocated: 100,
    spent: 75,
    period: "weekly",
    icon: "🏋️",
    date: new Date("2025-02-04"),
  },
  {
    id: "7",
    category: "Utilities",
    allocated: 250,
    spent: 200,
    period: "monthly",
    icon: "💡",
    date: new Date("2025-02-01"),
  },
  {
    id: "8",
    category: "Vacation",
    allocated: 2000,
    spent: 500,
    period: "yearly",
    icon: "✈️",
    date: new Date("2025-01-01"),
  },
];

export const reportData = {
  expenseSummary: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Essential",
        data: [1200, 1300, 1400, 1500, 1600, 1700],
        backgroundColor: "#3B82F6",
      },
      {
        label: "Non-Essential",
        data: [800, 900, 1000, 1100, 1200, 1300],
        backgroundColor: "#10B981",
      },
    ],
  },
  incomeVsExpenses: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Income",
        data: [3000, 4000, 3500, 4200, 3800, 4500],
        borderColor: "#10B981",
      },
      {
        label: "Expenses",
        data: [2000, 2500, 3000, 2800, 3200, 3000],
        borderColor: "#EF4444",
      },
    ],
  },
  financialHealth: {
    netWorth: 45000,
    debtToIncomeRatio: 0.25,
    savingsRate: 0.15,
    creditScore: 720,
  },
  spendingByCategory: {
    labels: ["Housing", "Food", "Transport", "Entertainment", "Health"],
    datasets: [
      {
        label: "Expenses",
        data: [1200, 500, 300, 400, 200],
        backgroundColor: "#F59E0B",
      },
    ],
  },
  custom: {
    labels: [],
    datasets: [],
  },
};
