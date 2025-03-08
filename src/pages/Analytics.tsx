
import React from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  BarChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Users, DollarSign, Eye } from "lucide-react";
import DashboardLayout from "@/layouts/dashboard-layout";
import StatsCard from "@/components/ui/stats-card";

const monthlyData = [
  { name: "Jan", views: 4000, followers: 2400, earnings: 2400 },
  { name: "Feb", views: 3000, followers: 1398, earnings: 2210 },
  { name: "Mar", views: 2000, followers: 9800, earnings: 2290 },
  { name: "Apr", views: 2780, followers: 3908, earnings: 2000 },
  { name: "May", views: 1890, followers: 4800, earnings: 2181 },
  { name: "Jun", views: 2390, followers: 3800, earnings: 2500 },
  { name: "Jul", views: 3490, followers: 4300, earnings: 2100 },
];

const categoryData = [
  { name: "Landscape", value: 40 },
  { name: "Portrait", value: 25 },
  { name: "Urban", value: 20 },
  { name: "Nature", value: 15 },
];

const COLORS = ["#D98F64", "#36454F", "#D2B48C", "#E8DCCA"];

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">Analytics</h1>
          <p className="text-muted-foreground">Track your performance and growth</p>
        </div>
        
        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatsCard 
            title="Total Views" 
            value="124.8K" 
            icon={Eye}
            trend="up"
            trendValue="18%"
            delay={0}
          />
          <StatsCard 
            title="Followers Growth" 
            value="2.4K" 
            icon={Users}
            trend="up"
            trendValue="12%"
            delay={1}
          />
          <StatsCard 
            title="Monthly Earnings" 
            value="$3,540" 
            icon={DollarSign}
            trend="up"
            trendValue="8%"
            delay={2}
          />
          <StatsCard 
            title="Performance" 
            value="92%" 
            icon={TrendingUp}
            trend="up"
            trendValue="4%"
            delay={3}
          />
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <h2 className="text-xl font-medium mb-4">Growth Overview</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D98F64" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#D98F64" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#36454F" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#36454F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#8A8A8A" }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#8A8A8A" }}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: "8px", 
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      border: "none"
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#D98F64" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorViews)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="followers" 
                    stroke="#36454F" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorFollowers)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6"
          >
            <h2 className="text-xl font-medium mb-4">Content Categories</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, "Percentage"]}
                    contentStyle={{ 
                      borderRadius: "8px", 
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      border: "none"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
        
        {/* Earnings Breakdown */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-medium mb-4">Earnings Breakdown</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#8A8A8A" }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#8A8A8A" }}
                />
                <Tooltip
                  formatter={(value) => [`$${value}`, "Earnings"]}
                  contentStyle={{ 
                    borderRadius: "8px", 
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "none"
                  }}
                />
                <Bar 
                  dataKey="earnings" 
                  fill="#D98F64" 
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
