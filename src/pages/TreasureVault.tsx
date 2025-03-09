
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Coins, Map, Sparkles, Scroll, BarChart3, Clock, Landmark, TrendingUp, Droplets } from "lucide-react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Content } from "@/components/ui/content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TreasureChest from "@/components/treasury/TreasureChest";
import TabNavigation from "@/components/treasury/TabNavigation";
import TabContentRenderer from "@/components/treasury/TabContentRenderer";
import OnChainActions from "@/components/treasury/OnChainActions";
import TradingAgents from "@/components/treasury/TradingAgents";
import LiquidityAgents from "@/components/treasury/LiquidityAgents";
import DirectoryOfAgents from "@/components/treasury/DirectoryOfAgents";

const TreasureVault = () => {
  const [activeTab, setActiveTab] = useState("collection");
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("overview");
  
  // Parse the URL query parameter to set the active tab
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab && ["overview", "onchain", "trading", "liquidity"].includes(tab)) {
      setCurrentTab(tab);
    } else {
      setCurrentTab("overview");
    }
  }, [location.search]);
  
  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    const params = new URLSearchParams(location.search);
    params.set("tab", value);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const tabs = [
    { id: "collection", name: "Asset Collection", icon: Coins },
    { id: "journey", name: "Token Journeys", icon: Map },
    { id: "allocation", name: "Treasury Maps", icon: Scroll },
    { id: "forecast", name: "Financial Forecast", icon: BarChart3 },
    { id: "schedules", name: "Payment Schedules", icon: Clock },
    { id: "onchain", name: "On-Chain Actions", icon: Landmark },
    { id: "trading", name: "Trading Agents", icon: TrendingUp },
    { id: "liquidity", name: "Liquidity Agents", icon: Droplets },
  ];

  return (
    <DashboardLayout>
      <Content title="Organization Finances" subtitle="Manage your magical treasures and watch your wealth grow through enchanted stewardship">
        <Tabs value={currentTab} defaultValue="overview" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="w-full max-w-md mb-6 bg-white/70 backdrop-blur-sm border border-studio-sand/20 rounded-xl p-1 shadow-sm">
            <TabsTrigger 
              value="overview" 
              className="flex-1 py-2.5 rounded-lg data-[state=active]:bg-studio-accent data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="onchain" 
              className="flex-1 py-2.5 rounded-lg data-[state=active]:bg-studio-accent data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              On-Chain Actions
            </TabsTrigger>
            <TabsTrigger 
              value="trading" 
              className="flex-1 py-2.5 rounded-lg data-[state=active]:bg-studio-accent data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              Trading Agents
            </TabsTrigger>
            <TabsTrigger 
              value="liquidity" 
              className="flex-1 py-2.5 rounded-lg data-[state=active]:bg-studio-accent data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              Liquidity Agents
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <TreasureChest />
            
            <TabNavigation 
              tabs={tabs} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
            />

            <TabContentRenderer activeTab={activeTab} />
            
            {/* Directory of Agents moved to bottom of overview page */}
            <div className="mt-6">
              <DirectoryOfAgents />
            </div>
          </TabsContent>
          
          <TabsContent value="onchain" className="space-y-6">
            <OnChainActions />
          </TabsContent>
          
          <TabsContent value="trading" className="space-y-6">
            <TradingAgents />
          </TabsContent>
          
          <TabsContent value="liquidity" className="space-y-6">
            <LiquidityAgents />
          </TabsContent>
        </Tabs>
      </Content>
    </DashboardLayout>
  );
};

export default TreasureVault;
