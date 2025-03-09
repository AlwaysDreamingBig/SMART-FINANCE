import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Filter, Search, Settings2 } from "lucide-react";
import { DateRangePicker } from "../headers/DateRangePicker";

interface FiltersProps {
  openFilters: boolean;
  setOpenFilters: (isOpen: boolean) => void;
  categories: string[];
}

export function Filters({
  openFilters,
  setOpenFilters,
  categories,
}: FiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex w-full flex-wrap items-center gap-4 md:flex-nowrap">
        {/* Search Input */}
        <div className="relative min-w-[200px] flex-1 md:w-64">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input placeholder="Search transactions..." className="w-full pl-8" />
        </div>

        {/* Date Picker & Buttons in the Same Row */}
        <div className="flex w-full justify-between space-x-2 md:max-w-[600px]">
          <DateRangePicker className="w-full md:w-auto" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="size-4" />
                <span className="ml-2 hidden md:inline">Category</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {categories.map((category) => (
                <DropdownMenuCheckboxItem key={category}>
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            className="w-full md:w-auto"
            onClick={() => setOpenFilters(!openFilters)}
          >
            <Settings2 className="size-4" />
            <span className="ml-2 hidden md:inline">Advanced Filters</span>
          </Button>
        </div>
      </div>

      {openFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-3"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">Transaction Type</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  Select Type
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuCheckboxItem>Income</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Expense</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>
      )}
    </div>
  );
}
