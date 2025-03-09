
import React, { ReactNode } from "react";
import Header from "../header";
import { motion } from "framer-motion";

interface MainContentProps {
  children: ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <motion.div 
      className="flex-1 overflow-auto"
      layout
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Header />
      <main className="px-4 pb-8">
        {children}
      </main>
    </motion.div>
  );
};

export default MainContent;
