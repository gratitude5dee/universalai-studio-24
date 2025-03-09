
import { Treasure } from "./types";

export const treasures: Treasure[] = [
  {
    id: "eth",
    name: "Ethereal Gold",
    type: "coin",
    value: 3245.67,
    description: "The foundational magic that powers the realm",
    color: "#FDA92D",
    lore: "Mined from the Ethereal Mountains by ancient wizards, this magical gold holds the essence of creation itself.",
    supply: "Limited",
    growth: 12.4,
  },
  {
    id: "sol",
    name: "Solar Crystal",
    type: "gem",
    value: 142.35,
    description: "Fast-traveling light energy from the sun realms",
    color: "#14F195",
    lore: "Captured sunlight crystallized by the Solar Mages, these gems can transfer magical energy at incredible speeds.",
    supply: "Renewable",
    growth: 8.2,
  },
  {
    id: "avax",
    name: "Avalanche Ruby",
    type: "gem",
    value: 35.75,
    description: "Powerful red gems with rapid consensus magic",
    color: "#E84142",
    lore: "Formed in the heart of magical avalanches, these rubies can make decisions in an instant when properly aligned.",
    supply: "Moderate",
    growth: -2.3,
  },
  {
    id: "link",
    name: "Oracle's Eye",
    type: "artifact",
    value: 18.64,
    description: "Ancient artifact that connects magical realms",
    color: "#2A5ADA",
    lore: "Crafted by the Oracle Seers, these artifacts allow communication between different magical systems and prophecies.",
    supply: "Scarce",
    growth: 5.7,
  },
];
