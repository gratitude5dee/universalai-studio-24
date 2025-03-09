
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  delay?: number;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  delay = 0,
  className = "",
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      default:
        return "text-studio-charcoal/50";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay * 0.1,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`glass-card p-5 h-full ${className}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </h3>
          <div className="flex items-baseline">
            <p className="text-2xl md:text-3xl font-semibold">{value}</p>
            {trend && trendValue && (
              <span className={`ml-2 text-xs ${getTrendColor()}`}>
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {Icon && (
          <div className="bg-studio-accent/10 p-2 rounded-xl">
            <Icon className="h-5 w-5 text-studio-accent" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;
