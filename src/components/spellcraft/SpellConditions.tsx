
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Plus, Trash2, Wand2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface SpellConditionProps {
  onSubmit: (conditions: {id: string; type: string; value: string}[]) => void;
}

const SpellConditions: React.FC<SpellConditionProps> = ({ onSubmit }) => {
  const [conditions, setConditions] = useState<{id: string; type: string; value: string}[]>([
    { id: "1", type: "time_limit", value: "" },
  ]);
  
  const [showMagicalEffect, setShowMagicalEffect] = useState(false);
  
  const conditionTypes = [
    { value: "time_limit", label: "Time Limitation" },
    { value: "usage_limit", label: "Usage Limitation" },
    { value: "geographical", label: "Geographical Boundary" },
    { value: "payment_trigger", label: "Payment Trigger" },
    { value: "audience", label: "Audience Restriction" },
  ];
  
  const addCondition = () => {
    setConditions([
      ...conditions,
      { id: Math.random().toString(36).substr(2, 9), type: "time_limit", value: "" },
    ]);
  };
  
  const removeCondition = (id: string) => {
    setConditions(conditions.filter((condition) => condition.id !== id));
  };
  
  const updateCondition = (id: string, field: "type" | "value", value: string) => {
    setConditions(
      conditions.map((condition) => 
        condition.id === id ? { ...condition, [field]: value } : condition
      )
    );
    
    if (field === "value" && value.length > 0 && Math.random() > 0.6) {
      triggerMagicalEffect();
    }
  };
  
  const triggerMagicalEffect = () => {
    setShowMagicalEffect(true);
    setTimeout(() => setShowMagicalEffect(false), 2000);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that all conditions have values
    const isValid = conditions.every((condition) => condition.value.trim() !== "");
    
    if (isValid) {
      triggerMagicalEffect();
      onSubmit(conditions);
      
      toast({
        title: "Conditions woven successfully!",
        description: "Your magical conditions have been bound to the contract.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incomplete spell conditions",
        description: "All magical conditions must be completed before proceeding.",
        variant: "destructive",
      });
    }
  };
  
  const getPlaceholder = (type: string) => {
    switch (type) {
      case "time_limit":
        return "e.g., Expires after 1 year";
      case "usage_limit":
        return "e.g., Maximum 100 uses";
      case "geographical":
        return "e.g., Only in North America";
      case "payment_trigger":
        return "e.g., Payment due upon each download";
      case "audience":
        return "e.g., Adults over 18 years only";
      default:
        return "Enter condition details...";
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8 relative">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Weave Your Spell Conditions</h2>
        <p className="text-studio-clay">
          Define magical boundaries and triggers that activate your contract
        </p>
      </div>
      
      {/* Floating magical effect */}
      {showMagicalEffect && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-studio-accent/5 rounded-xl overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-studio-accent rounded-full"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0] 
                }}
                transition={{ 
                  duration: 1.5,
                  delay: Math.random() * 1
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
      
      <div className="space-y-4">
        <AnimatePresence>
          {conditions.map((condition, index) => (
            <motion.div
              key={condition.id}
              className={cn(
                "p-4 rounded-lg border",
                index % 2 === 0 ? "bg-studio-sand/10" : "bg-studio-accent/5"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Condition {index + 1}</h3>
                {conditions.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCondition(condition.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`condition-type-${condition.id}`}>Condition Type</Label>
                  <Select
                    value={condition.type}
                    onValueChange={(value) => updateCondition(condition.id, "type", value)}
                  >
                    <SelectTrigger id={`condition-type-${condition.id}`}>
                      <SelectValue placeholder="Select condition type" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`condition-value-${condition.id}`}>Condition Value</Label>
                  <div className="relative">
                    <Input
                      id={`condition-value-${condition.id}`}
                      value={condition.value}
                      onChange={(e) => updateCondition(condition.id, "value", e.target.value)}
                      placeholder={getPlaceholder(condition.type)}
                    />
                    <Wand2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-studio-clay" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <Button
          type="button"
          variant="outline"
          className="w-full border-dashed"
          onClick={addCondition}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Another Condition
        </Button>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" className="bg-studio-accent hover:bg-studio-accent/90">
          Bind Conditions <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default SpellConditions;
