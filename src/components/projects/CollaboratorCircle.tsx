
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const CollaboratorCircle = () => {
  const collaborators = [
    { 
      name: "Alex", 
      role: "Visual Artist",
      contribution: "Illustrations and color palette",
      skills: ["Design", "Illustration"]
    },
    { 
      name: "Morgan", 
      role: "Writer",
      contribution: "Narrative and characters",
      skills: ["Storytelling", "Editing"]
    },
    { 
      name: "Jordan", 
      role: "Developer",
      contribution: "Interactive elements",
      skills: ["Coding", "Animation"]
    },
    { 
      name: "You", 
      role: "Project Lead",
      contribution: "Vision and coordination",
      skills: ["Leadership", "Strategy"]
    }
  ];

  return (
    <div className="relative h-[200px] rounded-xl overflow-hidden flex items-center justify-center">
      {collaborators.map((collaborator, index) => {
        // Calculate position in the circle
        const angle = (index * 2 * Math.PI) / collaborators.length;
        const radius = collaborator.name === "You" ? 0 : 70;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={index}
            className="absolute flex flex-col items-center"
            initial={{ x, y, opacity: 0 }}
            animate={{ 
              x, 
              y,
              opacity: 1,
              transition: { delay: index * 0.2, duration: 0.5 }
            }}
            whileHover={{ scale: 1.1, zIndex: 10 }}
          >
            <div 
              className={`p-2 w-16 h-16 rounded-full flex items-center justify-center font-medium text-white
                ${collaborator.name === "You" ? 'bg-studio-accent' : 'bg-studio-clay/70'}`}
            >
              <div className="text-center">
                <div className="text-sm font-bold">{collaborator.name}</div>
                <div className="text-xs opacity-80">{collaborator.role}</div>
              </div>
            </div>
            {collaborator.name !== "You" && (
              <motion.div 
                className="h-[70px] w-[2px] absolute top-16 opacity-40"
                style={{ 
                  background: 'linear-gradient(to bottom, rgba(217, 143, 100, 0.7), rgba(217, 143, 100, 0.1))',
                  transformOrigin: 'top',
                  rotate: `${angle * (180/Math.PI)}deg`
                }}
              />
            )}
          </motion.div>
        );
      })}
      
      <motion.div 
        className="absolute w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-md"
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
  );
};

export default CollaboratorCircle;
