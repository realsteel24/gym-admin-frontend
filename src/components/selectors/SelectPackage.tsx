import React from "react";
import { Label } from "@/components/ui/label";
import { FeeOptions } from "@/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectFeeCategoryProps {
  feeCategoryId: string;
  setFeeCategoryId: (feeCategoryId: string) => void;
  setSelectedAmount: (amount: number) => void;
  setDueDate: (dueDate: Date) => void;
  paidDate: Date;
  feeCategories: FeeOptions[];
  feeCategoryLoading: Boolean;
}

const SelectPackage: React.FC<SelectFeeCategoryProps> = ({
  feeCategoryId,
  setFeeCategoryId,
  setSelectedAmount,
  setDueDate,
  paidDate,
  feeCategories,
  feeCategoryLoading,
}) => {
  const handleSelectionChange = (value: string) => {
    setFeeCategoryId(value);
    const selectedCategory = feeCategories.find((item) => item.id === value);
    if (selectedCategory) {
      setSelectedAmount(parseInt(selectedCategory.amount));
      setDueDate(calculateDueDate(paidDate, selectedCategory.frequency));
    }
  };

  const calculateDueDate = (startDate: Date, frequency: string): Date => {
    const frequencies = {
      admission: 0,
      monthly: 1,
      quarterly: 3,
      halfYearly: 6,
      yearly: 12,
    };
    const monthsToAdd =
      frequencies[frequency.toLowerCase() as keyof typeof frequencies] || 240;
    return addMonths(startDate, monthsToAdd);
  };

  return (
    <div className="grid grid-cols-4 items-center gap-4 py-2">
      <Label htmlFor="feeCategory" className="text-right">
        Fee Category
      </Label>
      <Select onValueChange={handleSelectionChange}>
        <SelectTrigger className="col-span-3" id={feeCategoryId}>
          <SelectValue placeholder="Choose Package" />
        </SelectTrigger>
        <SelectContent>
          {feeCategoryLoading ? (
            <div>Loading...</div>
          ) : feeCategories.length === 0 ? (
            <div className="text-sm opacity-80 p-1">No options available</div>
          ) : (
            feeCategories.map((fee: FeeOptions) => (
              <SelectItem key={fee.id} value={fee.id}>
                {fee.description} - {fee.frequency}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectPackage;

function addMonths(startDate: Date, monthsToAdd: number): Date {
  const date = new Date(startDate);
  date.setMonth(date.getMonth() + monthsToAdd);
  return date;
}
