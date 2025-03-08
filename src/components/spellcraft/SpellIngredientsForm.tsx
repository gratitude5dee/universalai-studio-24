
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface SpellIngredientsFormProps {
  templateName: string;
  onSubmit: (name: string, description: string, ingredients: {[key: string]: string}) => void;
}

const SpellIngredientsForm: React.FC<SpellIngredientsFormProps> = ({ templateName, onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<{[key: string]: string}>({
    creator: "",
    duration: "",
    payment: "",
  });
  
  const handleIngredientChange = (key: string, value: string) => {
    setIngredients({
      ...ingredients,
      [key]: value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, description, ingredients);
  };
  
  // Dynamically determine required ingredients based on template type
  const getIngredientFields = () => {
    const baseIngredients = [
      {
        id: "creator",
        label: "Creator's True Name",
        placeholder: "Your magical identifier",
        description: "Your name as it will appear in the magical contract",
      },
      {
        id: "duration",
        label: "Duration of the Enchantment",
        placeholder: "e.g., 1 year, perpetual, until the next full moon",
        description: "How long will this magical contract be in effect?",
      },
    ];
    
    // Add template-specific ingredients
    switch (templateName) {
      case "License Enchantment":
        return [
          ...baseIngredients,
          {
            id: "usage",
            label: "Permitted Uses",
            placeholder: "e.g., personal, commercial, educational",
            description: "How may others use your creation?",
          },
          {
            id: "attribution",
            label: "Attribution Requirements",
            placeholder: "e.g., must credit original creator",
            description: "How should others credit you?",
          },
        ];
      case "Royalty Conjuration":
        return [
          ...baseIngredients,
          {
            id: "payment",
            label: "Payment Essence",
            placeholder: "e.g., 5% of revenue, $10 per use",
            description: "What payment will you receive for each use?",
          },
          {
            id: "frequency",
            label: "Payment Frequency",
            placeholder: "e.g., monthly, quarterly, per use",
            description: "How often will you receive payment?",
          },
        ];
      default:
        return baseIngredients;
    }
  };
  
  const ingredientFields = getIngredientFields();
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">{templateName} Ingredients</h2>
        <p className="text-studio-clay">
          Combine the perfect ingredients to craft your magical contract
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 md:col-span-2">
          <div className="space-y-2">
            <Label htmlFor="spell-name">Spell Name</Label>
            <div className="relative">
              <Input
                id="spell-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name your magical contract..."
                className="pl-10"
                required
              />
              <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-studio-accent" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="spell-description">Spell Description</Label>
            <Textarea
              id="spell-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this magical contract will do..."
              className="min-h-20"
              required
            />
          </div>
        </div>
        
        {ingredientFields.map((field) => (
          <motion.div 
            key={field.id}
            className="space-y-2 bg-studio-sand/10 p-4 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              value={ingredients[field.id] || ""}
              onChange={(e) => handleIngredientChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              required
            />
            <p className="text-xs text-studio-clay mt-1">{field.description}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" className="bg-studio-accent hover:bg-studio-accent/90">
          Mix Ingredients <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default SpellIngredientsForm;
