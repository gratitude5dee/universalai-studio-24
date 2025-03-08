
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ShieldAlert, ShieldCheck, Bell, Eye, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";

export const GuardianAlerts = () => {
  const [alerts, setAlerts] = useState([
    { 
      id: 1, 
      type: "warning", 
      message: "Unusual login pattern detected from new location", 
      guardian: "Sentinel Owl",
      time: "10 minutes ago",
      read: false
    },
    { 
      id: 2, 
      type: "info", 
      message: "Scheduled maintenance completed successfully", 
      guardian: "Whisper Fox",
      time: "2 hours ago",
      read: true
    },
    { 
      id: 3, 
      type: "error", 
      message: "API rate limit reached for image processing service", 
      guardian: "Thunder Bear",
      time: "4 hours ago",
      read: false
    },
    { 
      id: 4, 
      type: "success", 
      message: "Security scan completed with no vulnerabilities", 
      guardian: "Crystal Deer",
      time: "Yesterday",
      read: true
    },
  ]);

  const markAsRead = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };
  
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning": return ShieldAlert;
      case "error": return Shield;
      case "success": return ShieldCheck;
      case "info": return Bell;
      default: return Eye;
    }
  };
  
  const getAlertColor = (type: string) => {
    switch (type) {
      case "warning": return "bg-amber-100 text-amber-700 border-amber-200";
      case "error": return "bg-red-100 text-red-700 border-red-200";
      case "success": return "bg-green-100 text-green-700 border-green-200";
      case "info": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      <div className="relative glass-card p-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-studio-accent/10 to-studio-highlight/5" />
        
        <div className="relative flex items-center gap-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-5 bg-white/70 rounded-full shadow-subtle"
          >
            <Ghost className="h-12 w-12 text-studio-accent" />
          </motion.div>
          
          <div>
            <h2 className="text-2xl font-medium mb-1">Guardian Spirits</h2>
            <p className="text-muted-foreground max-w-lg">
              Your digital realm is protected by mystical guardian spirits. They will alert you 
              to any disturbances in the harmony of your systems.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-medium">Recent Messages</h3>
        
        <AnimatePresence>
          {alerts.map(alert => {
            const AlertIcon = getAlertIcon(alert.type);
            
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-4 p-4 rounded-lg border ${getAlertColor(alert.type)} ${alert.read ? 'opacity-70' : ''}`}
              >
                <div className="p-2 rounded-full bg-white/50">
                  <AlertIcon className="h-6 w-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{alert.guardian}</h4>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <p className="text-sm mt-1">{alert.message}</p>
                </div>
                
                {!alert.read && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => markAsRead(alert.id)}
                    className="self-start mt-1"
                  >
                    Acknowledge
                  </Button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium mb-4">Guardian Spirits Status</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Sentinel Owl", status: "active", description: "Watches for unusual activity" },
            { name: "Whisper Fox", status: "active", description: "Monitors system changes" },
            { name: "Thunder Bear", status: "active", description: "Protects against threats" },
            { name: "Crystal Deer", status: "resting", description: "Maintains harmony" }
          ].map(guardian => (
            <div key={guardian.name} className="bg-white/70 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{guardian.name}</h4>
                <span className={`inline-block w-2 h-2 rounded-full ${guardian.status === 'active' ? 'bg-green-500' : 'bg-amber-400'}`}></span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{guardian.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
