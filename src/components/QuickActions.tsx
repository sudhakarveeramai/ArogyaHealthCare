import { motion } from "framer-motion";
import { Plus, ArrowUpRight, ArrowDownLeft, QrCode } from "lucide-react";

const actions = [
  { icon: Plus, label: "Add", color: "gradient-primary" },
  { icon: ArrowUpRight, label: "Send", color: "bg-accent" },
  { icon: ArrowDownLeft, label: "Request", color: "bg-success" },
  { icon: QrCode, label: "Scan", color: "bg-secondary" },
];

const QuickActions = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-2"
        >
          <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center shadow-soft ${
            action.color === "gradient-primary" ? "text-primary-foreground" : 
            action.color === "bg-secondary" ? "text-foreground" : "text-primary-foreground"
          }`}>
            <action.icon className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActions;
