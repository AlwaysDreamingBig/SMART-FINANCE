export type User = {
  $id: string;
  email: string;
  userId: string;
  firstName: string;
  lastName: string;
  name: string;
  addresse: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  connectionStatus: "online" | "away" | "offline" | "out-of-office";
};

export type NavItem = {
  label: string;
  to: string;
};

export interface NavbarProps {
  navItems: NavItem[];
  brandName: string;
  sessionId: string;
  userId: string;
}

export interface NetWorthData {
  month: string;
  netWorth: number;
}

export interface CashFlowData {
  month: string;
  income: number;
  expenses: number;
}

export type FinanceData = {
  current: {
    totalBalance: number;
    totalIncome: number;
    totalExpenses: number;
    savingsRate: number;
    netWorth: number;
  };
  previous: {
    totalBalance: number;
    totalIncome: number;
    totalExpenses: number;
    savingsRate: number;
    netWorth: number;
  };
};

export interface SmBudget {
  category: string;
  spent: number;
  limit: number;
}

export type BudgetPeriod = "weekly" | "monthly" | "yearly";

export interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  period: BudgetPeriod;
  icon: string;
  date: Date;
}

export interface HistoryEntry {
  date: Date;
  amount: number;
  type: "allocation" | "spending" | "adjustment" | "deletion";
  category: string;
  period: BudgetPeriod;
  description?: string;
}

export interface BudgetHistoryProps {
  period: BudgetPeriod;
  history: HistoryEntry[];
}

export interface BudgetQuickActionsProps {
  budgets: {
    id: string;
    allocated: number;
    spent: number;
    period: "weekly" | "monthly" | "yearly";
  }[];
  setBudgets: (budgets: any) => void;
  totalAllocated: number;
  totalSpent: number;
  selectedPeriod: "weekly" | "monthly" | "yearly";
}

export type BudgetCategory = {
  name: string;
  budget: number;
  spent: number;
};

export interface Payment {
  id: string;
  payee: string;
  amount: number;
  dueDate: string;
  status: "paid" | "upcoming" | "overdue";
  type: "bill" | "subscription" | "transfer";
  recurrence: "none" | "weekly" | "monthly" | "yearly";
  attachments: { file: string; name: string }[];
  reminderDays: number;
  paymentMethodId?: string;
  endDate?: string;
}
