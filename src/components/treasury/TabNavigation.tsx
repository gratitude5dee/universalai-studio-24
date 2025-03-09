
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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
    <div className="flex overflow-x-auto pb-2 -mx-1">
      {tabs.map((tab) => {
        const TabIcon = tab.icon;
        return (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 mx-1 rounded-full transition-all ${
              activeTab === tab.id
                ? "bg-studio-accent text-white"
                : "bg-white/80 hover:bg-white"
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <TabIcon className="w-4 h-4 mr-2" />
            <span>{tab.name}</span>
            {activeTab === tab.id && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-2 bg-white/20 rounded-full p-1"
              >
                <Sparkles className="w-3 h-3" />
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default TabNavigation;
