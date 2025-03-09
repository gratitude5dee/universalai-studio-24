
import React from "react";
import { motion } from "framer-motion";
import { Info, ArrowRight, Gem, Crown, Coins, Scroll } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TreasureDetailsProps } from "./types";

const TreasureDetails: React.FC<TreasureDetailsProps> = ({ selectedTreasure }) => {
  if (!selectedTreasure) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-4">
        <Gem className="h-12 w-12 text-studio-sand mb-4" />
        <h3 className="text-xl font-medium mb-2">Select a Treasure</h3>
        <p className="text-muted-foreground text-sm">
          Click on any treasure to view its magical properties and lore
        </p>
      </div>
    );
  }

  return (
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
          {selectedTreasure.type === "coin" && <Coins className="w-5 h-5" style={{ color: selectedTreasure.color }} />}
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
  );
};

export default TreasureDetails;
