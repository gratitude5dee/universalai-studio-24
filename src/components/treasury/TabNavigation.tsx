
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  name: string;
  icon: React.ElementType;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, setActiveTab }) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div className="flex justify-between overflow-x-auto py-6 px-8 gap-10 bg-white/70 backdrop-blur-md rounded-2xl border border-studio-sand/20 shadow-[0_8px_30px_rgba(0,0,0,0.08)] relative">
      {tabs.map((tab) => {
        const TabIcon = tab.icon;
        const isActive = activeTab === tab.id;
        const isHovered = hoveredTab === tab.id;
        
        return (
          <div 
            key={tab.id} 
            className="relative"
            onMouseEnter={() => setHoveredTab(tab.id)}
            onMouseLeave={() => setHoveredTab(null)}
          >
            <motion.div
              className={cn(
                "flex items-center rounded-xl overflow-hidden transition-all duration-300",
                isActive 
                  ? "bg-studio-accent text-white shadow-[0_6px_20px_rgba(217,143,100,0.4)]" 
                  : "bg-white/90 text-studio-charcoal hover:bg-white hover:shadow-lg"
              )}
              animate={{
                width: isHovered ? 'auto' : '46px',
                transition: { 
                  type: "spring", 
                  stiffness: 550, 
                  damping: 25 
                }
              }}
              whileHover={{ 
                y: -4,
                transition: { type: "spring", stiffness: 500, damping: 15 }
              }}
              whileTap={{ 
                scale: 0.92,
                transition: { type: "spring", stiffness: 500, damping: 17 }
              }}
            >
              <motion.button
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "p-3.5 flex items-center justify-center relative",
                  isActive && "bg-white/10"
                )}
                aria-label={tab.name}
                initial={false}
                animate={{ 
                  rotate: isHovered ? [0, -5, 5, -3, 0] : 0,
                  scale: isActive ? 1.1 : 1,
                  transition: { 
                    rotate: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 10,
                      duration: 0.6
                    },
                    scale: { duration: 0.3 }
                  }
                }}
              >
                <TabIcon className={cn(
                  "w-5 h-5 transition-all duration-300",
                  isActive ? "filter drop-shadow(0 0 3px rgba(255,255,255,0.5))" : ""
                )} />
                
                {isActive && (
                  <motion.span
                    className="absolute inset-0 bg-white/20 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layoutId="tab-highlight"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {isActive && (
                  <motion.span 
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30,
                      delay: 0.1
                    }}
                  />
                )}
              </motion.button>
              
              {/* Label that slides out horizontally within the button */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="pr-4 pl-1.5 flex items-center"
                    initial={{ 
                      width: 0, 
                      opacity: 0,
                      x: -10
                    }}
                    animate={{ 
                      width: 'auto', 
                      opacity: 1,
                      x: 0,
                      transition: { 
                        type: "spring", 
                        stiffness: 600, 
                        damping: 25 
                      }
                    }}
                    exit={{ 
                      width: 0, 
                      opacity: 0,
                      x: -10,
                      transition: { 
                        type: "spring", 
                        stiffness: 600, 
                        damping: 25,
                        opacity: { duration: 0.15 }
                      }
                    }}
                  >
                    <span className="text-sm font-medium whitespace-nowrap">
                      {tab.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default TabNavigation;
