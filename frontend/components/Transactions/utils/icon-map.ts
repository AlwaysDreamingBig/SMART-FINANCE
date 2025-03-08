import {
  FaArrowDown,
  FaArrowUp,
  FaCreditCard,
  FaDollarSign,
  FaExchangeAlt,
  FaFilm, // Icon for entertainment
  FaHeartbeat, // Icon for health
  FaUtensils, // Icon for food
} from "react-icons/fa";

export const IconMap = {
  deposit: FaArrowDown, // Icon for deposit (money coming in)
  withdrawal: FaArrowUp, // Icon for withdrawal (money going out)
  transfer: FaExchangeAlt, // Icon for transfer (moving money between accounts)
  payment: FaCreditCard, // Icon for a payment transaction
  balance: FaDollarSign, // Icon for checking balance
  food: FaUtensils, // Icon for food expenses
  health: FaHeartbeat, // Icon for health-related expenses
  entertainment: FaFilm, // Icon for entertainment expenses
  other: FaDollarSign, // Default icon for any other category
};

// Type for the keys of the IconMap
export type IconType = keyof typeof IconMap;
