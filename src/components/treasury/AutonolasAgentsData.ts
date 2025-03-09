
import { Agent } from "@/components/marketplace/types";

// Mock data for Autonolas agents
export const autonomasAgents: Agent[] = [
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
