import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { 
  User, 
  Wallet, 
  Target, 
  Shield, 
  Globe, 
  Share2, 
  Star, 
  MessageSquare,
  Award,
  MessageCircle,
  ChevronRight,
  LogOut
} from "lucide-react";

const menuItems = [
  { icon: Wallet, label: "Total Balance", value: "₹1,25,000", color: "text-primary" },
  { icon: Target, label: "Financial Goals", value: "3 Active", color: "text-accent" },
];

const settingsItems = [
  { icon: Shield, label: "Safety & Privacy", hasArrow: true },
  { icon: Globe, label: "Language", value: "English", hasArrow: true },
  { icon: Share2, label: "Share with Friends", hasArrow: true },
  { icon: Star, label: "Rate Us", hasArrow: true },
  { icon: MessageSquare, label: "Feedback", hasArrow: true },
];

const Account = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg px-4 py-4">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold"
        >
          Account
        </motion.h1>
      </header>

      <main className="px-4 space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 shadow-soft"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
              JD
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              <p className="text-sm text-muted-foreground">john.doe@email.com</p>
            </div>
          </div>
        </motion.div>

        {/* Streak Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="gradient-accent rounded-xl p-4 flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-accent-foreground/20 rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6 text-accent-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-accent-foreground/80">Streak Points</p>
            <p className="text-2xl font-bold text-accent-foreground">1,250</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-accent-foreground/80">Current Streak</p>
            <p className="text-lg font-bold text-accent-foreground">🔥 15 days</p>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-card rounded-xl p-4 shadow-soft flex items-center gap-4"
            >
              <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="flex-1 font-medium">{item.label}</span>
              <span className="text-muted-foreground">{item.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Settings */}
        <section>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Settings</h3>
          <div className="bg-card rounded-xl shadow-soft overflow-hidden">
            {settingsItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors border-b border-border last:border-0"
              >
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.value && <span className="text-sm text-muted-foreground">{item.value}</span>}
                {item.hasArrow && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
              </motion.button>
            ))}
          </div>
        </section>

        {/* WhatsApp Connect */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full bg-success/10 border border-success/20 rounded-xl p-4 flex items-center gap-4"
        >
          <div className="w-10 h-10 bg-success rounded-xl flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-success-foreground" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium">Connect WhatsApp</p>
            <p className="text-sm text-muted-foreground">Get expense updates on WhatsApp</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </motion.button>

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full flex items-center justify-center gap-2 py-4 text-destructive font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </motion.button>
      </main>

      <BottomNav />
    </div>
  );
};

export default Account;
