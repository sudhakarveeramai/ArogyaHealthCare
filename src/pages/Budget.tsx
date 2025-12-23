import { motion } from "framer-motion";
import BudgetProgress, { BudgetCategory } from "@/components/BudgetProgress";
import BottomNav from "@/components/BottomNav";
import { Plus, TrendingUp } from "lucide-react";

const mockBudgets: BudgetCategory[] = [
  { id: "1", name: "Home", limit: 30000, spent: 25000, color: "#3B82F6" },
  { id: "2", name: "Bills", limit: 10000, spent: 8500, color: "#F97316" },
  { id: "3", name: "Entertainment", limit: 5000, spent: 3200, color: "#EC4899" },
  { id: "4", name: "Grocery", limit: 8000, spent: 6500, color: "#22C55E" },
  { id: "5", name: "Snacks", limit: 3000, spent: 3500, color: "#EAB308" },
  { id: "6", name: "Health", limit: 5000, spent: 2500, color: "#EF4444" },
];

const Budget = () => {
  const totalBudget = mockBudgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = mockBudgets.reduce((sum, b) => sum + b.spent, 0);
  const remainingPercent = ((totalBudget - totalSpent) / totalBudget * 100).toFixed(0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg px-4 py-4">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold"
        >
          Budget
        </motion.h1>
      </header>

      <main className="px-4 space-y-6">
        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 shadow-soft"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Monthly Budget</p>
              <p className="text-2xl font-bold">{formatCurrency(totalBudget)}</p>
            </div>
            <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center text-primary-foreground">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground">Spent</p>
              <p className="font-semibold text-destructive">{formatCurrency(totalSpent)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Remaining</p>
              <p className="font-semibold text-success">{formatCurrency(totalBudget - totalSpent)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Available</p>
              <p className="font-semibold">{remainingPercent}%</p>
            </div>
          </div>
        </motion.div>

        {/* Budget Categories */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <div className="space-y-3">
            {mockBudgets.map((budget, index) => (
              <BudgetProgress key={budget.id} category={budget} index={index} />
            ))}
          </div>
        </section>
      </main>

      {/* Floating Add Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-4 w-14 h-14 gradient-primary rounded-full shadow-glow flex items-center justify-center text-primary-foreground"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      <BottomNav />
    </div>
  );
};

export default Budget;
