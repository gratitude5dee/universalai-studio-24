
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  TreeDeciduous, 
  Flower, 
  Sprout, 
  Droplets, 
  PlaneTakeoff, 
  Squirrel, 
  Bug, 
  ShieldCheck, 
  RotateCcw 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const LivingEcosystem = () => {
  const [isHealing, setIsHealing] = useState(false);
  const [ecosystemHealth, setEcosystemHealth] = useState({
    overallHealth: 92,
    services: [
      { name: "Authentication", status: "healthy", uptime: "99.9%" },
      { name: "Database", status: "healthy", uptime: "99.8%" },
      { name: "Storage", status: "attention", uptime: "98.5%" },
      { name: "API Gateway", status: "healthy", uptime: "99.7%" },
      { name: "Image Processing", status: "healing", uptime: "97.2%" },
      { name: "Search Index", status: "healthy", uptime: "99.6%" },
    ]
  });
  
  const healService = (serviceName: string) => {
    setIsHealing(true);
    
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          setEcosystemHealth(prev => ({
            ...prev,
            services: prev.services.map(service => 
              service.name === serviceName ? { ...service, status: "healthy", uptime: "99.9%" } : service
            )
          }));
          setIsHealing(false);
          resolve(true);
        }, 2000);
      }),
      {
        loading: `Nurturing ${serviceName}...`,
        success: `${serviceName} has been restored to full health!`,
        error: `Failed to heal ${serviceName}`
      }
    );
  };
  
  const runMaintenance = () => {
    setIsHealing(true);
    
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          setEcosystemHealth(prev => ({
            ...prev,
            overallHealth: 98,
            services: prev.services.map(service => ({ 
              ...service, 
              status: "healthy", 
              uptime: "99.9%" 
            }))
          }));
          setIsHealing(false);
          resolve(true);
        }, 3000);
      }),
      {
        loading: "Conducting ecosystem maintenance...",
        success: "Maintenance complete! The ecosystem is thriving.",
        error: "Maintenance encountered an issue"
      }
    );
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-green-500";
      case "attention": return "text-amber-500";
      case "healing": return "text-blue-500";
      default: return "text-gray-500";
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy": return <TreeDeciduous className="h-4 w-4 text-green-500" />;
      case "attention": return <Bug className="h-4 w-4 text-amber-500" />;
      case "healing": return <Sprout className="h-4 w-4 text-blue-500" />;
      default: return <Flower className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="relative glass-card p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50" />
        
        <div className="relative flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="p-4 bg-white/90 rounded-full shadow-subtle">
              <TreeDeciduous className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <div className="md:flex-1">
            <h2 className="text-2xl font-medium mb-2">Living Ecosystem</h2>
            <p className="text-muted-foreground max-w-lg">
              Your digital services form a living ecosystem where each component plays a vital role
              in maintaining balance and harmony. Tend to your garden with care.
            </p>
            
            <div className="mt-4 flex items-center gap-4">
              <div className="w-full max-w-xs bg-gray-100 h-3 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-green-400 to-green-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${ecosystemHealth.overallHealth}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <span className="font-medium">{ecosystemHealth.overallHealth}%</span>
            </div>
          </div>
          
          <Button 
            onClick={runMaintenance} 
            disabled={isHealing}
            className="md:self-start bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Tend Ecosystem
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="glass-card p-6">
            <h3 className="text-lg font-medium mb-4">Digital Landscape</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ecosystemHealth.services.map((service) => (
                <motion.div 
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white/90 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{service.name}</h4>
                    {getStatusIcon(service.status)}
                  </div>
                  
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs">Status:</span>
                    <span className={`text-xs font-medium ${getStatusColor(service.status)}`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs">Uptime:</span>
                    <span className="text-xs font-medium">{service.uptime}</span>
                  </div>
                  
                  {service.status !== "healthy" && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => healService(service.name)}
                      disabled={isHealing}
                      className="mt-2 w-full text-xs"
                    >
                      <Droplets className="mr-1 h-3 w-3" />
                      Nurture
                    </Button>
                  )}
                  
                  {service.status === "healing" && (
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <div className="glass-card p-6 h-full">
            <h3 className="text-lg font-medium mb-4">Ecosystem Guardians</h3>
            
            <div className="space-y-4">
              <GuardianCard 
                name="Auto-Scaling" 
                description="Adjusts resources as needed" 
                icon={PlaneTakeoff} 
                status="active"
              />
              
              <GuardianCard 
                name="Self-Healing" 
                description="Recovers from failures" 
                icon={Squirrel} 
                status="active"
              />
              
              <GuardianCard 
                name="Security Sentinel" 
                description="Protects against threats" 
                icon={ShieldCheck} 
                status="active"
              />
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium mb-2">Ecosystem Wisdom</h4>
                <p className="text-xs text-muted-foreground italic">
                  "The health of the ecosystem is reflected in the harmony of its parts. 
                  Tend to each service with care, and the whole will flourish."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GuardianCard = ({ name, description, icon: Icon, status }: {
  name: string;
  description: string;
  icon: React.ElementType;
  status: "active" | "resting";
}) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg">
      <div className={`p-2 rounded-full ${status === 'active' ? 'bg-green-100' : 'bg-amber-100'}`}>
        <Icon className={`h-4 w-4 ${status === 'active' ? 'text-green-600' : 'text-amber-600'}`} />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="text-sm font-medium">{name}</h4>
          <span className={`inline-block w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-amber-400'}`}></span>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
