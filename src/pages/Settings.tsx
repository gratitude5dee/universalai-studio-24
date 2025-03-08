
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Brain, 
  MessageSquare, 
  Code, 
  Rocket, 
  Heart, 
  Zap, 
  Coffee,
  PenTool,
  Music,
  BookOpen,
  Camera
} from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [agentName, setAgentName] = useState("");
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const personalityTraits = [
    { id: "creative", name: "Creative", icon: PenTool, description: "Thinks outside the box with novel ideas" },
    { id: "analytical", name: "Analytical", icon: Brain, description: "Examines data and provides logical insights" },
    { id: "empathetic", name: "Empathetic", icon: Heart, description: "Understands and responds to emotional context" },
    { id: "enthusiastic", name: "Enthusiastic", icon: Zap, description: "Approaches tasks with energy and optimism" },
    { id: "meticulous", name: "Meticulous", icon: Coffee, description: "Pays close attention to details and accuracy" },
  ];

  const capabilities = [
    { id: "writing", name: "Content Writing", icon: MessageSquare, description: "Creates engaging written content" },
    { id: "coding", name: "Code Generation", icon: Code, description: "Writes and explains programming code" },
    { id: "research", name: "Research", icon: BookOpen, description: "Gathers and synthesizes information" },
    { id: "visual", name: "Visual Creation", icon: Camera, description: "Generates and edits visual content" },
    { id: "audio", name: "Audio Creation", icon: Music, description: "Creates audio content and transcriptions" },
  ];

  const handleTraitSelection = (traitId: string) => {
    if (selectedTraits.includes(traitId)) {
      setSelectedTraits(selectedTraits.filter(t => t !== traitId));
    } else if (selectedTraits.length < 3) {
      setSelectedTraits([...selectedTraits, traitId]);
      // Show magical sparkle animation when trait is selected
      toast("Trait added to your agent's personality!", {
        icon: <Sparkles className="h-4 w-4 text-yellow-400" />,
        position: "top-center"
      });
    } else {
      toast("You can select up to 3 personality traits", {
        icon: "⚠️",
      });
    }
  };

  const handleCapabilitySelection = (capabilityId: string) => {
    if (selectedCapabilities.includes(capabilityId)) {
      setSelectedCapabilities(selectedCapabilities.filter(c => c !== capabilityId));
    } else {
      setSelectedCapabilities([...selectedCapabilities, capabilityId]);
      // Show magical sparkle animation when capability is selected
      toast("New capability added to your agent!", {
        icon: <Zap className="h-4 w-4 text-studio-accent" />,
        position: "top-center"
      });
    }
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    
    // Simulate deployment process
    setTimeout(() => {
      setIsDeploying(false);
      setIsComplete(true);
      toast("Your agent has come to life!", {
        icon: <Sparkles className="h-4 w-4 text-purple-500" />,
        description: `${agentName} is ready to assist you with your creative projects!`,
        duration: 5000,
        position: "top-center"
      });
    }, 3000);
  };

  const nextStep = () => {
    if (currentStep === 1 && !agentName) {
      toast("Please give your agent a name", {
        icon: "⚠️",
      });
      return;
    }
    
    if (currentStep === 2 && selectedTraits.length === 0) {
      toast("Please select at least one personality trait", {
        icon: "⚠️",
      });
      return;
    }
    
    if (currentStep === 3 && selectedCapabilities.length === 0) {
      toast("Please select at least one capability", {
        icon: "⚠️",
      });
      return;
    }
    
    setCurrentStep(currentStep + 1);
    
    if (currentStep === 3) {
      toast("Almost there! Review your agent before bringing it to life", {
        icon: <Sparkles className="h-4 w-4 text-blue-400" />,
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: { type: "tween", ease: "easeIn", duration: 0.2 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 200 }
    }
  };
  
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { 
      repeat: Infinity, 
      duration: 2, 
      ease: "easeInOut" 
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto my-8">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2 flex justify-center items-center gap-2">
            <Sparkles className="h-6 w-6 text-studio-accent" />
            Agent Creation Studio
          </h1>
          <p className="text-muted-foreground">Breathe life into your creative assistant</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8 relative">
          <div className="absolute top-4 left-0 right-0 h-1 bg-studio-sand/30">
            <motion.div 
              className="h-full bg-studio-accent"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep - 1) * 25}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          {[1, 2, 3, 4].map(step => (
            <motion.div 
              key={step}
              className={`z-10 flex flex-col items-center ${currentStep >= step ? 'text-studio-accent' : 'text-studio-clay/30'}`}
              animate={currentStep === step ? { scale: [1, 1.1, 1], transition: { repeat: 0, duration: 0.5 } } : {}}
            >
              <div className={`rounded-full h-8 w-8 flex items-center justify-center mb-2 ${currentStep >= step ? 'bg-studio-accent text-white' : 'bg-studio-sand/30'}`}>
                {step}
              </div>
              <div className="text-sm">
                {step === 1 && "Name"}
                {step === 2 && "Personality"}
                {step === 3 && "Capabilities"}
                {step === 4 && "Review"}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Content based on current step */}
        <motion.div 
          className="glass-card p-8 rounded-3xl min-h-[400px] flex flex-col"
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step 1: Name */}
          {currentStep === 1 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <motion.div 
                className="text-center max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-medium mb-6">What shall we call your assistant?</h2>
                <p className="text-muted-foreground mb-8">This name will be the essence of your agent's identity</p>
                
                <div className="relative max-w-sm mx-auto">
                  <motion.div 
                    className="absolute -top-10 -right-8"
                    animate={{ rotate: [0, 10, 0], y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <Sparkles className="h-8 w-8 text-studio-accent/70" />
                  </motion.div>
                  
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="Enter agent name..."
                    className="w-full px-4 py-3 rounded-xl border border-studio-sand focus:border-studio-accent focus:ring-2 focus:ring-studio-accent/20 focus:outline-none text-lg text-center"
                  />
                </div>
              </motion.div>
            </div>
          )}

          {/* Step 2: Personality Traits */}
          {currentStep === 2 && (
            <div className="flex-1">
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-medium mb-2">Craft {agentName}'s Personality</h2>
                <p className="text-muted-foreground">Select up to 3 personality traits that define your assistant</p>
              </motion.div>
              
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {personalityTraits.map((trait) => (
                  <motion.div
                    key={trait.id}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      selectedTraits.includes(trait.id) 
                        ? 'bg-studio-accent/10 border-2 border-studio-accent' 
                        : 'bg-white/50 border border-studio-sand hover:border-studio-clay'
                    }`}
                    onClick={() => handleTraitSelection(trait.id)}
                    variants={itemVariants}
                    whileHover="hover"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        selectedTraits.includes(trait.id) 
                          ? 'bg-studio-accent/20' 
                          : 'bg-studio-sand/30'
                      }`}>
                        <trait.icon className={`h-5 w-5 ${
                          selectedTraits.includes(trait.id) 
                            ? 'text-studio-accent' 
                            : 'text-studio-clay'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-medium">{trait.name}</h3>
                        <p className="text-sm text-muted-foreground">{trait.description}</p>
                      </div>
                    </div>
                    
                    {selectedTraits.includes(trait.id) && (
                      <motion.div 
                        className="w-full mt-3 h-1 bg-studio-accent/30 rounded-full overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.div 
                          className="h-full bg-studio-accent" 
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Step 3: Capabilities */}
          {currentStep === 3 && (
            <div className="flex-1">
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-medium mb-2">Empower {agentName} with Capabilities</h2>
                <p className="text-muted-foreground">Select the magical powers your assistant will possess</p>
              </motion.div>
              
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {capabilities.map((capability) => (
                  <motion.div
                    key={capability.id}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      selectedCapabilities.includes(capability.id) 
                        ? 'bg-studio-highlight/40 border-2 border-studio-accent' 
                        : 'bg-white/50 border border-studio-sand hover:border-studio-clay'
                    }`}
                    onClick={() => handleCapabilitySelection(capability.id)}
                    variants={itemVariants}
                    whileHover="hover"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        selectedCapabilities.includes(capability.id) 
                          ? 'bg-studio-highlight/50' 
                          : 'bg-studio-sand/30'
                      }`}>
                        <capability.icon className={`h-5 w-5 ${
                          selectedCapabilities.includes(capability.id) 
                            ? 'text-studio-accent' 
                            : 'text-studio-clay'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-medium">{capability.name}</h3>
                        <p className="text-sm text-muted-foreground">{capability.description}</p>
                      </div>
                    </div>
                    
                    {selectedCapabilities.includes(capability.id) && (
                      <motion.div 
                        className="w-full mt-3 flex justify-center overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.div 
                          className="flex space-x-1" 
                          animate={{ 
                            scale: [1, 1.1, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 2, 
                            ease: "easeInOut" 
                          }}
                        >
                          {[1, 2, 3].map(i => (
                            <div 
                              key={i} 
                              className="h-1 w-1 rounded-full bg-studio-accent" 
                            />
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Step 4: Review & Finalize */}
          {currentStep === 4 && (
            <div className="flex-1 flex flex-col">
              <motion.div 
                className="text-center mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-medium mb-2">Review Your Creation</h2>
                <p className="text-muted-foreground">
                  {isComplete 
                    ? `${agentName} is ready to assist you!` 
                    : `${agentName} is ready to come to life!`
                  }
                </p>
              </motion.div>
              
              <div className="flex-1 flex flex-col md:flex-row gap-6">
                <motion.div 
                  className="flex-1 bg-white/70 rounded-2xl p-5 border border-studio-sand"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Heart className="h-4 w-4 text-studio-accent" />
                    Personality
                  </h3>
                  <div className="space-y-2">
                    {selectedTraits.length > 0 ? (
                      selectedTraits.map(traitId => {
                        const trait = personalityTraits.find(t => t.id === traitId)!;
                        return (
                          <div key={traitId} className="flex items-center gap-2 text-sm">
                            <trait.icon className="h-4 w-4 text-studio-clay" />
                            <span>{trait.name}</span>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-sm text-muted-foreground">No traits selected</p>
                    )}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex-1 bg-white/70 rounded-2xl p-5 border border-studio-sand"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-studio-accent" />
                    Capabilities
                  </h3>
                  <div className="space-y-2">
                    {selectedCapabilities.length > 0 ? (
                      selectedCapabilities.map(capabilityId => {
                        const capability = capabilities.find(c => c.id === capabilityId)!;
                        return (
                          <div key={capabilityId} className="flex items-center gap-2 text-sm">
                            <capability.icon className="h-4 w-4 text-studio-clay" />
                            <span>{capability.name}</span>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-sm text-muted-foreground">No capabilities selected</p>
                    )}
                  </div>
                </motion.div>
              </div>
              
              {isComplete ? (
                <motion.div 
                  className="mt-8 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <div className="glass-card-dark inline-block p-6 rounded-2xl mb-4">
                    <motion.div
                      className="relative"
                      animate={pulseAnimation}
                    >
                      <div className="w-24 h-24 mx-auto bg-studio-highlight rounded-full flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                        >
                          <Sparkles className="h-12 w-12 text-studio-accent" />
                        </motion.div>
                      </div>
                      
                      <motion.div 
                        className="absolute -top-1 -right-1"
                        animate={{ 
                          rotate: [0, 10, 0], 
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 3,
                          repeatType: "reverse" 
                        }}
                      >
                        <div className="h-5 w-5 rounded-full bg-pink-400 flex items-center justify-center text-white text-xs">
                          ✨
                        </div>
                      </motion.div>
                    </motion.div>
                    
                    <h3 className="text-xl mt-4 text-white">
                      {agentName} is Alive!
                    </h3>
                  </div>
                  
                  <p className="text-studio-charcoal">Your creative assistant is ready to help with your projects</p>
                  
                  <Button 
                    className="mt-4 bg-studio-accent hover:bg-studio-accent/80"
                    onClick={() => window.location.href = '/'}
                  >
                    Start Creating Together
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  className="mt-8 flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button 
                    size="lg"
                    className="bg-studio-accent hover:bg-studio-accent/80"
                    onClick={handleDeploy}
                    disabled={isDeploying}
                  >
                    {isDeploying ? (
                      <>
                        <motion.div 
                          className="mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                          <Sparkles className="h-4 w-4" />
                        </motion.div>
                        Bringing {agentName} to Life...
                      </>
                    ) : (
                      <>
                        <Rocket className="mr-2 h-4 w-4" />
                        Bring {agentName} to Life
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </div>
          )}
          
          {/* Navigation Buttons */}
          {!isComplete && (
            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1 || isDeploying}
                className="border-studio-sand"
              >
                Back
              </Button>
              
              {currentStep < 4 && (
                <Button 
                  onClick={nextStep}
                  className="bg-studio-clay hover:bg-studio-clay/80"
                  disabled={isDeploying}
                >
                  Next
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
