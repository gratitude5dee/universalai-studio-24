
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
    <div className="flex justify-center overflow-x-auto py-4 px-6 gap-7 bg-white/60 backdrop-blur-sm rounded-2xl border border-studio-sand/20 shadow-[0_4px_20px_rgba(0,0,0,0.07)]">
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
            {/* Tooltip that appears on hover - now positioned above */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 bg-studio-charcoal/90 text-white text-sm rounded-lg backdrop-blur-md shadow-lg whitespace-nowrap z-50"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                >
                  {tab.name}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-studio-charcoal/90" />
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.button
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative p-3.5 rounded-xl transition-all duration-300",
                isActive 
                  ? "bg-studio-accent text-white shadow-md" 
                  : "bg-white/90 text-studio-charcoal hover:bg-white hover:scale-110"
              )}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ y: 0, scale: 0.95 }}
              aria-label={tab.name}
            >
              <TabIcon className="w-5 h-5" />
              
              {isActive && (
                <motion.span 
                  className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.7)]"
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
          </div>
        );
      })}
    </div>
  );
};

export default TabNavigation;
