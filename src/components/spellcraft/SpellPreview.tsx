
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, FileText, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface SpellPreviewProps {
  spellData: {
    templateId: string;
    templateName: string;
    name: string;
    description: string;
    ingredients: {
      [key: string]: string;
    };
    conditions: {
      id: string;
      type: string;
      value: string;
    }[];
  };
  onDeploy: () => void;
}

const SpellPreview: React.FC<SpellPreviewProps> = ({ spellData, onDeploy }) => {
  const [view, setView] = useState<"visual" | "code">("visual");
  const [isReviewing, setIsReviewing] = useState(false);
  
  const handleReviewComplete = () => {
    setIsReviewing(true);
    
    // Simulate review process
    setTimeout(() => {
      setIsReviewing(false);
      
      // Trigger confetti celebration
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    }, 1500);
  };
  
  const getConditionLabel = (type: string) => {
    switch (type) {
      case "time_limit": return "Time Limitation";
      case "usage_limit": return "Usage Limitation";
      case "geographical": return "Geographical Boundary";
      case "payment_trigger": return "Payment Trigger";
      case "audience": return "Audience Restriction";
      default: return type;
    }
  };
  
  const renderVisualPreview = () => (
    <div className="relative overflow-hidden bg-studio-sand/10 rounded-xl p-6 min-h-[400px]">
      <div className="absolute top-0 right-0 bg-studio-accent/10 p-3 rounded-bl-xl">
        <span className="text-sm font-medium text-studio-accent">
          {spellData.templateName}
        </span>
      </div>
      
      <div className="mb-8 relative">
        <motion.div 
          className="absolute -left-4 -top-4 w-16 h-16 bg-studio-accent/20 rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <h3 className="text-2xl font-bold mb-2 relative">{spellData.name}</h3>
        <p className="text-studio-clay">{spellData.description}</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-3 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-studio-accent" />
            Spell Ingredients
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(spellData.ingredients).map(([key, value]) => (
              <div key={key} className="bg-white/50 p-3 rounded-lg">
                <span className="text-xs uppercase text-studio-clay">{key.replace("_", " ")}</span>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-3 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-studio-accent" />
            Spell Conditions
          </h4>
          <div className="space-y-2">
            {spellData.conditions.map((condition) => (
              <div key={condition.id} className="bg-white/50 p-3 rounded-lg">
                <span className="text-xs uppercase text-studio-clay">{getConditionLabel(condition.type)}</span>
                <p className="font-medium">{condition.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 opacity-10 -mr-10 -mb-10">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
  
  const renderCodePreview = () => (
    <div className="bg-studio-charcoal text-studio-cream font-mono text-sm p-6 rounded-xl overflow-auto max-h-[500px]">
      <pre>{`// ${spellData.templateName}
const ${spellData.name.replace(/\s+/g, '')} = {
  name: "${spellData.name}",
  description: "${spellData.description}",
  creator: "${spellData.ingredients.creator || 'Anonymous'}",
  duration: "${spellData.ingredients.duration || 'Perpetual'}",
  
  // Additional ingredients
${Object.entries(spellData.ingredients)
  .filter(([key]) => !['creator', 'duration'].includes(key))
  .map(([key, value]) => `  ${key}: "${value}"`)
  .join(',\n')
}${Object.entries(spellData.ingredients).filter(([key]) => !['creator', 'duration'].includes(key)).length ? ',' : ''}
  
  // Conditions
  conditions: [
${spellData.conditions.map(condition => `    {
      type: "${condition.type}",
      value: "${condition.value}"
    }`).join(',\n')}
  ],
  
  // Methods
  activate: function() {
    console.log("Contract activated: ${spellData.name}");
    // Trigger activation logic
    return true;
  },
  
  verify: function(action) {
    // Verify against all conditions
    const allConditionsMet = this.conditions.every(condition => {
      // Simplified verification logic
      return true; 
    });
    
    return allConditionsMet;
  }
};

// Deploy the contract
deployContract(${spellData.name.replace(/\s+/g, '')});`}</pre>
    </div>
  );
  
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Preview Your Spell</h2>
        <p className="text-studio-clay">
          Behold your creation before sending it forth into the digital realm
        </p>
      </div>
      
      <div className="flex justify-center space-x-4 mb-6">
        <Button
          variant={view === "visual" ? "default" : "outline"}
          onClick={() => setView("visual")}
          className="min-w-24"
        >
          Visual
        </Button>
        <Button
          variant={view === "code" ? "default" : "outline"}
          onClick={() => setView("code")}
          className="min-w-24"
        >
          Code
        </Button>
      </div>
      
      {view === "visual" ? renderVisualPreview() : renderCodePreview()}
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleReviewComplete} disabled={isReviewing}>
          {isReviewing ? (
            <>
              <motion.div 
                className="mr-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </motion.div>
              Reviewing...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" /> Mark as Reviewed
            </>
          )}
        </Button>
        
        <Button onClick={onDeploy} className="bg-studio-accent hover:bg-studio-accent/90">
          Prepare for Deployment <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SpellPreview;
