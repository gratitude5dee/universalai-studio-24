
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Coins, Map, Sparkles, Scroll, BarChart3, Clock, Landmark, TrendingUp, Droplets, Wallet, Home, Bank, AreaChart, Activity } from "lucide-react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Content } from "@/components/ui/content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import TreasureChest from "@/components/treasury/TreasureChest";
import TabNavigation from "@/components/treasury/TabNavigation";
import TabContentRenderer from "@/components/treasury/TabContentRenderer";
import OnChainActions from "@/components/treasury/OnChainActions";
import TradingAgents from "@/components/treasury/TradingAgents";
import LiquidityAgents from "@/components/treasury/LiquidityAgents";
import DirectoryOfAgents from "@/components/treasury/DirectoryOfAgents";
import AgentBanking from "@/components/treasury/AgentBanking";

const TreasureVault = () => {
  const [activeTab, setActiveTab] = useState("collection");
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("overview");
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab && ["overview", "onchain", "trading", "liquidity", "banking"].includes(tab)) {
      setCurrentTab(tab);
    } else {
      setCurrentTab("overview");
    }
  }, [location.search]);
  
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
          <TooltipProvider>
            <TabsList className="w-full max-w-[480px] mb-6 bg-white/80 backdrop-blur-md border border-studio-sand/30 rounded-xl p-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=')] before:opacity-30 flex justify-center items-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger 
                    value="overview" 
                    className="w-10 h-10 p-0 rounded-lg hover:bg-white/30 data-[state=active]:bg-studio-accent data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:backdrop-blur-md transition-all duration-300 z-10 relative flex items-center justify-center"
                  >
                    <Home size={18} />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Overview</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger 
                    value="banking" 
                    className="w-10 h-10 p-0 rounded-lg hover:bg-white/30 data-[state=active]:bg-studio-accent data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:backdrop-blur-md transition-all duration-300 z-10 relative flex items-center justify-center"
                  >
                    <Bank size={18} />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Agent Banking</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger 
                    value="onchain" 
                    className="w-10 h-10 p-0 rounded-lg hover:bg-white/30 data-[state=active]:bg-studio-accent data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:backdrop-blur-md transition-all duration-300 z-10 relative flex items-center justify-center"
                  >
                    <Landmark size={18} />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>On-Chain Actions</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger 
                    value="trading" 
                    className="w-10 h-10 p-0 rounded-lg hover:bg-white/30 data-[state=active]:bg-studio-accent data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:backdrop-blur-md transition-all duration-300 z-10 relative flex items-center justify-center"
                  >
                    <AreaChart size={18} />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Trading Agents</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger 
                    value="liquidity" 
                    className="w-10 h-10 p-0 rounded-lg hover:bg-white/30 data-[state=active]:bg-studio-accent data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:backdrop-blur-md transition-all duration-300 z-10 relative flex items-center justify-center"
                  >
                    <Droplets size={18} />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Liquidity Agents</p>
                </TooltipContent>
              </Tooltip>
            </TabsList>
          </TooltipProvider>
          
          <TabsContent value="overview" className="space-y-6">
            <TabNavigation 
              tabs={tabs} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
            />
            
            <TreasureChest />
            
            <TabContentRenderer activeTab={activeTab} />
            
            <div className="mt-6">
              <DirectoryOfAgents />
            </div>
          </TabsContent>
          
          <TabsContent value="banking" className="space-y-6">
            <AgentBanking />
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
