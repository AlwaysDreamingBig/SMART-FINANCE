import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  interface CurrencySelectorProps {
    value: string;
    onChange: (value: string) => void;
  }
  
  export function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USD">USD ($)</SelectItem>
          <SelectItem value="EUR">EUR (€)</SelectItem>
          <SelectItem value="GBP">GBP (£)</SelectItem>
          <SelectItem value="JPY">JPY (¥)</SelectItem>
        </SelectContent>
      </Select>
    );
  }