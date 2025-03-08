
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Coins, Map, Sparkles, Scroll, Crystal } from "lucide-react";
import DashboardLayout from "@/layouts/dashboard-layout";
import TreasureCollection from "@/components/treasury/TreasureCollection";
import TreasureJourney from "@/components/treasury/TreasureJourney";
import TreasureMap from "@/components/treasury/TreasureMap";
import CrystalBall from "@/components/treasury/CrystalBall";
import TreasureChest from "@/components/treasury/TreasureChest";

const TreasureVault = () => {
  const [activeTab, setActiveTab] = useState("collection");

  const tabs = [
    { id: "collection", name: "Treasure Collection", icon: Coins },
    { id: "journey", name: "Token Journeys", icon: Map },
    { id: "allocation", name: "Treasure Maps", icon: Scroll },
    { id: "forecast", name: "Crystal Scrying", icon: Crystal },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "collection":
        return <TreasureCollection />;
      case "journey":
        return <TreasureJourney />;
      case "allocation":
        return <TreasureMap />;
      case "forecast":
        return <CrystalBall />;
      default:
        return <TreasureCollection />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Magical Treasury</h1>
          <p className="text-muted-foreground mt-2">
            Manage your magical treasures and watch your wealth grow through enchanted stewardship
          </p>
        </div>

        {/* Main Treasury Chest - Quick Stats */}
        <TreasureChest />

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto pb-2 -mx-1">
          {tabs.map((tab) => (
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
              <tab.icon className="w-4 h-4 mr-2" />
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
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default TreasureVault;
