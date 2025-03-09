
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
    <div className="flex justify-center overflow-x-auto py-3 px-4 gap-5 bg-white/50 backdrop-blur-sm rounded-2xl border border-studio-sand/20 shadow-subtle">
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
                    "relative p-3 rounded-xl transition-all duration-300",
                    isActive 
                      ? "bg-studio-accent text-white shadow-md" 
                      : "bg-white/80 text-studio-charcoal hover:bg-white hover:scale-110"
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
              </TooltipTrigger>
              <TooltipContent 
                side="bottom" 
                className="bg-studio-charcoal/90 text-white border-none px-3 py-1.5 rounded-lg backdrop-blur-md"
                sideOffset={5}
              >
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
