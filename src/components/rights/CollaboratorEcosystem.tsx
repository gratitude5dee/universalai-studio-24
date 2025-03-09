
import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, UserPlus, Settings, Info, ChevronRight, User, Shield, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const CollaboratorEcosystem = () => {
  const [showCollaboratorDetails, setShowCollaboratorDetails] = useState<string | null>(null);
  
  const collaborators = [
    { 
      id: "you",
      name: "You", 
      role: "Creator",
      contribution: "Original work and concept",
      share: 70,
      color: "#9b87f5",
      details: "Primary rights holder with veto power on major decisions. Responsible for core creation, concept development, and creative direction."
    },
    { 
      id: "alex",
      name: "Alex Rivera", 
      role: "Collaborator",
      contribution: "Visual enhancements",
      share: 15,
      color: "#33C3F0",
      details: "Secondary rights holder contributing visual elements, styling, and design aesthetics. Retains approval rights for visual modifications."
    },
    { 
      id: "sam",
      name: "Sam Taylor", 
      role: "Collaborator",
      contribution: "Narrative support",
      share: 15,
      color: "#F97316",
      details: "Secondary rights holder contributing narrative structure, storytelling elements, and character development. Retains approval rights for story modifications."
    }
  ];
  
  const toggleCollaboratorDetails = (id: string) => {
    if (showCollaboratorDetails === id) {
      setShowCollaboratorDetails(null);
    } else {
      setShowCollaboratorDetails(id);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative h-[220px] p-4 rounded-xl bg-[#F1F0FB] overflow-hidden flex items-center justify-center">
        {/* Lines connecting collaborators */}
        <svg className="absolute inset-0 w-full h-full z-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9b87f5" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#9b87f5" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <motion.line 
            x1="90" 
            y1="110" 
            x2="210" 
            y2="70" 
            stroke="url(#lineGradient)" 
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
          <motion.line 
            x1="90" 
            y1="110" 
            x2="210" 
            y2="150" 
            stroke="url(#lineGradient)" 
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          />
          <motion.line 
            x1="210" 
            y1="70" 
            x2="210" 
            y2="150" 
            stroke="url(#lineGradient)" 
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
        </svg>
        
        {/* Collaboration center sphere */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#9b87f5]/30 bg-white z-10"
          animate={{ 
            scale: [1, 1.1, 1],
            boxShadow: [
              "0px 0px 0px 0px rgba(155, 135, 245, 0.3)",
              "0px 0px 15px 3px rgba(155, 135, 245, 0.3)",
              "0px 0px 0px 0px rgba(155, 135, 245, 0.3)"
            ]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        >
          <Shield size={18} className="text-[#9b87f5]" />
        </motion.div>
        
        {/* Collaborators */}
        {collaborators.map((collaborator, index) => {
          // Calculate position in the ecosystem
          let x, y;
          
          // Custom positions
          if (index === 0) { // You (Creator)
            x = 90;
            y = 110;
          } else if (index === 1) { // Alex
            x = 210;
            y = 70;
          } else { // Sam
            x = 210;
            y = 150;
          }
          
          // Scale circle based on share percentage
          const scale = 0.5 + (collaborator.share / 100) * 0.6;
          
          return (
            <motion.div
              key={collaborator.id}
              className="absolute flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                x,
                y,
                transition: { delay: index * 0.2, duration: 0.5 }
              }}
              style={{ 
                left: 0,
                top: 0,
                transform: `translate(${x}px, ${y}px) scale(${scale})` 
              }}
              whileHover={{ scale: scale * 1.1, zIndex: 30 }}
            >
              <motion.div 
                className="relative w-16 h-16 rounded-full flex items-center justify-center font-medium text-white cursor-pointer"
                style={{ backgroundColor: collaborator.color }}
                onClick={() => toggleCollaboratorDetails(collaborator.id)}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm">{collaborator.share}%</span>
                <motion.div 
                  className="absolute -right-1 -top-1 w-5 h-5 rounded-full bg-white flex items-center justify-center border border-studio-sand"
                  whileHover={{ scale: 1.2 }}
                >
                  <Info size={10} className="text-studio-charcoal" />
                </motion.div>
              </motion.div>
              <div className="flex flex-col items-center mt-2">
                <span className="text-xs font-medium whitespace-nowrap">{collaborator.name}</span>
                <span className="text-[10px] text-studio-clay whitespace-nowrap">{collaborator.role}</span>
              </div>
            </motion.div>
          );
        })}
        
        {/* Add collaborator button positioned at bottom right */}
        <motion.div
          className="absolute bottom-4 right-4 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Button size="sm" variant="outline" className="bg-white">
            <UserPlus size={14} className="mr-1" />
            Add
          </Button>
        </motion.div>
      </div>
      
      {/* Collaborator details expanded view */}
      {showCollaboratorDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 bg-white border border-studio-sand/30 rounded-lg"
        >
          {collaborators.filter(c => c.id === showCollaboratorDetails).map(collaborator => (
            <div key={collaborator.id} className="space-y-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: collaborator.color }}
                >
                  <User size={14} className="text-white" />
                </div>
                <div>
                  <h3 className="font-medium">{collaborator.name}</h3>
                  <p className="text-xs text-studio-clay">{collaborator.role}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-xs font-medium mb-1">Contribution</p>
                  <p className="text-sm">{collaborator.contribution}</p>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1">Revenue Share</p>
                  <p className="text-sm">{collaborator.share}% of total royalties</p>
                </div>
              </div>
              
              <div className="mt-2">
                <p className="text-xs font-medium mb-1">Rights & Responsibilities</p>
                <p className="text-sm">{collaborator.details}</p>
              </div>
              
              <div className="flex justify-between mt-3 pt-3 border-t border-studio-sand/30">
                <Button variant="outline" size="sm" className="text-xs">
                  <Shield size={14} className="mr-1" />
                  View Rights
                </Button>
                
                <Button variant="outline" size="sm" className="text-xs">
                  <DollarSign size={14} className="mr-1" />
                  Payment History
                </Button>
                
                <Button variant="outline" size="sm" className="text-xs">
                  Contact
                  <ChevronRight size={14} className="ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </motion.div>
      )}
      
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
