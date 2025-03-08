import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  trend,
  icon,
  className,
}: StatCardProps) {
  const isPositive = trend >= 0;
  const TrendIcon = isPositive ? ArrowUp : ArrowDown;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={cn(
        "relative overflow-hidden rounded-xl border bg-background p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
          <div className="flex items-center gap-1 text-sm">
            <TrendIcon
              className={`size-4 ${isPositive ? "text-green-500" : "text-red-500"}`}
            />
            <span className={isPositive ? "text-green-500" : "text-red-500"}>
              {Math.abs(trend).toFixed(1)}%
            </span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </div>
        <div className="rounded-lg bg-accent p-2">{icon}</div>
      </div>
      {/* Animated trend line */}
      <motion.div
        className={`absolute bottom-0 left-0 h-1 ${isPositive ? "bg-green-500" : "bg-red-500"}`}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(Math.abs(trend), 100)}%` }}
        transition={{ duration: 0.8 }}
      />
    </motion.div>
  );
}
