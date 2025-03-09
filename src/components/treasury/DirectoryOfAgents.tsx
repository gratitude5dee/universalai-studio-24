
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User, Users } from "lucide-react";
import { Agent } from "@/components/marketplace/types";

// Mock data for Near agents
const nearAgents: Agent[] = [
  {
    id: "n1",
    name: "NEAR Governor",
    description: "Manages governance operations on the NEAR protocol",
    category: "governance",
    price: "Paid",
    rating: "5",
    reviews: "89",
    provider: "NEAR Foundation",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=300&h=200&auto=format",
    tags: ["Governance", "Voting", "Treasury"],
    capabilities: {
      "On-chain Governance": true,
      "Proposal Creation": true,
      "Treasury Management": true,
      "Voting": true,
      "Multi-sig": true
    },
    models: ["Aurora"],
    integration: ["API Access", "SDK Libraries"]
  },
  {
    id: "n2",
    name: "NEAR Oracle",
    description: "Provides reliable off-chain data to NEAR smart contracts",
    category: "oracle",
    price: "Freemium",
    rating: "4",
    reviews: "123",
    provider: "Flux Protocol",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=300&h=200&auto=format",
    tags: ["Oracle", "Data", "Price Feeds"],
    capabilities: {
      "Price Feeds": true,
      "Weather Data": true,
      "Sports Results": true,
      "Random Numbers": true,
      "Cross-chain": true
    },
    models: ["Flux"],
    integration: ["API Access", "Webhook Support"]
  },
  {
    id: "n3",
    name: "NEAR Lender",
    description: "Facilitates lending and borrowing assets on NEAR protocol",
    category: "defi",
    price: "Free",
    rating: "4",
    reviews: "76",
    provider: "Burrow",
    image: "https://images.unsplash.com/photo-1607863680198-23d4b2565a5e?q=80&w=300&h=200&auto=format",
    tags: ["DeFi", "Lending", "Borrowing"],
    capabilities: {
      "Lending": true,
      "Borrowing": true,
      "Collateralization": true,
      "Interest Rates": true,
      "Liquidation": true
    },
    models: ["Burrow"],
    integration: ["API Access", "SDK Libraries"]
  }
];

// Mock data for Autonolas agents
const autonomasAgents: Agent[] = [
  {
    id: "a1",
    name: "Autonolas Scout",
    description: "Monitors and analyzes market opportunities across multiple chains",
    category: "research",
    price: "Paid",
    rating: "5",
    reviews: "142",
    provider: "Autonomous Services",
    image: "https://images.unsplash.com/photo-1679083216051-aa510a1a2c0e?q=80&w=300&h=200&auto=format",
    tags: ["Analysis", "Market", "Multi-chain"],
    capabilities: {
      "Market Analysis": true,
      "Opportunity Detection": true,
      "Risk Assessment": true,
      "Portfolio Optimization": true,
      "Reporting": true
    },
    models: ["Olas"],
    integration: ["API Access", "Webhook Support", "SDK Libraries"]
  },
  {
    id: "a2",
    name: "Autonolas Trader",
    description: "Executes trading strategies autonomously across decentralized exchanges",
    category: "trading",
    price: "Paid",
    rating: "4",
    reviews: "98",
    provider: "Valory",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=300&h=200&auto=format",
    tags: ["Trading", "DEX", "Arbitrage"],
    capabilities: {
      "DEX Trading": true,
      "Arbitrage": true,
      "Market Making": true,
      "Rebalancing": true,
      "MEV Protection": true
    },
    models: ["Valory"],
    integration: ["API Access", "SDK Libraries"]
  },
  {
    id: "a3",
    name: "Autonolas Guardian",
    description: "Provides security monitoring and protection for digital assets",
    category: "security",
    price: "Freemium",
    rating: "5",
    reviews: "65",
    provider: "Autonomous Services",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=300&h=200&auto=format",
    tags: ["Security", "Monitoring", "Protection"],
    capabilities: {
      "Threat Detection": true,
      "Fraud Prevention": true,
      "Asset Protection": true,
      "Alert System": true,
      "Audit": true
    },
    models: ["Olas"],
    integration: ["API Access", "Webhook Support"]
  }
];

const DirectoryOfAgents: React.FC = () => {
  return (
    <div className="glass-card p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Users className="w-5 h-5 mr-2 text-studio-accent" />
        Directory of Agents
      </h2>
      
      <Tabs defaultValue="near" className="w-full">
        <TabsList className="w-full max-w-md mb-6">
          <TabsTrigger value="near" className="flex-1 flex items-center justify-center">
            <User className="w-4 h-4 mr-2" />
            NEAR
          </TabsTrigger>
          <TabsTrigger value="autonolas" className="flex-1 flex items-center justify-center">
            <Users className="w-4 h-4 mr-2" />
            Autonolas
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="near" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nearAgents.map(agent => (
              <AgentDirectoryCard key={agent.id} agent={agent} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="autonolas" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {autonomasAgents.map(agent => (
              <AgentDirectoryCard key={agent.id} agent={agent} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface AgentDirectoryCardProps {
  agent: Agent;
}

const AgentDirectoryCard: React.FC<AgentDirectoryCardProps> = ({ agent }) => {
  return (
    <div className="bg-white/80 rounded-lg border border-studio-sand/30 p-4 hover:shadow-md transition-all">
      <div className="flex items-start gap-3">
        <div 
          className="h-12 w-12 rounded-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${agent.image})` 
          }}
        />
        <div className="flex-1">
          <h3 className="font-medium">{agent.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{agent.description}</p>
          <div className="flex mt-2 gap-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {agent.category}
            </span>
            <span className="text-xs bg-muted px-2 py-0.5 rounded-full flex items-center">
              {agent.price}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <Button variant="link" size="sm" className="text-xs p-0 h-auto">View Details</Button>
      </div>
    </div>
  );
};

export default DirectoryOfAgents;
