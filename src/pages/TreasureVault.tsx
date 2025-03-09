
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
          <TabsList className="w-full max-w-[calc(28rem+5px)] mb-6 bg-white/80 backdrop-blur-md border border-studio-sand/30 rounded-xl p-1 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=')] before:opacity-30">
            <TabsTrigger 
              value="overview" 
              className="flex-1 py-2.5 rounded-lg hover:bg-white/30 data-[state=active]:bg-studio-accent data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:backdrop-blur-md transition-all duration-300 z-10 relative"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="onchain" 
              className="flex-1 py-2.5 rounded-lg hover:bg-white/30 data-[state=active]:bg-studio-accent data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:backdrop-blur-md transition-all duration-300 z-10 relative"
            >
              On-Chain Actions
            </TabsTrigger>
            <TabsTrigger 
              value="trading" 
              className="flex-1 py-2.5 rounded-lg hover:bg-white/30 data-[state=active]:bg-studio-accent data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:backdrop-blur-md transition-all duration-300 z-10 relative"
            >
              Trading Agents
            </TabsTrigger>
            <TabsTrigger 
              value="liquidity" 
              className="flex-1 py-2.5 rounded-lg hover:bg-white/30 data-[state=active]:bg-studio-accent data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:backdrop-blur-md transition-all duration-300 z-10 relative"
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
