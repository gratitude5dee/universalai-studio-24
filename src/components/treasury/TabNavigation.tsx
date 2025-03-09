
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
            className="relative flex items-center"
            onMouseEnter={() => setHoveredTab(tab.id)}
            onMouseLeave={() => setHoveredTab(null)}
          >
            <motion.button
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative overflow-hidden p-3.5 rounded-xl transition-colors flex items-center justify-center",
                isActive 
                  ? "bg-studio-accent text-white shadow-[0_4px_12px_rgba(217,143,100,0.35)]" 
                  : "bg-white/90 text-studio-charcoal hover:bg-white hover:shadow-md"
              )}
              whileHover={{ 
                scale: 1.08,
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { type: "spring", stiffness: 400, damping: 17 }
              }}
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

              {/* Label that slides out on hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute left-[calc(100%+12px)] pointer-events-none bg-studio-charcoal/90 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap shadow-lg"
                    initial={{ opacity: 0, x: -5, scale: 0.95 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      scale: 1,
                      transition: { 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 25 
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: -5, 
                      scale: 0.95,
                      transition: { duration: 0.15 } 
                    }}
                  >
                    {tab.name}
                    <motion.div 
                      className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-studio-charcoal/90"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.05 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        );
      })}
    </div>
  );
};

export default TabNavigation;
