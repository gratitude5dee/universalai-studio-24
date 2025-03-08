
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileSparkles, Sparkles, Truck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AssetJourney = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const steps = [
    { 
      title: "Select Digital Asset", 
      icon: FileSparkles,
      description: "Choose your digital creation to manifest in the physical realm"
    },
    { 
      title: "Crossing the Bridge", 
      icon: Sparkles,
      description: "Your creation traverses the boundary between worlds"
    },
    { 
      title: "Physical Manifestation", 
      icon: Truck,
      description: "Your digital asset takes physical form"
    },
    { 
      title: "Completion", 
      icon: CheckCircle2,
      description: "The bridge crossing is complete"
    }
  ];
  
  const startJourney = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    
    // Animate through the steps
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsAnimating(false), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);
    
    return () => clearInterval(interval);
  };

  return (
    <div className="space-y-8">
      <div className="relative h-20 max-w-3xl mx-auto">
        {/* Journey path */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-studio-sand/50 -translate-y-1/2 rounded-full" />
        
        {/* Progress indicator */}
        <motion.div 
          className="absolute top-1/2 left-0 h-1 bg-[#9b87f5] -translate-y-1/2 rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isAnimating ? currentStep / (steps.length - 1) : 0 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Steps */}
        <div className="absolute top-0 left-0 w-full flex justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = currentStep >= index;
            const isCurrentStep = currentStep === index;
            
            return (
              <div key={index} className="relative">
                {/* Step circle */}
                <motion.div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${isActive ? 'bg-[#9b87f5]' : 'bg-studio-sand/50'}`}
                  animate={{
                    scale: isCurrentStep && isAnimating ? [1, 1.2, 1] : 1,
                    boxShadow: isCurrentStep && isAnimating 
                      ? ['0 0 0 0 rgba(155, 135, 245, 0)', '0 0 0 10px rgba(155, 135, 245, 0.3)', '0 0 0 0 rgba(155, 135, 245, 0)'] 
                      : '0 0 0 0 rgba(155, 135, 245, 0)'
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isCurrentStep && isAnimating ? Infinity : 0,
                    repeatDelay: 0.5
                  }}
                >
                  <StepIcon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-studio-charcoal/50'}`} />
                </motion.div>
                
                {/* Step label */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-32 text-center">
                  <p className={`text-sm font-medium ${isActive ? 'text-studio-charcoal' : 'text-studio-charcoal/50'}`}>
                    {step.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Step description */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentStep}
          className="text-center max-w-lg mx-auto bg-white/70 p-6 rounded-xl shadow-subtle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-medium mb-2 text-studio-charcoal">
            {steps[currentStep].title}
          </h3>
          <p className="text-studio-clay">{steps[currentStep].description}</p>
        </motion.div>
      </AnimatePresence>
      
      {/* Journey animation */}
      <div className="relative max-w-md mx-auto h-52 mt-8 glass-card overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPHBhdHRlcm4KICAgICAgaWQ9InBhdHRlcm4iCiAgICAgIHdpZHRoPSI0MCIKICAgICAgaGVpZ2h0PSI0MCIKICAgICAgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSIKICAgID4KICAgICAgPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjMpIiAvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiAvPgo8L3N2Zz4=')]" />
        
        {isAnimating && (
          <motion.div 
            className="absolute top-1/2 left-0 w-16 h-16 -mt-8 flex items-center justify-center"
            animate={{
              x: ['0%', '100%'],
              y: [0, -20, 0, 20, 0],
              rotate: [0, 10, 0, -10, 0]
            }}
            transition={{
              x: { duration: 10, times: [0, 1] },
              y: { duration: 5, repeat: 2, ease: "easeInOut" },
              rotate: { duration: 2.5, repeat: 4, ease: "easeInOut" }
            }}
          >
            <motion.div 
              className="w-12 h-12 rounded bg-gradient-to-br from-[#D946EF] to-[#8B5CF6]"
              animate={{
                scale: [1, 1.2, 0.8, 1],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{
                duration: 10, 
                times: [0, 0.25, 0.5, 0.75, 1]
              }}
            />
            
            {/* Sparkle trail */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white/80"
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 0
                }}
                animate={{
                  x: [0, -30 - i * 5],
                  y: [0, (Math.random() - 0.5) * 20],
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <Button 
          size="lg" 
          onClick={startJourney} 
          disabled={isAnimating}
          className="bg-[#9b87f5] hover:bg-[#7E69AB] disabled:bg-[#7E69AB]/50"
        >
          {isAnimating ? "Journey in Progress..." : "Start Journey"}
          <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};
