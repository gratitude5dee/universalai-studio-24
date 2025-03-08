
import React from "react";
import { motion } from "framer-motion";
import { Book, Coins, FileText, Shield, Zap } from "lucide-react";

interface SpellTemplateProps {
  onSelectTemplate: (id: string, name: string) => void;
}

const SpellTemplates: React.FC<SpellTemplateProps> = ({ onSelectTemplate }) => {
  const templates = [
    {
      id: "license",
      name: "License Enchantment",
      description: "Grant others permission to use your creation under specific terms.",
      icon: FileText,
      color: "from-purple-400 to-indigo-500",
    },
    {
      id: "royalty",
      name: "Royalty Conjuration",
      description: "Generate income whenever your creation is used by others.",
      icon: Coins,
      color: "from-amber-400 to-orange-500",
    },
    {
      id: "access",
      name: "Access Ward",
      description: "Control who can view or use your creation with magical protection.",
      icon: Shield,
      color: "from-emerald-400 to-teal-500",
    },
    {
      id: "usage",
      name: "Usage Tracker",
      description: "See when and how your creation is being used in the digital realm.",
      icon: Zap,
      color: "from-blue-400 to-sky-500",
    },
    {
      id: "custom",
      name: "Arcane Custom Spell",
      description: "Craft a completely unique contract with your own terms and conditions.",
      icon: Book,
      color: "from-rose-400 to-pink-500",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-8">Select Your Spell Template</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            className={`relative rounded-xl overflow-hidden cursor-pointer`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectTemplate(template.id, template.name)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-80`} />
            
            <div className="relative p-6 flex flex-col h-full min-h-[200px]">
              <div className="bg-white/30 rounded-full p-3 mb-4 w-fit">
                <template.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
              <p className="text-white/80 mb-4">{template.description}</p>
              
              <div className="mt-auto">
                <span className="inline-flex items-center bg-white/20 rounded-full px-3 py-1 text-sm text-white">
                  Select Template
                </span>
              </div>
            </div>
            
            {/* Magical sparkles */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  animate={{
                    x: [0, Math.random() * 100],
                    y: [0, Math.random() * 100],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SpellTemplates;
