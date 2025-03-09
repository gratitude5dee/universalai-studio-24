
import { Agent } from "@/components/marketplace/types";

// Mock data for Near agents
export const nearAgents: Agent[] = [
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
