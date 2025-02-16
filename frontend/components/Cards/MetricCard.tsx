import { ReactNode } from "react";
import { Card } from "../ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  color: "blue" | "green" | "red";
}

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
  },
  green: {
    bg: "bg-green-50",
    icon: "text-green-600",
  },
  red: {
    bg: "bg-red-50",
    icon: "text-red-600",
  },
};

export const MetricCard = ({ title, value, icon, color }: MetricCardProps) => {
  return (
    <Card className={`p-6 ${colorClasses[color].bg}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>
        <div className={`text-3xl ${colorClasses[color].icon}`}>{icon}</div>
      </div>
    </Card>
  );
};
