import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Eye, Lock, Key, ShieldCheck, FileCheck, AlertTriangle, Fingerprint, QrCode, Scroll } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerificationMethod } from "./types";
import { toast } from "sonner";

export const GuardianSpirits = () => {
  const [activeGuardian, setActiveGuardian] = useState<number | null>(null);
  const [isProtecting, setIsProtecting] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  
  const guardians = [
    {
      name: "Sentinel",
      icon: Eye,
      color: "#8B5CF6",
      power: "Vigilance",
      description: "Monitors the bridge for unauthorized access attempts"
    },
    {
      name: "Keeper",
      icon: Lock,
      color: "#0EA5E9",
      power: "Protection",
      description: "Secures the magical seals that bind digital assets during transit"
    },
    {
      name: "Validator",
      icon: Key,
      color: "#F97316",
      power: "Authentication",
      description: "Verifies the true essence of each creation as it crosses the bridge"
    },
    {
      name: "Guardian",
      icon: Shield,
      color: "#D946EF",
      power: "Defense",
      description: "Repels malicious energies seeking to corrupt assets in transit"
    }
  ];
  
  const verificationMethods: VerificationMethod[] = [
    {
      id: "qr",
      name: "QR Code Verification",
      description: "Scan unique QR codes to verify the authenticity of physical items",
      icon: QrCode,
      securityLevel: "medium",
    },
    {
      id: "nfc",
      name: "NFC Chip Authentication",
      description: "Embedded NFC chips provide tamper-proof verification",
      icon: Fingerprint,
      securityLevel: "high",
    },
    {
      id: "certificate",
      name: "Certificate of Authenticity",
      description: "Digital certificates signed with cryptographic proofs",
      icon: Scroll,
      securityLevel: "medium",
    },
    {
      id: "multi",
      name: "Multi-Factor Verification",
      description: "Combines multiple verification methods for highest security",
      icon: FileCheck,
      securityLevel: "high",
    },
  ];
  
  const toggleProtection = () => {
    setIsProtecting(!isProtecting);
    setActiveGuardian(null);
    
    if (!isProtecting) {
      toast.success("Guardian spirits summoned", {
        description: "Your bridge is now protected by mystical guardians"
      });
    } else {
      toast.info("Guardians have returned to their realm");
    }
  };

  const applyVerificationMethod = (methodId: string) => {
    setSelectedMethod(methodId);
    const method = verificationMethods.find(m => m.id === methodId);
    
    toast.success(`${method?.name} activated`, {
      description: `Security level: ${method?.securityLevel}`
    });
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <motion.div 
          className="relative w-full h-64 rounded-xl glass-card overflow-hidden"
          animate={{
            backgroundColor: isProtecting ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)"
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
            <motion.div 
              className="w-full h-full rounded-full bg-gradient-to-br from-[#9b87f5]/70 to-[#7E69AB]/70 backdrop-blur-md"
              animate={{
                scale: isProtecting ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 3,
                repeat: isProtecting ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <AnimatePresence>
            {isProtecting && (
              <>
                {guardians.map((guardian, index) => {
                  const angle = (index * 2 * Math.PI) / guardians.length;
                  const radius = 100;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const GuardianIcon = guardian.icon;
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute top-1/2 left-1/2"
                      initial={{ x, y, scale: 0, opacity: 0 }}
                      animate={{ 
                        x, 
                        y,
                        scale: 1,
                        opacity: activeGuardian === index ? 1 : 0.7,
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => setActiveGuardian(index)}
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                      <motion.div 
                        className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
                        style={{ backgroundColor: guardian.color }}
                        whileHover={{ scale: 1.1 }}
                        animate={{
                          boxShadow: activeGuardian === index 
                            ? [`0 0 0 0 ${guardian.color}00`, `0 0 0 10px ${guardian.color}40`, `0 0 0 0 ${guardian.color}00`]
                            : `0 0 0 0 ${guardian.color}00`
                        }}
                        transition={{
                          boxShadow: {
                            duration: 1.5,
                            repeat: activeGuardian === index ? Infinity : 0,
                            repeatDelay: 0.5
                          }
                        }}
                      >
                        <GuardianIcon className="text-white w-6 h-6" />
                      </motion.div>
                    </motion.div>
                  );
                })}
                
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {guardians.map((_, index) => {
                    const nextIndex = (index + 1) % guardians.length;
                    const angle1 = (index * 2 * Math.PI) / guardians.length;
                    const angle2 = (nextIndex * 2 * Math.PI) / guardians.length;
                    const radius = 100;
                    
                    const x1 = Math.cos(angle1) * radius + (window.innerWidth / 2);
                    const y1 = Math.sin(angle1) * radius + 130;
                    const x2 = Math.cos(angle2) * radius + (window.innerWidth / 2);
                    const y2 = Math.sin(angle2) * radius + 130;
                    
                    return (
                      <motion.line
                        key={`line-${index}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="rgba(155, 135, 245, 0.3)"
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.7 }}
                        transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                      />
                    );
                  })}
                </svg>
              </>
            )}
          </AnimatePresence>
          
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            animate={{
              scale: isProtecting ? 1 : 0,
              rotate: isProtecting ? [0, 360] : 0
            }}
            transition={{
              scale: { duration: 0.5 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
          >
            <div className="relative w-48 h-48 flex items-center justify-center">
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-dashed border-[#9b87f5]/30"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.div 
                className="w-16 h-16 rounded-full bg-[#9b87f5]/10 backdrop-blur-sm flex items-center justify-center"
                animate={{
                  boxShadow: isProtecting 
                    ? ['0 0 0 0 rgba(155, 135, 245, 0)', '0 0 30px 5px rgba(155, 135, 245, 0.3)', '0 0 0 0 rgba(155, 135, 245, 0)']
                    : '0 0 0 0 rgba(155, 135, 245, 0)'
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: isProtecting ? Infinity : 0
                  }
                }}
              >
                <ShieldCheck className="text-[#9b87f5] w-8 h-8" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {activeGuardian !== null && (
            <motion.div 
              className="absolute bottom-4 left-4 right-4 p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-subtle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: guardians[activeGuardian].color }}
                >
                  {React.createElement(guardians[activeGuardian].icon, { 
                    className: "text-white w-4 h-4" 
                  })}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-studio-charcoal flex items-center">
                    {guardians[activeGuardian].name}
                    <span className="text-xs font-normal ml-2 text-studio-clay">
                      {guardians[activeGuardian].power}
                    </span>
                  </h3>
                  <p className="text-sm text-studio-clay mt-1">
                    {guardians[activeGuardian].description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="bg-white rounded-xl shadow-subtle p-5">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Shield className="mr-2 h-5 w-5 text-[#9b87f5]" />
          Bridge Security Verification Methods
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {verificationMethods.map((method) => {
            const MethodIcon = method.icon;
            return (
              <div 
                key={method.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all
                  ${selectedMethod === method.id 
                    ? 'border-[#9b87f5] bg-[#9b87f5]/5' 
                    : 'border-gray-200 hover:border-[#9b87f5]/50'}`}
                onClick={() => applyVerificationMethod(method.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    method.securityLevel === 'high' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    <MethodIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium text-sm">{method.name}</h4>
                      <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                        method.securityLevel === 'high' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {method.securityLevel}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{method.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100 flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">Security Best Practices</p>
            <ul className="text-xs text-amber-700 list-disc pl-4 mt-1 space-y-1">
              <li>Always verify physical items through multiple methods</li>
              <li>Keep verification credentials secure and never share private keys</li>
              <li>For high-value assets, use high security verification methods</li>
              <li>Update verification methods regularly as technology evolves</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Button 
          size="lg" 
          onClick={toggleProtection}
          className={`${isProtecting 
            ? 'bg-studio-accent hover:bg-studio-accent/80' 
            : 'bg-[#9b87f5] hover:bg-[#7E69AB]'} transition-all duration-300`}
        >
          {isProtecting ? "Deactivate Guardians" : "Summon Guardian Spirits"}
          <Shield className="ml-2" />
        </Button>
        
        {isProtecting && (
          <p className="text-sm text-studio-clay mt-3">
            Click on each guardian spirit to learn about their protective powers
          </p>
        )}
      </div>
    </div>
  );
};
