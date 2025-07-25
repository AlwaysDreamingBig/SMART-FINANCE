import {
  BaseChartData,
  Budget,
  BudgetCategory,
  FinanceData,
  Notifications,
  SmBudget,
  Transaction,
} from "@/types";

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

export const sampleNotifications: Notifications[] = [
  {
    id: "1",
    type: "alert",
    category: "budget",
    message:
      "Overspending alert: Entertainment category exceeded budget by 25%",
    date: new Date("2024-03-15T14:30:00"),
    read: false,
    link: "/budgets/entertainment",
    priority: "high",
  },
  {
    id: "2",
    type: "transaction",
    category: "security",
    message: "Flagged transaction: $950 charge at ElectronicsWorld NYC",
    date: new Date("2025-02-14T09:15:00"),
    read: true,
    link: "/transactions/12345",
    priority: "high",
  },
  {
    id: "3",
    type: "info",
    category: "bill",
    message: "Reminder: Credit card payment due in 3 days ($420.00 minimum)",
    date: new Date("2025-02-13T16:45:00"),
    read: false,
    link: "/bills",
    priority: "medium",
  },
  {
    id: "4",
    type: "success",
    category: "investment",
    message: "Dividend received: $152.50 from TechGrowth ETF",
    date: new Date("2024-03-12T11:00:00"),
    read: true,
    link: "/investments",
    priority: "low",
  },
  {
    id: "5",
    type: "alert",
    category: "budget",
    message: "Low balance warning: Groceries category has only 10% remaining",
    date: new Date("2024-03-12T08:30:00"),
    read: false,
    link: "/budgets/groceries",
    priority: "medium",
  },
  {
    id: "6",
    type: "info",
    category: "security",
    message: "New device login detected: Chrome on Windows (Chicago, IL)",
    date: new Date("2024-03-11T19:20:00"),
    read: false,
    link: "/security",
    priority: "high",
  },
  {
    id: "7",
    type: "transaction",
    category: "bill",
    message: "Autopay processed: $1,250.00 for ABC Mortgage",
    date: new Date("2024-03-10T06:00:00"),
    read: true,
    link: "/transactions/67890",
    priority: "low",
  },
  {
    id: "8",
    type: "alert",
    category: "investment",
    message: "Portfolio alert: Tech sector exposure exceeds target allocation",
    date: new Date("2024-03-09T15:45:00"),
    read: true,
    link: "/investments/portfolio",
    priority: "medium",
  },
  {
    id: "9",
    type: "success",
    category: "budget",
    message: "Congratulations! You stayed under Dining Out budget this week",
    date: new Date("2024-03-08T12:15:00"),
    read: false,
    link: "/budgets/dining-out",
    priority: "low",
  },
  {
    id: "10",
    type: "info",
    category: "security",
    message: "Security tip: Consider enabling two-factor authentication",
    date: new Date("2024-03-07T10:00:00"),
    read: false,
    link: "/security/settings",
    priority: "medium",
  },
];

export const DEFAULT_TRANSACTION: Transaction = {
  id: "", // Default empty string for id
  date: new Date(), // Default to the current date
  description: "", // Default empty string for description
  category: "", // Default empty string for category
  amount: 0, // Default amount of 0
  type: "income", // Default type set to 'income'
  status: "completed", // Default status set to 'completed'
  tags: [], // Default empty array for tags
  recurring: {
    // Default to an object with 'daily' frequency, you can adjust if needed
    frequency: "daily",
    endDate: undefined, // No end date by default
  },
  notes: "", // Default empty string for notes
};

const sampleTransactions: Transaction[] = [
  {
    id: "1",
    date: new Date("2024-02-15"),
    description: "Groceries",
    category: "Food",
    amount: 120.5,
    type: "expense",
    status: "completed",
    tags: ["groceries", "supermarket"],
    recurring: { frequency: "weekly" },
    notes: "Bought vegetables and fruits",
  },
  {
    id: "2",
    date: new Date("2024-02-20"),
    description: "Gym Membership",
    category: "Health",
    amount: 50,
    type: "expense",
    status: "completed",
    tags: ["fitness", "monthly"],
    recurring: { frequency: "monthly" },
    notes: "Gym subscription renewal",
  },
  {
    id: "3",
    date: new Date("2024-02-22"),
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: 15.99,
    type: "expense",
    status: "completed",
    tags: ["subscription", "movies"],
    recurring: { frequency: "monthly" },
    notes: "Streaming service",
  },
  {
    id: "4",
    date: new Date("2024-02-25"),
    description: "Salary",
    category: "Income",
    amount: 3000,
    type: "income",
    status: "completed",
    tags: ["salary", "monthly"],
  },
  {
    id: "5",
    date: new Date("2024-02-28"),
    description: "Dinner with friends",
    category: "Food",
    amount: 80,
    type: "expense",
    status: "completed",
    tags: ["restaurant", "friends"],
    notes: "Went out for dinner",
  },
  {
    id: "6",
    date: new Date("2024-02-25"),
    description: "Salary",
    category: "Other",
    amount: 300,
    type: "income",
    status: "completed",
    tags: ["salary", "monthly"],
  },
  {
    id: "7",
    date: new Date("2024-02-25"),
    description: "Salary",
    category: "Debt",
    amount: 1000,
    type: "income",
    status: "completed",
    tags: ["salary", "monthly"],
  },
  {
    id: "8",
    date: new Date("2024-02-25"),
    description: "Salary",
    category: "Debt",
    amount: 500,
    type: "income",
    status: "completed",
    tags: ["salary", "monthly"],
  },
];

export default sampleTransactions;

export const sampleTrendData: BaseChartData[] = [
  { month: "January", Trend: 2 },
  { month: "February", Trend: 4.5 },
  { month: "March", Trend: 1 },
  { month: "April", Trend: 7.3 },
  { month: "May", Trend: -2 },
  { month: "June", Trend: 0.6 },
];

export const statusVariants = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
};
