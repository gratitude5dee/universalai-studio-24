
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const CollaboratorEcosystem = () => {
  const collaborators = [
    { 
      name: "You", 
      role: "Creator",
      contribution: "Original work and concept",
      share: 70
    },
    { 
      name: "Alex Rivera", 
      role: "Collaborator",
      contribution: "Visual enhancements",
      share: 15
    },
    { 
      name: "Sam Taylor", 
      role: "Collaborator",
      contribution: "Narrative support",
      share: 15
    }
  ];

  return (
    <div className="space-y-3">
      <div className="relative h-[180px] p-4 rounded-xl bg-studio-sand/20 overflow-hidden flex items-center justify-center">
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
                className={`w-16 h-16 rounded-full flex items-center justify-center font-medium
                  ${index === 0 ? 'bg-studio-accent text-white' : 'bg-studio-sand/50 text-studio-charcoal'}`}
              >
                {collaborator.share}%
              </div>
              <span className="text-xs font-medium mt-1">{collaborator.name}</span>
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
          <Sparkles size={14} className="text-studio-accent" />
        </motion.div>
      </div>
      
      <div className="text-center">
        <motion.button 
          className="text-sm text-studio-accent"
          whileHover={{ scale: 1.05 }}
        >
          Modify collaborator ecosystem
        </motion.button>
      </div>
    </div>
  );
};

export default CollaboratorEcosystem;
