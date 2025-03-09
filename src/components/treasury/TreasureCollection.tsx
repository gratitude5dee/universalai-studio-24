
import React, { useState, useEffect } from "react";
import { Plus, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import TreasureItem from "./TreasureItem";
import TreasureDetails from "./TreasureDetails";
import { treasures } from "./TreasureData";
import { Treasure } from "./types";

const TreasureCollection = () => {
  const [selectedTreasure, setSelectedTreasure] = useState<Treasure | null>(null);

  const handleTreasureClick = (treasure: Treasure) => {
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
            <TreasureItem 
              key={treasure.id} 
              treasure={treasure} 
              onClick={handleTreasureClick}
              isSelected={selectedTreasure?.id === treasure.id}
            />
          ))}
        </div>
      </div>

      {/* Treasure Details */}
      <div className="glass-card p-6 relative overflow-hidden">
        <TreasureDetails selectedTreasure={selectedTreasure} />
      </div>
    </div>
  );
};

export default TreasureCollection;
