import React, { useState } from "react";
import { motion } from "framer-motion";
import { Coins, Map, Sparkles, Scroll, Gem, Wallet, BarChart3, Clock, DollarSign, PiggyBank, Landmark, TrendingUp, Droplets } from "lucide-react";
import DashboardLayout from "@/layouts/dashboard-layout";
import TreasureCollection from "@/components/treasury/TreasureCollection";
import TreasureJourney from "@/components/treasury/TreasureJourney";
import TreasureMap from "@/components/treasury/TreasureMap";
import CrystalBall from "@/components/treasury/CrystalBall";
import TreasureChest from "@/components/treasury/TreasureChest";
import { Content } from "@/components/ui/content";
import { StatsCard } from "@/components/ui/stats-card";
import { Earnings } from "@/components/ui/earnings";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TreasureVault = () => {
  const [activeTab, setActiveTab] = useState("collection");

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

  const earningsData = [
    { name: "Jan", value: 2400 },
    { name: "Feb", value: 1398 },
    { name: "Mar", value: 9800 },
    { name: "Apr", value: 3908 },
    { name: "May", value: 4800 },
    { name: "Jun", value: 3800 },
    { name: "Jul", value: 4300 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "collection":
        return <TreasureCollection />;
      case "journey":
        return <TreasureJourney />;
      case "allocation":
        return <TreasureMap />;
      case "forecast":
        return <CrystalBall />;
      case "schedules":
        return <PaymentSchedules />;
      case "onchain":
        return <OnChainActions />;
      case "trading":
        return <TradingAgents />;
      case "liquidity":
        return <LiquidityAgents />;
      default:
        return <TreasureCollection />;
    }
  };

  return (
    <DashboardLayout>
      <Content title="Organization Finances" subtitle="Manage your magical treasures and watch your wealth grow through enchanted stewardship">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full max-w-md mb-6">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="onchain" className="flex-1">On-Chain Actions</TabsTrigger>
            <TabsTrigger value="trading" className="flex-1">Trading Agents</TabsTrigger>
            <TabsTrigger value="liquidity" className="flex-1">Liquidity Agents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Treasury"
                value="$67,890.42"
                description="Across all chains"
                icon={Wallet}
                trend="up"
                trendValue="12.3%"
                delay={0}
              />
              <StatsCard
                title="Monthly Royalties"
                value="$5,432.21"
                description="From 6 collections"
                icon={PiggyBank}
                trend="up"
                trendValue="8.7%"
                delay={1}
              />
              <StatsCard
                title="Project Budget"
                value="$12,500.00"
                description="75% allocated"
                icon={Scroll}
                trend="neutral"
                trendValue="0%"
                delay={2}
              />
              <StatsCard
                title="Next Payment"
                value="$3,450.00"
                description="Due in 3 days"
                icon={Clock}
                trend="down"
                trendValue="2.1%"
                delay={3}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Earnings
                  data={earningsData}
                  total={30606}
                  trend="up"
                  trendValue="+24.5%"
                  period="Last 6 months"
                />
              </div>
              <div className="lg:col-span-1 flex flex-col space-y-4">
                <div className="glass-card p-5">
                  <h3 className="font-medium text-lg flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-studio-accent" />
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button size="sm" variant="outline" className="justify-start">
                      <Wallet className="mr-2 h-4 w-4" />
                      Send Payment
                    </Button>
                    <Button size="sm" variant="outline" className="justify-start">
                      <Coins className="mr-2 h-4 w-4" />
                      Convert Tokens
                    </Button>
                    <Button size="sm" variant="outline" className="justify-start">
                      <PiggyBank className="mr-2 h-4 w-4" />
                      Create Budget
                    </Button>
                    <Button size="sm" variant="outline" className="justify-start">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Reports
                    </Button>
                  </div>
                </div>

                <div className="glass-card p-5 flex-1">
                  <h3 className="font-medium text-lg flex items-center">
                    <Gem className="w-5 h-5 mr-2 text-studio-accent" />
                    Treasury Health
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Runway</span>
                        <span className="font-medium text-green-600">8.5 months</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "70%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Budget Adherence</span>
                        <span className="font-medium text-yellow-600">92%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: "92%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Revenue Diversification</span>
                        <span className="font-medium text-blue-600">75%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "75%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <TreasureChest />

            <div className="flex overflow-x-auto pb-2 -mx-1">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 mx-1 rounded-full transition-all ${
                    activeTab === tab.id
                      ? "bg-studio-accent text-white"
                      : "bg-white/80 hover:bg-white"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  <span>{tab.name}</span>
                  {activeTab === tab.id && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-2 bg-white/20 rounded-full p-1"
                    >
                      <Sparkles className="w-3 h-3" />
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
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

const PaymentSchedules = () => {
  const upcomingPayments = [
    {
      id: "pay1",
      name: "Artist Royalties",
      amount: 3450,
      due: "July 15, 2023",
      status: "pending",
      recipient: "Creative Collective",
      chain: "Ethereum",
    },
    {
      id: "pay2",
      name: "Collaborator Fee",
      amount: 1200,
      due: "July 18, 2023",
      status: "pending",
      recipient: "Spell Weaver Studios",
      chain: "Polygon",
    },
    {
      id: "pay3",
      name: "Platform Subscription",
      amount: 99,
      due: "July 22, 2023",
      status: "scheduled",
      recipient: "Magical Canvas Pro",
      chain: "Ethereum",
    },
    {
      id: "pay4",
      name: "Domain Renewal",
      amount: 120,
      due: "August 5, 2023",
      status: "scheduled",
      recipient: "Realm Registry",
      chain: "Solana",
    },
  ];

  const completedPayments = [
    {
      id: "payd1",
      name: "Software License",
      amount: 850,
      date: "June 28, 2023",
      recipient: "Arcane Tools Inc.",
      chain: "Ethereum",
    },
    {
      id: "payd2",
      name: "Contract Deployment",
      amount: 120,
      date: "June 15, 2023",
      recipient: "Chain Wizards",
      chain: "Polygon",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Clock className="w-5 h-5 mr-2 text-studio-accent" />
            Upcoming Payments
          </h2>
          <Button variant="outline" size="sm">
            Schedule New Payment
          </Button>
        </div>

        <div className="space-y-4">
          {upcomingPayments.map((payment) => (
            <motion.div
              key={payment.id}
              className="bg-white rounded-xl p-4 hover:shadow-md transition-all border border-studio-sand/30"
              whileHover={{ y: -3 }}
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{payment.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    To: {payment.recipient} via {payment.chain}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${payment.amount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Due: {payment.due}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    payment.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {payment.status === "pending" ? "Pending" : "Scheduled"}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 px-2">
                    Edit
                  </Button>
                  <Button size="sm" className="h-8 px-2">
                    Pay Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <Scroll className="w-5 h-5 mr-2 text-studio-accent" />
          Payment History
        </h2>

        <div className="space-y-4">
          {completedPayments.map((payment) => (
            <div
              key={payment.id}
              className="bg-white/50 rounded-xl p-3 border border-studio-sand/20"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-sm">{payment.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    To: {payment.recipient}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">${payment.amount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{payment.date}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  Completed
                </span>
                <span className="text-xs ml-2 text-muted-foreground">
                  via {payment.chain}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button variant="outline" className="w-full justify-center" size="sm">
            View All Payment History
          </Button>
        </div>

        <div className="mt-6 bg-studio-highlight p-4 rounded-xl">
          <h3 className="font-medium mb-2 flex items-center">
            <PiggyBank className="w-4 h-4 mr-2 text-studio-accent" />
            Automated Payments
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            Schedule recurring payments to your most frequent recipients
          </p>
          <Button size="sm" className="w-full">
            Set Up Automation
          </Button>
        </div>
      </div>
    </div>
  );
};

const OnChainActions = () => {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Landmark className="w-5 h-5 mr-2 text-studio-accent" />
          On-Chain Transaction Center
        </h2>
        <p className="text-muted-foreground mb-4">
          Execute and monitor blockchain transactions with magical ease
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white/80 rounded-xl p-5 border border-studio-sand/20">
            <h3 className="font-medium mb-3">Recent Transactions</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-studio-highlight w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <Coins className="w-4 h-4 text-studio-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Token Transfer</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">0.5 ETH</p>
                    <p className="text-xs text-green-600">Completed</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              View All Transactions
            </Button>
          </div>
          
          <div className="bg-white/80 rounded-xl p-5 border border-studio-sand/20">
            <h3 className="font-medium mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" className="justify-start">
                <Wallet className="mr-2 h-4 w-4" />
                Send Tokens
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Coins className="mr-2 h-4 w-4" />
                Swap Tokens
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Landmark className="mr-2 h-4 w-4" />
                Stake Assets
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Map className="mr-2 h-4 w-4" />
                Bridge Assets
              </Button>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-3">Connected Chains</h3>
              <div className="flex space-x-2">
                <div className="bg-studio-highlight px-3 py-1 rounded-full text-xs">
                  Ethereum
                </div>
                <div className="bg-studio-highlight px-3 py-1 rounded-full text-xs">
                  Polygon
                </div>
                <div className="bg-studio-highlight px-3 py-1 rounded-full text-xs">
                  Solana
                </div>
                <div className="bg-white px-3 py-1 rounded-full text-xs border border-dashed border-studio-sand">
                  + Add
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TradingAgents = () => {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-studio-accent" />
          AI Trading Agents
        </h2>
        <p className="text-muted-foreground mb-4">
          Intelligent agents that execute trades on your behalf based on magical algorithms
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {[
            {
              name: "Market Sentinel",
              description: "Monitors market conditions and identifies optimal trading opportunities",
              status: "Active",
              performance: "+12.4%",
              risk: "Medium"
            },
            {
              name: "Momentum Mage",
              description: "Captures trending market movements with algorithmic precision",
              status: "Paused",
              performance: "+8.7%",
              risk: "High"
            },
            {
              name: "Value Oracle",
              description: "Identifies undervalued assets based on fundamental analysis",
              status: "Active",
              performance: "+5.2%",
              risk: "Low"
            }
          ].map((agent) => (
            <div key={agent.name} className="bg-white/80 rounded-xl p-5 border border-studio-sand/20 flex flex-col">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{agent.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  agent.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {agent.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{agent.description}</p>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Performance</p>
                  <p className="text-sm font-medium text-green-600">{agent.performance}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Risk Level</p>
                  <p className="text-sm font-medium">{agent.risk}</p>
                </div>
              </div>
              
              <div className="mt-auto pt-4 flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">Configure</Button>
                <Button size="sm" className="flex-1">{agent.status === "Active" ? "Pause" : "Activate"}</Button>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="mt-6">
          Create New Trading Agent
        </Button>
      </div>
    </div>
  );
};

const LiquidityAgents = () => {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Droplets className="w-5 h-5 mr-2 text-studio-accent" />
          Liquidity Management
        </h2>
        <p className="text-muted-foreground mb-4">
          Optimize your liquidity positions across multiple pools and platforms
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white/80 rounded-xl p-5 border border-studio-sand/20">
            <h3 className="font-medium mb-4">Active Liquidity Positions</h3>
            
            <div className="space-y-4">
              {[
                { pair: "ETH/USDC", platform: "Uniswap V3", value: "$12,500", apr: "8.4%" },
                { pair: "wBTC/ETH", platform: "Curve", value: "$8,750", apr: "7.2%" },
                { pair: "SOL/USDC", platform: "Raydium", value: "$5,300", apr: "9.5%" }
              ].map((position) => (
                <div key={position.pair} className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{position.pair}</p>
                      <p className="text-xs text-muted-foreground">{position.platform}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{position.value}</p>
                      <p className="text-xs text-green-600">{position.apr} APR</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              Add New Position
            </Button>
          </div>
          
          <div className="bg-white/80 rounded-xl p-5 border border-studio-sand/20">
            <h3 className="font-medium mb-4">Liquidity Automation</h3>
            
            <div className="space-y-4">
              {[
                { 
                  name: "Range Wizard",
                  description: "Automatically adjusts liquidity ranges based on market volatility",
                  status: "Active" 
                },
                { 
                  name: "Yield Optimizer",
                  description: "Moves liquidity to highest yielding pools",
                  status: "Paused" 
                }
              ].map((agent) => (
                <div key={agent.name} className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.description}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      agent.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-3">Risk Management</h3>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Impermanent Loss Protection</span>
                  <span className="font-medium text-yellow-600">Medium</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: "60%" }} />
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Adjust Risk Parameters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreasureVault;
