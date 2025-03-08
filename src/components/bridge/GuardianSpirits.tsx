
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Eye, Lock, Key, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const GuardianSpirits = () => {
  const [activeGuardian, setActiveGuardian] = useState<number | null>(null);
  const [isProtecting, setIsProtecting] = useState(false);
  
  const guardians = [
    {
      name: "Sentinel",
      icon: Eye,
      color: "#8B5CF6",
      power: "Vigilance",
      description: "Monitors the bridge for unauthorized access attempts"
    },
    {
      name: "Keeper",
      icon: Lock,
      color: "#0EA5E9",
      power: "Protection",
      description: "Secures the magical seals that bind digital assets during transit"
    },
    {
      name: "Validator",
      icon: Key,
      color: "#F97316",
      power: "Authentication",
      description: "Verifies the true essence of each creation as it crosses the bridge"
    },
    {
      name: "Guardian",
      icon: Shield,
      color: "#D946EF",
      power: "Defense",
      description: "Repels malicious energies seeking to corrupt assets in transit"
    }
  ];
  
  const toggleProtection = () => {
    setIsProtecting(!isProtecting);
    setActiveGuardian(null);
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        {/* Protection visualization */}
        <motion.div 
          className="relative w-full h-64 rounded-xl glass-card overflow-hidden"
          animate={{
            backgroundColor: isProtecting ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)"
          }}
        >
          {/* Portal simulation */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
            <motion.div 
              className="w-full h-full rounded-full bg-gradient-to-br from-[#9b87f5]/70 to-[#7E69AB]/70 backdrop-blur-md"
              animate={{
                scale: isProtecting ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 3,
                repeat: isProtecting ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
          </div>
          
          {/* Protection symbols */}
          <AnimatePresence>
            {isProtecting && (
              <>
                {guardians.map((guardian, index) => {
                  const angle = (index * 2 * Math.PI) / guardians.length;
                  const radius = 100;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const GuardianIcon = guardian.icon;
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute top-1/2 left-1/2"
                      initial={{ x, y, scale: 0, opacity: 0 }}
                      animate={{ 
                        x, 
                        y,
                        scale: 1,
                        opacity: activeGuardian === index ? 1 : 0.7,
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => setActiveGuardian(index)}
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                      <motion.div 
                        className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
                        style={{ backgroundColor: guardian.color }}
                        whileHover={{ scale: 1.1 }}
                        animate={{
                          boxShadow: activeGuardian === index 
                            ? [`0 0 0 0 ${guardian.color}00`, `0 0 0 10px ${guardian.color}40`, `0 0 0 0 ${guardian.color}00`]
                            : `0 0 0 0 ${guardian.color}00`
                        }}
                        transition={{
                          boxShadow: {
                            duration: 1.5,
                            repeat: activeGuardian === index ? Infinity : 0,
                            repeatDelay: 0.5
                          }
                        }}
                      >
                        <GuardianIcon className="text-white w-6 h-6" />
                      </motion.div>
                    </motion.div>
                  );
                })}
                
                {/* Protection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {guardians.map((_, index) => {
                    const nextIndex = (index + 1) % guardians.length;
                    const angle1 = (index * 2 * Math.PI) / guardians.length;
                    const angle2 = (nextIndex * 2 * Math.PI) / guardians.length;
                    const radius = 100;
                    
                    const x1 = Math.cos(angle1) * radius + (window.innerWidth / 2);
                    const y1 = Math.sin(angle1) * radius + 130;
                    const x2 = Math.cos(angle2) * radius + (window.innerWidth / 2);
                    const y2 = Math.sin(angle2) * radius + 130;
                    
                    return (
                      <motion.line
                        key={`line-${index}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="rgba(155, 135, 245, 0.3)"
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.7 }}
                        transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                      />
                    );
                  })}
                </svg>
              </>
            )}
          </AnimatePresence>
          
          {/* Central protection shield */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            animate={{
              scale: isProtecting ? 1 : 0,
              rotate: isProtecting ? [0, 360] : 0
            }}
            transition={{
              scale: { duration: 0.5 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
          >
            <div className="relative w-48 h-48 flex items-center justify-center">
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-dashed border-[#9b87f5]/30"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.div 
                className="w-16 h-16 rounded-full bg-[#9b87f5]/10 backdrop-blur-sm flex items-center justify-center"
                animate={{
                  boxShadow: isProtecting 
                    ? ['0 0 0 0 rgba(155, 135, 245, 0)', '0 0 30px 5px rgba(155, 135, 245, 0.3)', '0 0 0 0 rgba(155, 135, 245, 0)']
                    : '0 0 0 0 rgba(155, 135, 245, 0)'
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: isProtecting ? Infinity : 0
                  }
                }}
              >
                <ShieldCheck className="text-[#9b87f5] w-8 h-8" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Guardian details */}
        <AnimatePresence mode="wait">
          {activeGuardian !== null && (
            <motion.div 
              className="absolute bottom-4 left-4 right-4 p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-subtle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: guardians[activeGuardian].color }}
                >
                  {React.createElement(guardians[activeGuardian].icon, { 
                    className: "text-white w-4 h-4" 
                  })}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-studio-charcoal flex items-center">
                    {guardians[activeGuardian].name}
                    <span className="text-xs font-normal ml-2 text-studio-clay">
                      {guardians[activeGuardian].power}
                    </span>
                  </h3>
                  <p className="text-sm text-studio-clay mt-1">
                    {guardians[activeGuardian].description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="text-center">
        <Button 
          size="lg" 
          onClick={toggleProtection}
          className={`${isProtecting 
            ? 'bg-studio-accent hover:bg-studio-accent/80' 
            : 'bg-[#9b87f5] hover:bg-[#7E69AB]'} transition-all duration-300`}
        >
          {isProtecting ? "Deactivate Guardians" : "Summon Guardian Spirits"}
          <Shield className="ml-2" />
        </Button>
        
        {isProtecting && (
          <p className="text-sm text-studio-clay mt-3">
            Click on each guardian spirit to learn about their protective powers
          </p>
        )}
      </div>
    </div>
  );
};
