
import React from "react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  return (
    <div className="flex justify-center overflow-x-auto py-2 px-2 gap-4 bg-white/40 backdrop-blur-sm rounded-xl border border-studio-sand/20 shadow-subtle">
      <TooltipProvider delayDuration={150}>
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Tooltip key={tab.id}>
              <TooltipTrigger asChild>
                <motion.button
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative p-2.5 rounded-lg transition-all duration-300",
                    isActive 
                      ? "bg-studio-accent text-white shadow-sm" 
                      : "bg-white/80 text-studio-charcoal hover:bg-white hover:scale-110"
                  )}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  aria-label={tab.name}
                >
                  <TabIcon className="w-5 h-5" />
                  
                  {isActive && (
                    <motion.span 
                      className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-studio-charcoal/90 text-white border-none px-3 py-1.5 rounded-lg backdrop-blur-md">
                {tab.name}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
};

export default TabNavigation;
