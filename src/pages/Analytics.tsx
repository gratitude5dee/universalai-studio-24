
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flower } from "lucide-react";
import DashboardLayout from "@/layouts/dashboard-layout";
import SeasonSelector from "@/components/analytics/SeasonSelector";
import GardenOverviewStats from "@/components/analytics/GardenOverviewStats";
import GrowthCyclesChart from "@/components/analytics/GrowthCyclesChart";
import GardenVarietyPieChart from "@/components/analytics/GardenVarietyPieChart";
import AchievementGarden from "@/components/analytics/AchievementGarden";
import AchievementSpotlight from "@/components/analytics/AchievementSpotlight";

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
        
        {/* Season Selector Component */}
        <SeasonSelector currentSeason={currentSeason} setCurrentSeason={setCurrentSeason} />
        
        {/* Garden Overview Stats Component */}
        <GardenOverviewStats />
        
        {/* Achievement Spotlight Component */}
        <AchievementSpotlight 
          showingAchievement={showingAchievement} 
          setShowingAchievement={setShowingAchievement} 
        />

        {/* Main Garden View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Growth Cycles Chart Component */}
          <GrowthCyclesChart />
          
          {/* Garden Variety Pie Chart Component */}
          <GardenVarietyPieChart />
        </div>
        
        {/* Achievement Garden Component */}
        <AchievementGarden revealAchievement={revealAchievement} />
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
