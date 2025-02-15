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
