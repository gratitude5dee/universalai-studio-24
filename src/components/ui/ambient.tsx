
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
      <div className="absolute inset-0 bg-blue-darker bg-blue-gradient opacity-90"></div>
      
      {/* Animated cloud-like gradients */}
      <motion.div
        animate={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
        }}
        transition={{ type: "spring", stiffness: 8, damping: 25 }}
        className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full opacity-20 bg-blue-light blur-3xl animate-cloud-drift"
      />
      
      <motion.div
        animate={{
          x: -mousePosition.x * 15,
          y: -mousePosition.y * 15,
        }}
        transition={{ type: "spring", stiffness: 8, damping: 25 }}
        className="absolute bottom-[-30%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-15 bg-blue-primary blur-3xl animate-cloud-drift-alt"
        style={{ animationDelay: "-20s" }}
      />
      
      <motion.div
        animate={{
          x: mousePosition.x * -10,
          y: mousePosition.y * 25,
        }}
        transition={{ type: "spring", stiffness: 8, damping: 25 }}
        className="absolute top-[30%] left-[20%] w-[40%] h-[40%] rounded-full opacity-10 bg-blue-lighter blur-3xl animate-cloud-drift"
        style={{ animationDelay: "-35s" }}
      />
      
      {/* Subtle noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
      }} />
    </div>
  );
};

export default Ambient;
