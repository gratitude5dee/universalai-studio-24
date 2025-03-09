
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRightLeft, Upload, Download, QrCode, Package, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BridgeDirection } from "./types";
import { toast } from "sonner";

export const MagicPortal = () => {
  const [portalActive, setPortalActive] = useState(false);
  const [showGlimpse, setShowGlimpse] = useState(false);
  const [assetName, setAssetName] = useState("");
  const [assetType, setAssetType] = useState<"product" | "ticket" | "certificate" | "document">("product");
  const [direction, setDirection] = useState<BridgeDirection>("digital-to-physical");
  
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

  const handleBridgeAsset = (bridgeDirection: BridgeDirection) => {
    if (!assetName.trim()) {
      toast("Please enter an asset name");
      return;
    }

    toast.success(`Beginning bridge process for ${assetName}`, {
      description: `Direction: ${bridgeDirection === "digital-to-physical" ? "Digital to Physical" : "Physical to Digital"}`,
    });
    
    // Simulate bridge processing
    setTimeout(() => {
      toast.success(`Asset "${assetName}" has been queued for bridging`, {
        description: "You will be notified when the process completes",
      });
    }, 2000);
  };

  const assetIcons = {
    product: <Package className="mr-2 h-4 w-4" />,
    ticket: <Ticket className="mr-2 h-4 w-4" />,
    certificate: <Sparkles className="mr-2 h-4 w-4" />,
    document: <QrCode className="mr-2 h-4 w-4" />,
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Portal visualization */}
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
      
      {/* Bridge controls */}
      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        {!portalActive ? (
          <Button 
            size="lg"
            onClick={() => setPortalActive(true)}
            className="bg-studio-sand/50 hover:bg-studio-sand text-studio-charcoal transition-all duration-300 w-full"
          >
            Activate Portal
            <Sparkles className="ml-2" />
          </Button>
        ) : (
          <motion.div 
            className="w-full space-y-4" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input 
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  placeholder="Asset name"
                  className="flex-1"
                />
                <select
                  value={assetType}
                  onChange={(e) => setAssetType(e.target.value as any)}
                  className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="product">Product</option>
                  <option value="ticket">Ticket</option>
                  <option value="certificate">Certificate</option>
                  <option value="document">Document</option>
                </select>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter the name of the asset you wish to bridge between realms
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Button 
                variant="outline" 
                className="gap-2 w-full justify-between bg-white hover:bg-studio-accent/10"
                onClick={() => handleBridgeAsset("digital-to-physical")}
              >
                <div className="flex items-center">
                  <Upload size={18} />
                  <span className="ml-2">Digital to Physical</span>
                </div>
                {assetIcons[assetType]}
              </Button>
              
              <Button 
                variant="outline" 
                className="gap-2 w-full justify-between bg-white hover:bg-studio-accent/10"
                onClick={() => handleBridgeAsset("physical-to-digital")}
              >
                <div className="flex items-center">
                  <Download size={18} />
                  <span className="ml-2">Physical to Digital</span>
                </div>
                {assetIcons[assetType]}
              </Button>
              
              <Button 
                variant="secondary"
                onClick={() => setPortalActive(false)}
                className="mt-2"
              >
                Close Portal
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
