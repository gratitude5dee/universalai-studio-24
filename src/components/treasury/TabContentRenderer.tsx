
import React from "react";
import { motion } from "framer-motion";
import TreasureCollection from "./TreasureCollection";
import TreasureJourney from "./TreasureJourney";
import TreasureMap from "./TreasureMap";
import CrystalBall from "./CrystalBall";
import PaymentSchedules from "./PaymentSchedules";
import OnChainActions from "./OnChainActions";
import TradingAgents from "./TradingAgents";
import LiquidityAgents from "./LiquidityAgents";
import BuiltOnBase from "./BuiltOnBase";
import { useSearchParams } from "react-router-dom";

interface TabContentRendererProps {
  activeTab: string;
}

const TabContentRenderer: React.FC<TabContentRendererProps> = ({ activeTab }) => {
  const [searchParams] = useSearchParams();
  const subtab = searchParams.get("subtab");

  const renderContent = () => {
    // Special case for Base tab with subtabs
    if (activeTab === "base") {
      // If a specific subtab is specified, it will be handled within the BuiltOnBase component
      return <BuiltOnBase initialSubtab={subtab} />;
    }
    
    // Handle other tabs as before
    switch (activeTab) {
      case "collection":
        return <TreasureCollection />;
      case "journey":
        return <TreasureJourney />;
      case "allocation":
        return <TreasureMap />;
      case "forecast":
        return <CrystalBall />;
      case "schedules":
        return <PaymentSchedules />;
      case "onchain":
        return <OnChainActions />;
      case "trading":
        return <TradingAgents />;
      case "liquidity":
        return <LiquidityAgents />;
      default:
        return <TreasureCollection />;
    }
  };

  return (
    <motion.div
      key={activeTab + (subtab || '')}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {renderContent()}
    </motion.div>
  );
};

export default TabContentRenderer;
