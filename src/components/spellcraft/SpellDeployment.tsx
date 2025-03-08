
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";
import { CheckCircle2, Circle, Flame, Send, Sparkles, Wand2 } from "lucide-react";

interface SpellDeploymentProps {
  spellData: {
    templateId: string;
    templateName: string;
    name: string;
    description: string;
    ingredients: {
      [key: string]: string;
    };
    conditions: {
      id: string;
      type: string;
      value: string;
    }[];
  };
}

const SpellDeployment: React.FC<SpellDeploymentProps> = ({ spellData }) => {
  const [deploymentStep, setDeploymentStep] = useState(0);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  
  const deploymentSteps = [
    {
      title: "Prepare the Ritual Circle",
      description: "Setting up the deployment environment",
      icon: Circle,
    },
    {
      title: "Gather Essence",
      description: "Compiling contract code and assets",
      icon: Sparkles,
    },
    {
      title: "Inscribe Runes",
      description: "Writing to the blockchain",
      icon: Wand2,
    },
    {
      title: "Ignite the Spell",
      description: "Activating the contract",
      icon: Flame,
    },
    {
      title: "Spell Manifested",
      description: "Contract successfully deployed",
      icon: CheckCircle2,
    },
  ];
  
  const handleDeploy = () => {
    setIsDeploying(true);
    
    // Simulate deployment steps
    const interval = setInterval(() => {
      setDeploymentStep((prev) => {
        if (prev < deploymentSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsDeploying(false);
          setIsDeployed(true);
          
          // Show success toast
          toast({
            title: "Spell Successfully Cast!",
            description: `Your "${spellData.name}" contract has been deployed to the digital realm.`,
            variant: "default",
          });
          
          // Trigger celebratory confetti
          const duration = 5 * 1000;
          const animationEnd = Date.now() + duration;
          const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
          
          function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
          }
          
          const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            
            if (timeLeft <= 0) {
              return clearInterval(interval);
            }
            
            const particleCount = 50 * (timeLeft / duration);
            
            // since particles fall down, start a bit higher than random
            confetti({
              ...defaults,
              particleCount,
              origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
              ...defaults,
              particleCount,
              origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
          }, 250);
          
          return prev;
        }
      });
    }, 1200);
  };
  
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Cast Your Spell</h2>
        <p className="text-studio-clay">
          The magical deployment ritual that brings your contract to life
        </p>
      </div>
      
      <div className="relative py-6">
        {/* Background decorative elements */}
        <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden">
          <motion.div
            className="w-72 h-72 rounded-full border-2 border-studio-accent/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-52 h-52 rounded-full border-2 border-studio-accent/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-32 h-32 rounded-full border-2 border-studio-accent/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        {/* Scroll with spell details */}
        <motion.div 
          className="relative z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0wIDBoNDB2NDBoLTQweiIvPjxwYXRoIGZpbGw9IiNGNUYzRjAiIGQ9Ik0wIDBoMjB2MjBoLTIweiIvPjxwYXRoIGZpbGw9IiNGNUYzRjAiIGQ9Ik0yMCAyMGgyMHYyMGgtMjB6Ii8+PC9nPjwvc3ZnPg==')] bg-studio-cream/80 p-8 rounded-xl shadow-lg max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold font-serif mb-4 text-center border-b border-studio-sand pb-2">
            {spellData.name}
          </h3>
          
          <div className="space-y-4 mb-6">
            <p className="italic text-studio-clay">{spellData.description}</p>
            
            <div>
              <h4 className="font-medium">Creator</h4>
              <p>{spellData.ingredients.creator || "Anonymous"}</p>
            </div>
            
            <div>
              <h4 className="font-medium">Duration</h4>
              <p>{spellData.ingredients.duration || "Perpetual"}</p>
            </div>
            
            <div>
              <h4 className="font-medium">Conditions</h4>
              <ul className="list-disc list-inside">
                {spellData.conditions.map((condition) => (
                  <li key={condition.id}>{condition.value}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center">
            <motion.div
              className="w-24 h-24 relative flex items-center justify-center"
              animate={isDeployed ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 2, repeat: isDeployed ? Infinity : 0, repeatType: "reverse" }}
            >
              {isDeployed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                </motion.div>
              ) : (
                <svg className="w-24 h-24" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="#F2F0EA" 
                    strokeWidth="2" 
                    fill="none" 
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#D98F64"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * deploymentStep) / (deploymentSteps.length - 1)}
                    initial={false}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </svg>
              )}
            </motion.div>
          </div>
        </motion.div>
        
        {/* Deployment steps */}
        <div className="relative z-20 mt-8 space-y-4 max-w-lg mx-auto">
          {deploymentSteps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex items-center gap-4 p-3 rounded-lg ${
                deploymentStep >= index ? "bg-studio-accent/20" : "bg-studio-sand/20"
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: deploymentStep >= index ? 1 : 0.5,
                x: 0
              }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                deploymentStep > index 
                  ? "bg-green-500 text-white" 
                  : deploymentStep === index 
                    ? "bg-studio-accent text-white" 
                    : "bg-studio-sand/30"
              }`}>
                {deploymentStep > index ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              
              <div>
                <h4 className="font-medium">{step.title}</h4>
                <p className="text-sm text-studio-clay">{step.description}</p>
              </div>
              
              {deploymentStep === index && !isDeployed && (
                <motion.div 
                  className="ml-auto h-3 w-3 rounded-full bg-studio-accent"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center">
        {!isDeployed ? (
          <Button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="bg-studio-accent hover:bg-studio-accent/90 text-white px-8 py-6 text-lg rounded-xl"
          >
            {isDeploying ? (
              <motion.div 
                className="mr-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </motion.div>
            ) : (
              <Send className="mr-2 h-5 w-5" />
            )}
            {isDeploying ? "Casting Spell..." : "Cast Your Spell"}
          </Button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-xl font-medium text-green-600 mb-2">Spell Successfully Cast!</p>
            <p className="text-studio-clay">Your contract is now alive in the digital realm</p>
            
            <div className="mt-4">
              <Button variant="outline" className="mr-2">
                View Contract
              </Button>
              <Button>
                Create Another Contract
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SpellDeployment;
