
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
                "relative p-3.5 rounded-xl transition-all duration-300 flex items-center",
                isActive 
                  ? "bg-studio-accent text-white shadow-md" 
                  : "bg-white/90 text-studio-charcoal hover:bg-white hover:scale-105"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={tab.name}
            >
              <TabIcon className="w-5 h-5" />
              
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    className="absolute left-[calc(100%+8px)] whitespace-nowrap text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tab.name}
                  </motion.span>
                )}
              </AnimatePresence>

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
