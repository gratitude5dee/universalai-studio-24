
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chest, TrendingUp, CoinIcon, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import confetti from "canvas-confetti";

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
            <Chest className="h-8 w-8 text-studio-accent" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Magical Treasury</h2>
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
      
      <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Balance */}
        <div className="bg-white/50 rounded-xl p-4 border border-studio-sand/30">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Total Treasury</p>
              <p className="text-3xl font-bold">${totalBalance.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-lg">
              <CoinIcon className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>${todayChange.toLocaleString()} today</span>
          </div>
        </div>
        
        {/* Performance */}
        <div className="bg-white/50 rounded-xl p-4 border border-studio-sand/30">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Growth Rate</p>
              <p className="text-3xl font-bold text-green-600">+{percentageChange}%</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <span>Performing better than 82% of wizards</span>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white/50 rounded-xl p-4 border border-studio-sand/30">
          <p className="text-sm text-muted-foreground mb-2">Quick Spells</p>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="text-xs h-9">Add Treasure</Button>
            <Button size="sm" variant="outline" className="text-xs h-9">Send Token</Button>
            <Button size="sm" variant="outline" className="text-xs h-9">Set Goal</Button>
            <Button size="sm" variant="outline" className="text-xs h-9">View History</Button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 pb-6"
          >
            <div className="bg-studio-sand/10 rounded-xl p-5 border border-studio-sand/30">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-studio-accent" />
                Enchanted Savings Goals
              </h3>
              
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.id} className="bg-white/70 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{goal.name}</h4>
                      <div className="text-sm font-medium">
                        ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <Progress 
                        value={(goal.current / goal.target) * 100} 
                        className="h-2"
                        indicatorClassName={`bg-gradient-to-r from-studio-accent/70 to-${goal.color}`}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {goal.deadline}
                      </span>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs h-7 px-2"
                        onClick={() => handleAddToGoal(goal.id)}
                      >
                        Add Magic (+$500)
                      </Button>
                    </div>
                    
                    {goal.current >= goal.target && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 bg-green-100 p-2 rounded-lg text-xs text-green-800 flex items-center"
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                        Goal achieved! Your magic is strong!
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
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
