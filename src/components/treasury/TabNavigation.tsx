
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
    <div className="flex justify-center overflow-x-auto py-4 px-6 gap-7 bg-white/60 backdrop-blur-sm rounded-2xl border border-studio-sand/20 shadow-[0_4px_20px_rgba(0,0,0,0.07)] relative">
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
                "flex items-center rounded-xl transition-all overflow-hidden",
                isActive 
                  ? "bg-studio-accent text-white shadow-[0_4px_12px_rgba(217,143,100,0.35)]" 
                  : "bg-white/90 text-studio-charcoal hover:bg-white hover:shadow-md"
              )}
              animate={{
                width: isHovered ? 'auto' : 'auto',
                transition: { 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 30 
                }
              }}
              whileHover={{ 
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { type: "spring", stiffness: 400, damping: 17 }
              }}
            >
              <motion.button
                onClick={() => setActiveTab(tab.id)}
                className="p-3.5 flex items-center justify-center relative"
                aria-label={tab.name}
              >
                <TabIcon className={cn(
                  "w-5 h-5 transition-all duration-300",
                  isActive ? "scale-110" : ""
                )} />
                
                {isActive && (
                  <motion.span
                    className="absolute inset-0 bg-white/10 rounded-xl"
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
                    className="pr-3.5 pl-1 flex items-center"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ 
                      width: 'auto', 
                      opacity: 1,
                      transition: { 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 30 
                      }
                    }}
                    exit={{ 
                      width: 0, 
                      opacity: 0,
                      transition: { 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 30 
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
