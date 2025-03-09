
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

interface TabContentRendererProps {
  activeTab: string;
}

const TabContentRenderer: React.FC<TabContentRendererProps> = ({ activeTab }) => {
  const renderContent = () => {
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
      key={activeTab}
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
