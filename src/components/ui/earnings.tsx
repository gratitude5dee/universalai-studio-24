
import React from "react";
import { motion } from "framer-motion";
import { BarChart3, ArrowUpRight, DollarSign } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface EarningsProps {
  data: { name: string; value: number }[];
  total: number;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  period?: string;
}

const Earnings: React.FC<EarningsProps> = ({
  data,
  total,
  trend,
  trendValue,
  period = "This month",
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
      transition={{ duration: 0.5 }}
      className="glass-card p-6 h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-medium">Earnings</h3>
            <span className="text-xs bg-studio-highlight px-2 py-0.5 rounded-full">
              {period}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold">${total.toLocaleString()}</p>
            <span className={`flex items-center text-sm ${getTrendColor()}`}>
              {trend === "up" ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : trend === "down" ? (
                <ArrowUpRight className="h-3 w-3 mr-1 rotate-180" />
              ) : null}
              {trendValue}
            </span>
          </div>
        </div>
        <div className="bg-studio-accent/10 p-2 rounded-xl">
          <DollarSign className="h-5 w-5 text-studio-accent" />
        </div>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D98F64" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#D98F64" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#8A8A8A" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#8A8A8A" }}
              dx={-10}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-2 border border-gray-100 shadow-md rounded-md">
                      <p className="text-sm font-medium">{`$${payload[0].value}`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#D98F64"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#earningsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default Earnings;
