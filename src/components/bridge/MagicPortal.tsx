
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRightLeft, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MagicPortal = () => {
  const [portalActive, setPortalActive] = useState(false);
  const [showGlimpse, setShowGlimpse] = useState(false);
  
  useEffect(() => {
    if (portalActive) {
      const glimpseTimer = setTimeout(() => {
        setShowGlimpse(true);
      }, 1000);
      
      return () => clearTimeout(glimpseTimer);
    } else {
      setShowGlimpse(false);
    }
  }, [portalActive]);

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="relative w-full max-w-2xl aspect-[16/9] rounded-3xl overflow-hidden">
        {/* Portal background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB]"
          animate={{
            opacity: portalActive ? 1 : 0.7,
            scale: portalActive ? 1 : 0.98,
          }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Shimmering effect */}
        <motion.div 
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPHBhdHRlcm4KICAgICAgaWQ9InBhdHRlcm4iCiAgICAgIHdpZHRoPSI0MCIKICAgICAgaGVpZ2h0PSI0MCIKICAgICAgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSIKICAgID4KICAgICAgPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjMpIiAvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiAvPgo8L3N2Zz4=')]"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Portal ring */}
        <motion.div 
          className="absolute inset-8 rounded-full border-[15px] border-white/20 flex items-center justify-center"
          animate={{
            rotate: portalActive ? [0, 360] : 0,
            borderColor: portalActive ? ["rgba(255,255,255,0.2)", "rgba(214,188,250,0.6)", "rgba(255,255,255,0.2)"] : "rgba(255,255,255,0.2)",
            boxShadow: portalActive ? "0 0 50px rgba(214,188,250,0.8)" : "none",
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            borderColor: { duration: 3, repeat: Infinity },
            boxShadow: { duration: 2 }
          }}
        >
          {/* Inner portal */}
          <motion.div 
            className="absolute inset-4 rounded-full bg-white/10 backdrop-blur-sm overflow-hidden"
            animate={{
              scale: portalActive ? [0.95, 1.05, 0.95] : 1,
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            {/* Glimpse of the other side */}
            <AnimatePresence>
              {showGlimpse && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="relative w-full h-full">
                    {/* Virtual object glimpse */}
                    <motion.div 
                      className="absolute top-1/2 left-1/2 w-24 h-24 -ml-12 -mt-12"
                      animate={{
                        scale: [0.8, 1, 0.8],
                        opacity: [0.4, 0.8, 0.4],
                        y: [0, -10, 0],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      <div className="w-full h-full rounded-lg bg-gradient-to-tr from-[#F97316] to-[#D946EF] shadow-lg" />
                      <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-10 h-10" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
        
        {/* Portal activation sparkles */}
        <AnimatePresence>
          {portalActive && (
            <motion.div 
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{ 
                    x: `${50 + (Math.random() * 30 - 15)}%`, 
                    y: `${50 + (Math.random() * 30 - 15)}%`,
                    scale: 0,
                    opacity: 0 
                  }}
                  animate={{ 
                    x: `${Math.random() * 100}%`, 
                    y: `${Math.random() * 100}%`,
                    scale: [0, 1 + Math.random() * 3, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex flex-col items-center gap-6">
        <Button 
          size="lg"
          onClick={() => setPortalActive(!portalActive)}
          className={`${portalActive 
            ? 'bg-[#8B5CF6] hover:bg-[#7E69AB] text-white' 
            : 'bg-studio-sand/50 hover:bg-studio-sand text-studio-charcoal'} 
            transition-all duration-300`}
        >
          {portalActive ? "Close Portal" : "Activate Portal"}
          <Sparkles className={`ml-2 ${portalActive ? 'animate-pulse' : ''}`} />
        </Button>
        
        {portalActive && (
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button variant="outline" className="gap-2 px-6">
              <Upload size={18} />
              Send to Physical
            </Button>
            <Button variant="outline" className="gap-2 px-6">
              <Download size={18} />
              Bring to Digital
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
