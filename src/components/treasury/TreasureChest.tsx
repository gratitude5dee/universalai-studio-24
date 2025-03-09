
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import TreasuryOverview from "./TreasuryOverview";
import SavingsGoals from "./SavingsGoals";

interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  color: string;
}

const savingsGoals: SavingsGoal[] = [
  {
    id: "castle",
    name: "Wizard's Castle",
    target: 50000,
    current: 42500,
    deadline: "June 30, 2023",
    color: "#8B5CF6",
  },
  {
    id: "wand",
    name: "Mythical Wand",
    target: 2000,
    current: 1200,
    deadline: "August 15, 2023",
    color: "#F59E0B",
  },
];

const TreasureChest: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [goals, setGoals] = useState(savingsGoals);

  const totalBalance = 67890.42;
  const todayChange = 1243.78;
  const percentageChange = 1.86;

  const handleAddToGoal = (goalId: string) => {
    setGoals(currentGoals => 
      currentGoals.map(goal => {
        if (goal.id === goalId) {
          const newAmount = goal.current + 500;
          const isComplete = newAmount >= goal.target;
          
          // Celebrate if the goal is reached
          if (isComplete && goal.current < goal.target) {
            toast("Magical Achievement Unlocked!", {
              description: `You've completed your "${goal.name}" savings goal!`,
              icon: <Sparkles className="h-5 w-5 text-yellow-400" />,
            });
            
            // Trigger confetti
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
            
            // Play a celebratory sound
            const audio = new Audio("/achievement.mp3");
            audio.volume = 0.3;
            audio.play().catch(() => {
              console.log("Audio playback failed");
            });
          }
          
          return {
            ...goal,
            current: newAmount
          };
        }
        return goal;
      })
    );
  };

  return (
    <motion.div 
      className="glass-card relative overflow-hidden"
      animate={{ height: isOpen ? "auto" : "180px" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center">
          <div className="bg-studio-highlight p-3 rounded-2xl mr-4">
            <Briefcase className="h-8 w-8 text-studio-accent" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Organization Finances</h2>
            <p className="text-muted-foreground">Your enchanted wealth grows stronger</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          onClick={() => setIsOpen(!isOpen)}
          className="text-studio-accent"
        >
          {isOpen ? "Close Chest" : "Open Chest"}
        </Button>
      </div>
      
      <TreasuryOverview 
        totalBalance={totalBalance}
        todayChange={todayChange}
        percentageChange={percentageChange}
      />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 pb-6"
          >
            <SavingsGoals 
              goals={goals} 
              onAddToGoal={handleAddToGoal} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative sparkles */}
      <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-30">
        <Sparkles className="h-6 w-6 text-yellow-500" />
      </div>
    </motion.div>
  );
};

export default TreasureChest;
