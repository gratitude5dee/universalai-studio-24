
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface AchievementSpotlightProps {
  showingAchievement: any;
  setShowingAchievement: (achievement: any) => void;
}

const AchievementSpotlight = ({ showingAchievement, setShowingAchievement }: AchievementSpotlightProps) => {
  if (!showingAchievement) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
      onClick={() => setShowingAchievement(null)}
    >
      <div className="glass-card p-8 max-w-md text-center relative overflow-hidden">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute -top-6 -right-6"
        >
          <Sparkles className="h-24 w-24 text-yellow-400/50" />
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4 mx-auto bg-[#FFDCA1] p-4 rounded-full w-20 h-20 flex items-center justify-center"
        >
          <showingAchievement.icon className="h-10 w-10 text-[#FF9800]" />
        </motion.div>
        
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold mb-2"
        >
          {showingAchievement.name}
        </motion.h3>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground mb-4"
        >
          {showingAchievement.description}
        </motion.p>
        
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="px-4 py-2 rounded-full bg-studio-accent text-white"
          onClick={(e) => {
            e.stopPropagation();
            setShowingAchievement(null);
          }}
        >
          Continue Growing
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AchievementSpotlight;
