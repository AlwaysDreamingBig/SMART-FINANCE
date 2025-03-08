import { cn } from "@/lib/utils";
import { IconMap } from "./icon-map"; // Ensure the path is correct

interface CategoryIconProps {
  category: string;
  className?: string;
}

export function CategoryIcon({ category, className }: CategoryIconProps) {
  const normalizedCategory = category.toLowerCase();

  const Icon =
    IconMap[normalizedCategory as keyof typeof IconMap] ||
    (normalizedCategory === "debt"
      ? IconMap.payment
      : normalizedCategory === "income"
        ? IconMap.deposit
        : IconMap.other);

  return <Icon className={cn("size-5 shrink-0", className)} />;
}
