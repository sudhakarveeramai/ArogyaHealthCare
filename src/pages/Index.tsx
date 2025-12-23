import { motion } from "framer-motion";
import BalanceCard from "@/components/BalanceCard";
import QuickActions from "@/components/QuickActions";
import TransactionItem, { Transaction } from "@/components/TransactionItem";
import BottomNav from "@/components/BottomNav";
import { ChevronRight, Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockTransactions: Transaction[] = [
  { id: "1", name: "Salary", category: "salary", amount: 75000, type: "income", date: "2024-12-22" },
  { id: "2", name: "Grocery Shopping", category: "grocery", amount: 2500, type: "expense", date: "2024-12-21" },
  { id: "3", name: "Netflix Subscription", category: "entertainment", amount: 649, type: "expense", date: "2024-12-20" },
  { id: "4", name: "Electricity Bill", category: "bills", amount: 1800, type: "expense", date: "2024-12-19" },
  { id: "5", name: "Medicine", category: "health", amount: 450, type: "expense", date: "2024-12-18" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground text-sm"
            >
              Good Morning
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-bold"
            >
              John Doe
            </motion.h1>
          </div>
          <div className="flex items-center gap-2">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="p-2.5 bg-card rounded-xl shadow-soft"
            >
              <Search className="w-5 h-5 text-muted-foreground" />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="p-2.5 bg-card rounded-xl shadow-soft relative"
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
            </motion.button>
          </div>
        </div>
      </header>

      <main className="px-4 space-y-6">
        {/* Balance Card */}
        <BalanceCard balance={125000} income={75000} expense={12500} />

        {/* Quick Actions */}
        <section>
          <QuickActions />
        </section>

        {/* Recent Transactions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <button 
              onClick={() => navigate("/transactions")}
              className="flex items-center gap-1 text-sm text-primary font-medium"
            >
              See All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {mockTransactions.slice(0, 4).map((transaction, index) => (
              <TransactionItem 
                key={transaction.id} 
                transaction={transaction} 
                index={index} 
              />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
