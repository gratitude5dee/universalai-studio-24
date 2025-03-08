
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CoinIcon, Plus, Info, ArrowRight, Gem, Crown, Scroll } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect } from "react";

interface Treasure {
  id: string;
  name: string;
  type: "coin" | "gem" | "artifact";
  value: number;
  description: string;
  color: string;
  lore: string;
  supply: string;
  growth: number;
}

const treasures: Treasure[] = [
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

const TreasureCollection = () => {
  const [selectedTreasure, setSelectedTreasure] = useState<Treasure | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCoinClick = (treasure: Treasure) => {
    if (selectedTreasure?.id === treasure.id) {
      // Play sound effect
      const audio = new Audio("/coin-clink.mp3");
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Handle any errors (e.g., if the audio isn't loaded yet)
        console.log("Audio playback failed");
      });
      
      // Show a playful message
      toast("The treasure recognizes your touch!", {
        description: "It shimmers with magical energy.",
        icon: <Sparkles className="h-4 w-4 text-yellow-400" />,
      });
    }
    setSelectedTreasure(treasure);
    setShowDetails(true);
  };

  // Simulate the sound of coins occasionally
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && treasures.length > 0) {
        const randomTreasure = treasures[Math.floor(Math.random() * treasures.length)];
        const audio = new Audio("/coin-clink.mp3");
        audio.volume = 0.1;
        audio.play().catch(() => {
          console.log("Audio playback failed");
        });
        
        toast(`${randomTreasure.name} shifted in your vault!`, {
          description: "Your treasures are alive with magic.",
          duration: 2000,
        });
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Treasure Collection */}
      <div className="lg:col-span-2 glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Gem className="w-5 h-5 mr-2 text-studio-accent" />
            Your Magical Treasures
          </h2>
          <Button variant="outline" size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> Add Treasure
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {treasures.map((treasure) => (
            <motion.div
              key={treasure.id}
              className="bg-white rounded-xl p-4 cursor-pointer border border-studio-sand/30 hover:shadow-md transition-all"
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCoinClick(treasure)}
              style={{ 
                background: `linear-gradient(135deg, white 0%, ${treasure.color}20 100%)`,
                borderLeft: `4px solid ${treasure.color}`
              }}
            >
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${treasure.color}30` }}
                    >
                      {treasure.type === "coin" && <CoinIcon className="w-5 h-5" style={{ color: treasure.color }} />}
                      {treasure.type === "gem" && <Gem className="w-5 h-5" style={{ color: treasure.color }} />}
                      {treasure.type === "artifact" && <Scroll className="w-5 h-5" style={{ color: treasure.color }} />}
                    </div>
                    <div>
                      <h3 className="font-medium">{treasure.name}</h3>
                      <p className="text-xs text-muted-foreground">{treasure.description}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${treasure.value.toLocaleString()}</p>
                  <p className={`text-xs ${treasure.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {treasure.growth >= 0 ? '↑' : '↓'} {Math.abs(treasure.growth)}%
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Treasure Details */}
      <div className="glass-card p-6 relative overflow-hidden">
        {selectedTreasure ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Treasure Details</h2>
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${selectedTreasure.color}30` }}
              >
                {selectedTreasure.type === "coin" && <CoinIcon className="w-5 h-5" style={{ color: selectedTreasure.color }} />}
                {selectedTreasure.type === "gem" && <Gem className="w-5 h-5" style={{ color: selectedTreasure.color }} />}
                {selectedTreasure.type === "artifact" && <Crown className="w-5 h-5" style={{ color: selectedTreasure.color }} />}
              </div>
            </div>
            
            <div 
              className="rounded-xl p-4 mb-4"
              style={{ background: `linear-gradient(135deg, white 0%, ${selectedTreasure.color}20 100%)` }}
            >
              <h3 className="text-2xl font-bold">{selectedTreasure.name}</h3>
              <p className="text-muted-foreground">{selectedTreasure.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Current Value</p>
                  <p className="font-bold">${selectedTreasure.value.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Growth</p>
                  <p className={`font-bold ${selectedTreasure.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {selectedTreasure.growth >= 0 ? '+' : ''}{selectedTreasure.growth}%
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-bold capitalize">{selectedTreasure.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Supply</p>
                  <p className="font-bold">{selectedTreasure.supply}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-studio-sand/10 rounded-xl p-4 mb-4">
              <div className="flex items-start">
                <Info className="w-4 h-4 mt-1 mr-2 text-studio-accent" />
                <div>
                  <h4 className="font-medium">Magical Lore</h4>
                  <p className="text-sm text-muted-foreground">{selectedTreasure.lore}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
              <div className="flex gap-2">
                <Button variant="outline" className="w-full" size="sm">
                  Transfer <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <Button className="w-full" size="sm">
                  Add More
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <Gem className="h-12 w-12 text-studio-sand mb-4" />
            <h3 className="text-xl font-medium mb-2">Select a Treasure</h3>
            <p className="text-muted-foreground text-sm">
              Click on any treasure to view its magical properties and lore
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreasureCollection;
