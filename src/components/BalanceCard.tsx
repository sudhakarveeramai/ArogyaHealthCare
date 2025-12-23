import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface BalanceCardProps {
  balance: number;
  income: number;
  expense: number;
}

const BalanceCard = ({ balance, income, expense }: BalanceCardProps) => {
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="gradient-primary rounded-2xl p-6 text-primary-foreground shadow-glow"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm opacity-90">Total Balance</span>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="p-1 hover:bg-primary-foreground/10 rounded-lg transition-colors"
        >
          {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
        </button>
      </div>

      <motion.h2
        className="text-3xl font-bold mb-6"
        animate={{ opacity: showBalance ? 1 : 0.3 }}
      >
        {showBalance ? formatCurrency(balance) : "••••••"}
      </motion.h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs opacity-80">Income</p>
            <p className="font-semibold">{formatCurrency(income)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs opacity-80">Expense</p>
            <p className="font-semibold">{formatCurrency(expense)}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceCard;
