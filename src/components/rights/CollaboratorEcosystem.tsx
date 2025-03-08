
import { motion } from "framer-motion";
import { Sparkles, UserPlus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const CollaboratorEcosystem = () => {
  const collaborators = [
    { 
      name: "You", 
      role: "Creator",
      contribution: "Original work and concept",
      share: 70,
      color: "#9b87f5"
    },
    { 
      name: "Alex Rivera", 
      role: "Collaborator",
      contribution: "Visual enhancements",
      share: 15,
      color: "#33C3F0"
    },
    { 
      name: "Sam Taylor", 
      role: "Collaborator",
      contribution: "Narrative support",
      share: 15,
      color: "#F97316"
    }
  ];

  return (
    <div className="space-y-3">
      <div className="relative h-[180px] p-4 rounded-xl bg-[#F1F0FB] overflow-hidden flex items-center justify-center">
        {collaborators.map((collaborator, index) => {
          // Calculate position in the ecosystem
          const angle = (index * 2 * Math.PI) / collaborators.length;
          const radius = 60;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          // Scale circle based on share percentage
          const scale = 0.5 + (collaborator.share / 100) * 0.5;
          
          return (
            <motion.div
              key={index}
              className="absolute flex flex-col items-center"
              initial={{ x, y, scale, opacity: 0 }}
              animate={{ 
                x, 
                y, 
                scale,
                opacity: 1,
                transition: { delay: index * 0.2, duration: 0.5 }
              }}
              whileHover={{ scale: scale * 1.1, zIndex: 10 }}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center font-medium text-white"
                style={{ backgroundColor: collaborator.color }}
              >
                {collaborator.share}%
              </div>
              <span className="text-xs font-medium mt-2">{collaborator.name}</span>
              <span className="text-[10px] text-studio-clay">{collaborator.role}</span>
            </motion.div>
          );
        })}
        
        <motion.div 
          className="absolute w-6 h-6 flex items-center justify-center rounded-full bg-white"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        >
          <Sparkles size={14} className="text-[#9b87f5]" />
        </motion.div>
        
        {/* Connection lines between collaborators */}
        <svg className="absolute inset-0 w-full h-full z-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9b87f5" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#9b87f5" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          {collaborators.map((_, i) => {
            // Calculate positions for drawing lines between circles
            const startAngle = (i * 2 * Math.PI) / collaborators.length;
            const endAngle = ((i + 1) * 2 * Math.PI) / collaborators.length;
            const radius = 60;
            
            const x1 = Math.cos(startAngle) * radius + 90;
            const y1 = Math.sin(startAngle) * radius + 90;
            const x2 = Math.cos(endAngle) * radius + 90;
            const y2 = Math.sin(endAngle) * radius + 90;
            
            return (
              <motion.line
                key={`line-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              />
            );
          })}
        </svg>
      </div>
      
      <div className="flex justify-between mt-3">
        <motion.button 
          className="text-sm text-[#9b87f5] flex items-center gap-1"
          whileHover={{ scale: 1.05 }}
        >
          <UserPlus size={14} />
          Add Collaborator
        </motion.button>
        
        <motion.button 
          className="text-sm text-[#9b87f5] flex items-center gap-1"
          whileHover={{ scale: 1.05 }}
        >
          <Settings size={14} />
          Edit Ecosystem
        </motion.button>
      </div>
    </div>
  );
};

export default CollaboratorEcosystem;
