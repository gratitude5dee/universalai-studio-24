
import React, { ReactNode, useState, useEffect, useRef } from "react";
import Header from "../header";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface MainContentProps {
  children: ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  const location = useLocation();
  const [isPageTransition, setIsPageTransition] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(true);
  
  // Trigger transition when route changes
  useEffect(() => {
    // Only start a new transition if the previous one is complete
    if (isAnimationComplete) {
      setIsAnimationComplete(false);
      setIsPageTransition(true);
    }
  }, [location.pathname, isAnimationComplete]);

  // Handle video ended event
  const handleVideoEnded = () => {
    setIsPageTransition(false);
    
    // Allow a small delay before allowing new transitions
    setTimeout(() => {
      setIsAnimationComplete(true);
    }, 300); // Small buffer after video ends
  };

  return (
    <motion.div 
      className="flex-1 min-h-screen flex flex-col w-full bg-studio-cream bg-[radial-gradient(circle_at_top_right,rgba(217,143,100,0.08),transparent_60%)]"
      layout
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Header />
      
      {/* ASCII Video Transition */}
      <AnimatePresence>
        {isPageTransition && (
          <motion.div 
            className="fixed inset-0 bg-[#120825] z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <video 
              ref={videoRef}
              src="/ascii-video.mp4" 
              autoPlay 
              muted 
              playsInline
              className="max-w-full max-h-full object-contain"
              onEnded={handleVideoEnded}
            />
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
