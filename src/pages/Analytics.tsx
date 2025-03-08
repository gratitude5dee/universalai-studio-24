
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { 
  Flower, 
  Sun, 
  CloudRain, 
  Sprout, 
  Gem, 
  Droplets, 
  Leaf, 
  Clover, 
  Bird, 
  Snail,
  TreeDeciduous,
  Sparkles
} from "lucide-react";
import DashboardLayout from "@/layouts/dashboard-layout";
import StatsCard from "@/components/ui/stats-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const monthlyData = [
  { name: "Jan", growth: 4000, sunshine: 2400, water: 2400 },
  { name: "Feb", growth: 3000, sunshine: 1398, water: 2210 },
  { name: "Mar", growth: 2000, sunshine: 9800, water: 2290 },
  { name: "Apr", growth: 2780, sunshine: 3908, water: 2000 },
  { name: "May", growth: 1890, sunshine: 4800, water: 2181 },
  { name: "Jun", growth: 2390, sunshine: 3800, water: 2500 },
  { name: "Jul", growth: 3490, sunshine: 4300, water: 2100 },
];

const agentTypes = [
  { name: "Storytellers", value: 40, icon: TreeDeciduous, color: "#8BC34A" },
  { name: "Performers", value: 25, icon: Flower, color: "#FF9800" },
  { name: "Creators", value: 20, icon: Sprout, color: "#03A9F4" },
  { name: "Guides", value: 15, icon: Leaf, color: "#E91E63" },
];

const COLORS = ["#8BC34A", "#FF9800", "#03A9F4", "#E91E63"];

const seasonalThemes = [
  { name: "Spring", description: "Growth & New Beginnings", icon: Sprout, color: "#8BC34A" },
  { name: "Summer", description: "Flourishing & Abundance", icon: Sun, color: "#FF9800" },
  { name: "Autumn", description: "Harvesting & Reflection", icon: Leaf, color: "#795548" },
  { name: "Winter", description: "Rest & Planning", icon: Snail, color: "#03A9F4" },
];

const achievements = [
  { id: 1, name: "First Bloom", description: "Agent reached 100 interactions", icon: Flower, color: "#FF9800" },
  { id: 2, name: "Garden Guardian", description: "5 consecutive days of growth", icon: Droplets, color: "#03A9F4" },
  { id: 3, name: "Lucky Clover", description: "Exceptional performance spike", icon: Clover, color: "#8BC34A" },
  { id: 4, name: "Butterfly Effect", description: "Created viral content", icon: Bird, color: "#E91E63" },
  { id: 5, name: "Hidden Gem", description: "Discovered underutilized potential", icon: Gem, color: "#673AB7" },
];

const Analytics = () => {
  const [currentSeason, setCurrentSeason] = useState("Summer");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showingAchievement, setShowingAchievement] = useState(null);

  const revealAchievement = (achievement) => {
    setShowingAchievement(achievement);
    setTimeout(() => {
      setShowingAchievement(null);
    }, 3500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 mb-10">
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-studio-accent/20 p-2 rounded-full">
              <Flower className="h-6 w-6 text-studio-accent" />
            </div>
            <h1 className="text-2xl font-semibold">Your Garden Analytics</h1>
          </div>
          <p className="text-muted-foreground mt-2">Watch your garden grow and thrive with each interaction</p>
        </div>
        
        {/* Season Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
            <Leaf className="h-5 w-5 text-studio-accent" />
            Garden Season
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {seasonalThemes.map((season) => {
              const SeasonIcon = season.icon;
              const isActive = currentSeason === season.name;
              
              return (
                <Button
                  key={season.name}
                  variant={isActive ? "default" : "outline"}
                  className={cn("h-auto py-3 px-4 justify-start gap-3", 
                    isActive && "bg-opacity-20 border-2",
                    isActive && `border-[${season.color}] bg-[${season.color}]`
                  )}
                  style={{
                    borderColor: isActive ? season.color : "",
                    backgroundColor: isActive ? `${season.color}20` : ""
                  }}
                  onClick={() => setCurrentSeason(season.name)}
                >
                  <div className="rounded-full p-1.5" style={{ backgroundColor: `${season.color}30` }}>
                    <SeasonIcon className="h-5 w-5" style={{ color: season.color }} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{season.name}</div>
                    <div className="text-xs text-muted-foreground">{season.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </motion.div>
        
        {/* Garden Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatsCard 
            title="Total Growth" 
            value="124.8K" 
            icon={Sprout}
            trend="up"
            trendValue="18%"
            delay={0}
          />
          <StatsCard 
            title="Sunshine Hours" 
            value="856" 
            icon={Sun}
            trend="up"
            trendValue="12%"
            delay={1}
          />
          <StatsCard 
            title="Water Supply" 
            value="643L" 
            icon={Droplets}
            trend="up"
            trendValue="8%"
            delay={2}
          />
          <StatsCard 
            title="Garden Health" 
            value="92%" 
            icon={Clover}
            trend="up"
            trendValue="4%"
            delay={3}
          />
        </div>
        
        {/* Achievement Spotlight */}
        {showingAchievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowingAchievement(null)}
          >
            <div className="glass-card p-8 max-w-md text-center relative overflow-hidden">
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute -top-6 -right-6"
              >
                <Sparkles className="h-24 w-24 text-yellow-400/50" />
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-4 mx-auto bg-[#FFDCA1] p-4 rounded-full w-20 h-20 flex items-center justify-center"
              >
                <showingAchievement.icon className="h-10 w-10 text-[#FF9800]" />
              </motion.div>
              
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold mb-2"
              >
                {showingAchievement.name}
              </motion.h3>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-muted-foreground mb-4"
              >
                {showingAchievement.description}
              </motion.p>
              
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="px-4 py-2 rounded-full bg-studio-accent text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowingAchievement(null);
                }}
              >
                Continue Growing
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Main Garden View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Leaf className="h-5 w-5 text-studio-accent" />
              Growth Cycles
            </h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8BC34A" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8BC34A" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSunshine" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF9800" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FF9800" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#03A9F4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#03A9F4" stopOpacity={0} />
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
                    dataKey="growth" 
                    stroke="#8BC34A" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorGrowth)" 
                    name="Growth"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sunshine" 
                    stroke="#FF9800" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorSunshine)" 
                    name="Sunshine"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="water" 
                    stroke="#03A9F4" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorWater)" 
                    name="Water"
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
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Flower className="h-5 w-5 text-studio-accent" />
              Garden Variety
            </h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={agentTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {agentTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, "Proportion"]}
                    contentStyle={{ 
                      borderRadius: "8px", 
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      border: "none"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {agentTypes.map((type, index) => {
                const TypeIcon = type.icon;
                return (
                  <div key={type.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                    <TypeIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{type.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
        
        {/* Achievements Garden */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
            <Gem className="h-5 w-5 text-studio-accent" />
            Achievement Garden
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {achievements.map((achievement) => {
              const AchievementIcon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  className="bg-white rounded-2xl p-5 text-center cursor-pointer hover:shadow-md transition-all border border-gray-100"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  onClick={() => revealAchievement(achievement)}
                >
                  <div 
                    className="rounded-full mx-auto mb-3 w-12 h-12 flex items-center justify-center"
                    style={{ backgroundColor: `${achievement.color}20` }}
                  >
                    <AchievementIcon className="h-6 w-6" style={{ color: achievement.color }} />
                  </div>
                  <h3 className="font-medium text-sm mb-1">{achievement.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{achievement.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;

