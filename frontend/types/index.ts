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

export interface CalendarPayment {
  payee: string;
  amount: number;
  type: "bill" | "subscription" | "transfer";
  dueDate: string;
}

export interface CalendarDay {
  date: Date;
  payments: CalendarPayment[];
}

export interface PaymentCalendarProps {
  days: CalendarDay[];
}

export interface PaymentMethod {
  id: string;
  last4: string;
  brand: string;
  exp: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

export interface Notifications {
  id: string;
  type: "alert" | "info" | "success" | "transaction";
  category: "budget" | "investment" | "bill" | "security" | "transaction";
  message: string;
  date: Date;
  read: boolean;
  link: string;
  priority: "high" | "medium" | "low";
}

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  status: "completed" | "pending" | "failed";
  tags: string[];
  recurring?: {
    frequency:
      | "daily"
      | "weekly"
      | "monthly"
      | "quarterly"
      | "yearly"
      | "one-time";

    endDate?: Date;
  };

  notes?: string;
}

export interface BaseChartData {
  month: string;
  Trend: number;
}
