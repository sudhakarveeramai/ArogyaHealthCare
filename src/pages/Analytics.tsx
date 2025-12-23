import { motion } from "framer-motion";
import ExpensePieChart from "@/components/ExpensePieChart";
import BottomNav from "@/components/BottomNav";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

const pieData = [
  { name: "Home", value: 25000, color: "#3B82F6" },
  { name: "Bills", value: 8500, color: "#F97316" },
  { name: "Entertainment", value: 3200, color: "#EC4899" },
  { name: "Grocery", value: 6500, color: "#22C55E" },
  { name: "Health", value: 2500, color: "#EF4444" },
  { name: "Others", value: 4300, color: "#6B7280" },
];

const monthlyData = [
  { month: "Jul", income: 70000, expense: 45000 },
  { month: "Aug", income: 72000, expense: 48000 },
  { month: "Sep", income: 75000, expense: 52000 },
  { month: "Oct", income: 73000, expense: 47000 },
  { month: "Nov", income: 80000, expense: 55000 },
  { month: "Dec", income: 95000, expense: 50000 },
];

const Analytics = () => {
  const totalIncome = monthlyData.reduce((sum, m) => sum + m.income, 0);
  const totalExpense = monthlyData.reduce((sum, m) => sum + m.expense, 0);
  const savings = totalIncome - totalExpense;

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
          Analytics
        </motion.h1>
      </header>

      <main className="px-4 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-xl p-4 shadow-soft"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Income</span>
            </div>
            <p className="text-xl font-bold">{formatCurrency(totalIncome)}</p>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3" /> +12% this month
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-xl p-4 shadow-soft"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-destructive" />
              </div>
              <span className="text-sm text-muted-foreground">Expense</span>
            </div>
            <p className="text-xl font-bold">{formatCurrency(totalExpense)}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3 rotate-90" /> -5% this month
            </p>
          </motion.div>
        </div>

        {/* Savings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="gradient-primary rounded-xl p-4 text-primary-foreground"
        >
          <p className="text-sm opacity-80">Total Savings (6 months)</p>
          <p className="text-2xl font-bold">{formatCurrency(savings)}</p>
        </motion.div>

        {/* Monthly Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 shadow-soft"
        >
          <h3 className="text-lg font-semibold mb-4">Monthly Overview</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barGap={4}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis hide />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "0.75rem",
                  }}
                />
                <Bar dataKey="income" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-sm text-muted-foreground">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-sm text-muted-foreground">Expense</span>
            </div>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <ExpensePieChart data={pieData} />
      </main>

      <BottomNav />
    </div>
  );
};

export default Analytics;
