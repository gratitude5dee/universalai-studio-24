
import React, { ReactNode } from "react";
import Header from "../header";
import { motion } from "framer-motion";

interface MainContentProps {
  children: ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <motion.div 
      className="flex-1 min-h-screen flex flex-col w-full bg-studio-cream"
      layout
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Header />
      <main className="px-4 pb-8 mt-2 flex-1">
        {children}
      </main>
    </motion.div>
  );
};

export default MainContent;
