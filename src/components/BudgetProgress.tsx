import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

export interface BudgetCategory {
  id: string;
  name: string;
  limit: number;
  spent: number;
  color: string;
}

interface BudgetProgressProps {
  category: BudgetCategory;
  index: number;
}

const BudgetProgress = ({ category, index }: BudgetProgressProps) => {
  const percentage = Math.min((category.spent / category.limit) * 100, 100);
  const remaining = category.limit - category.spent;
  const isOverBudget = remaining < 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-card rounded-xl p-4 shadow-soft"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: category.color }}
          />
          <span className="font-medium">{category.name}</span>
        </div>
        <span className={`text-sm font-medium ${
          isOverBudget ? "text-destructive" : "text-muted-foreground"
        }`}>
          {isOverBudget ? "Over by " : ""}{formatCurrency(remaining)}
          {!isOverBudget && " left"}
        </span>
      </div>

      <Progress 
        value={percentage} 
        className="h-2"
        style={{ 
          "--progress-color": isOverBudget ? "hsl(var(--destructive))" : category.color 
        } as React.CSSProperties}
      />

      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
        <span>Spent: {formatCurrency(category.spent)}</span>
        <span>Limit: {formatCurrency(category.limit)}</span>
      </div>
    </motion.div>
  );
};

export default BudgetProgress;
