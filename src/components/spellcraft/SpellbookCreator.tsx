
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpellTemplates from "./SpellTemplates";
import SpellIngredientsForm from "./SpellIngredientsForm";
import SpellConditions from "./SpellConditions";
import SpellPreview from "./SpellPreview";
import SpellDeployment from "./SpellDeployment";

type SpellData = {
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

const SpellbookCreator = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [spellData, setSpellData] = useState<SpellData>({
    templateId: "",
    templateName: "",
    name: "",
    description: "",
    ingredients: {},
    conditions: [],
  });
  
  const handleTabChange = (value: string) => {
    // Add a small delay to allow for animations
    setTimeout(() => setActiveTab(value), 100);
  };
  
  const handleTemplateSelect = (templateId: string, templateName: string) => {
    setSpellData({
      ...spellData,
      templateId,
      templateName,
    });
    handleTabChange("ingredients");
  };
  
  const handleIngredientsSubmit = (name: string, description: string, ingredients: {[key: string]: string}) => {
    setSpellData({
      ...spellData,
      name,
      description,
      ingredients,
    });
    handleTabChange("conditions");
  };
  
  const handleConditionsSubmit = (conditions: {id: string; type: string; value: string}[]) => {
    setSpellData({
      ...spellData,
      conditions,
    });
    handleTabChange("preview");
  };
  
  return (
    <div className="glass-card p-6 relative overflow-hidden">
      {/* Magical floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-studio-accent/30"
            animate={{
              x: [Math.random() * 100, Math.random() * 100 + 400],
              y: [Math.random() * 100, Math.random() * 100 + 400],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="relative z-10">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="templates" className="data-[state=active]:bg-studio-accent data-[state=active]:text-white">
            Choose Spell
          </TabsTrigger>
          <TabsTrigger value="ingredients" className="data-[state=active]:bg-studio-accent data-[state=active]:text-white" disabled={!spellData.templateId}>
            Ingredients
          </TabsTrigger>
          <TabsTrigger value="conditions" className="data-[state=active]:bg-studio-accent data-[state=active]:text-white" disabled={!spellData.name}>
            Conditions
          </TabsTrigger>
          <TabsTrigger value="preview" className="data-[state=active]:bg-studio-accent data-[state=active]:text-white" disabled={spellData.conditions.length === 0}>
            Preview
          </TabsTrigger>
          <TabsTrigger value="deploy" className="data-[state=active]:bg-studio-accent data-[state=active]:text-white" disabled={activeTab !== "preview"}>
            Deployment
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="mt-0">
          <SpellTemplates onSelectTemplate={handleTemplateSelect} />
        </TabsContent>
        
        <TabsContent value="ingredients" className="mt-0">
          <SpellIngredientsForm 
            templateName={spellData.templateName}
            onSubmit={handleIngredientsSubmit}
          />
        </TabsContent>
        
        <TabsContent value="conditions" className="mt-0">
          <SpellConditions onSubmit={handleConditionsSubmit} />
        </TabsContent>
        
        <TabsContent value="preview" className="mt-0">
          <SpellPreview 
            spellData={spellData} 
            onDeploy={() => handleTabChange("deploy")}
          />
        </TabsContent>
        
        <TabsContent value="deploy" className="mt-0">
          <SpellDeployment spellData={spellData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SpellbookCreator;
