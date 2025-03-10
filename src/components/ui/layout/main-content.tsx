
import React, { ReactNode, useState, useEffect } from "react";
import Header from "../header";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import MatrixAnimation from "../animations/matrix-animation";

interface MainContentProps {
  children: ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  const location = useLocation();
  const [isPageTransition, setIsPageTransition] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(true);
  
  // Trigger transition when route changes
  useEffect(() => {
    // Only start a new transition if the previous one is complete
    if (isAnimationComplete) {
      setIsAnimationComplete(false);
      setIsPageTransition(true);
    }
  }, [location.pathname, isAnimationComplete]);

  // Handle animation completed
  const handleAnimationComplete = () => {
    // Start fading out the animation
    setIsPageTransition(false);
    
    // Allow a small delay before allowing new transitions
    setTimeout(() => {
      setIsAnimationComplete(true);
    }, 300); // Small buffer after animation ends
  };

  return (
    <motion.div 
      className="flex-1 min-h-screen flex flex-col w-full bg-studio-cream bg-[radial-gradient(circle_at_top_right,rgba(217,143,100,0.08),transparent_60%)]"
      layout
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Header />
      
      {/* Matrix ASCII Animation Transition */}
      <AnimatePresence mode="wait">
        {isPageTransition && (
          <motion.div 
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MatrixAnimation onComplete={handleAnimationComplete} />
          </motion.div>
        )}
      </AnimatePresence>
      
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
