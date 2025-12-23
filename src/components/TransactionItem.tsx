import { motion } from "framer-motion";
import { 
  Home, 
  Receipt, 
  Film, 
  ShoppingCart, 
  Cookie, 
  HeartPulse, 
  MoreHorizontal,
  Briefcase,
  Gift,
  Wallet
} from "lucide-react";

export interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  bills: Receipt,
  entertainment: Film,
  grocery: ShoppingCart,
  snacks: Cookie,
  health: HeartPulse,
  salary: Briefcase,
  gift: Gift,
  investment: Wallet,
  others: MoreHorizontal,
};

const categoryColors: Record<string, string> = {
  home: "bg-blue-500/10 text-blue-500",
  bills: "bg-orange-500/10 text-orange-500",
  entertainment: "bg-pink-500/10 text-pink-500",
  grocery: "bg-green-500/10 text-green-500",
  snacks: "bg-yellow-500/10 text-yellow-500",
  health: "bg-red-500/10 text-red-500",
  salary: "bg-emerald-500/10 text-emerald-500",
  gift: "bg-purple-500/10 text-purple-500",
  investment: "bg-teal-500/10 text-teal-500",
  others: "bg-gray-500/10 text-gray-500",
};

interface TransactionItemProps {
  transaction: Transaction;
  index: number;
}

const TransactionItem = ({ transaction, index }: TransactionItemProps) => {
  const Icon = categoryIcons[transaction.category.toLowerCase()] || MoreHorizontal;
  const colorClass = categoryColors[transaction.category.toLowerCase()] || categoryColors.others;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { 
      day: "numeric", 
      month: "short" 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-soft"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{transaction.name}</p>
        <p className="text-sm text-muted-foreground capitalize">
          {transaction.category} • {formatDate(transaction.date)}
        </p>
      </div>

      <p className={`font-semibold ${
        transaction.type === "income" ? "text-success" : "text-destructive"
      }`}>
        {transaction.type === "income" ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </p>
    </motion.div>
  );
};

export default TransactionItem;
