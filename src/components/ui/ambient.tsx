
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Ambient = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-studio-cream opacity-80"></div>
      
      {/* Animated soft gradient blobs */}
      <motion.div
        animate={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30,
        }}
        transition={{ type: "spring", stiffness: 10, damping: 25 }}
        className="absolute top-[-30%] right-[-10%] w-[70%] h-[70%] rounded-full opacity-20 bg-gradient-to-r from-studio-accent/30 to-studio-highlight/30 blur-3xl animate-breathing"
      />
      
      <motion.div
        animate={{
          x: -mousePosition.x * 20,
          y: -mousePosition.y * 20,
        }}
        transition={{ type: "spring", stiffness: 10, damping: 25 }}
        className="absolute bottom-[-30%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-10 bg-gradient-to-r from-studio-clay/30 to-studio-highlight/30 blur-3xl animate-breathing"
        style={{ animationDelay: "-4s" }}
      />
      
      {/* Grain overlay for texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
      }} />
    </div>
  );
};

export default Ambient;
