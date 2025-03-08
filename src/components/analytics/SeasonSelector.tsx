
import React from "react";
import { motion } from "framer-motion";
import { Leaf, Sprout, Sun, Snail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const seasonalThemes = [
  { name: "Spring", description: "Growth & New Beginnings", icon: Sprout, color: "#8BC34A" },
  { name: "Summer", description: "Flourishing & Abundance", icon: Sun, color: "#FF9800" },
  { name: "Autumn", description: "Harvesting & Reflection", icon: Leaf, color: "#795548" },
  { name: "Winter", description: "Rest & Planning", icon: Snail, color: "#03A9F4" },
];

interface SeasonSelectorProps {
  currentSeason: string;
  setCurrentSeason: (season: string) => void;
}

const SeasonSelector = ({ currentSeason, setCurrentSeason }: SeasonSelectorProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6"
    >
      <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
        <Leaf className="h-5 w-5 text-studio-accent" />
        Garden Season
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {seasonalThemes.map((season) => {
          const SeasonIcon = season.icon;
          const isActive = currentSeason === season.name;
          
          return (
            <Button
              key={season.name}
              variant={isActive ? "default" : "outline"}
              className={cn("h-auto py-3 px-4 justify-start gap-3", 
                isActive && "bg-opacity-20 border-2",
                isActive && `border-[${season.color}] bg-[${season.color}]`
              )}
              style={{
                borderColor: isActive ? season.color : "",
                backgroundColor: isActive ? `${season.color}20` : ""
              }}
              onClick={() => setCurrentSeason(season.name)}
            >
              <div className="rounded-full p-1.5" style={{ backgroundColor: `${season.color}30` }}>
                <SeasonIcon className="h-5 w-5" style={{ color: season.color }} />
              </div>
              <div className="text-left">
                <div className="font-medium">{season.name}</div>
                <div className="text-xs text-muted-foreground">{season.description}</div>
              </div>
            </Button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SeasonSelector;
