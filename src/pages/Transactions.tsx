import { motion } from "framer-motion";
import TransactionItem, { Transaction } from "@/components/TransactionItem";
import BottomNav from "@/components/BottomNav";
import { Search, Filter, Plus } from "lucide-react";
import { useState } from "react";

const mockTransactions: Transaction[] = [
  { id: "1", name: "Salary", category: "salary", amount: 75000, type: "income", date: "2024-12-22" },
  { id: "2", name: "Grocery Shopping", category: "grocery", amount: 2500, type: "expense", date: "2024-12-21" },
  { id: "3", name: "Netflix Subscription", category: "entertainment", amount: 649, type: "expense", date: "2024-12-20" },
  { id: "4", name: "Electricity Bill", category: "bills", amount: 1800, type: "expense", date: "2024-12-19" },
  { id: "5", name: "Medicine", category: "health", amount: 450, type: "expense", date: "2024-12-18" },
  { id: "6", name: "Restaurant", category: "snacks", amount: 1200, type: "expense", date: "2024-12-17" },
  { id: "7", name: "Freelance Work", category: "salary", amount: 15000, type: "income", date: "2024-12-16" },
  { id: "8", name: "House Rent", category: "home", amount: 25000, type: "expense", date: "2024-12-15" },
  { id: "9", name: "Gift from Dad", category: "gift", amount: 5000, type: "income", date: "2024-12-14" },
  { id: "10", name: "Gym Membership", category: "health", amount: 2000, type: "expense", date: "2024-12-13" },
];

type FilterType = "all" | "income" | "expense";

const Transactions = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = mockTransactions.filter((t) => {
    const matchesFilter = filter === "all" || t.type === filter;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg px-4 py-4">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-4"
        >
          Transactions
        </motion.h1>

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative mb-4"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card rounded-xl border-0 focus:ring-2 focus:ring-primary/50 outline-none shadow-soft"
          />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2"
        >
          {(["all", "income", "expense"] as FilterType[]).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === type
                  ? "gradient-primary text-primary-foreground"
                  : "bg-card text-muted-foreground"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </motion.div>
      </header>

      <main className="px-4">
        <div className="space-y-3">
          {filteredTransactions.map((transaction, index) => (
            <TransactionItem 
              key={transaction.id} 
              transaction={transaction} 
              index={index} 
            />
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        )}
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

export default Transactions;
