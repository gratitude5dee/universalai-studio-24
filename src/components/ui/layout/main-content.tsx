
import React, { ReactNode } from "react";
import Header from "../header";
import { motion } from "framer-motion";

interface MainContentProps {
  children: ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <motion.div 
      className="flex-1 min-h-screen flex flex-col w-full bg-studio-cream bg-[radial-gradient(circle_at_top_right,rgba(217,143,100,0.08),transparent_60%)]"
      layout
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Header />
      <motion.main 
        className="px-4 pb-8 mt-2 flex-1 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
    </motion.div>
  );
};

export default MainContent;
