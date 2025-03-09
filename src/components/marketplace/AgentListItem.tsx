
import React from "react";
import { motion } from "framer-motion";
import { Star, ArrowUpRight, BadgeDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Agent } from "./types";

interface AgentListItemProps {
  agent: Agent;
}

export const AgentListItem: React.FC<AgentListItemProps> = ({ agent }) => {
  // Animation variants for the list item
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3,
      }
    }
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="bg-white border rounded-xl p-4 flex flex-col md:flex-row gap-4 hover:shadow-md transition-all"
    >
      <div 
        className="h-24 md:h-auto md:w-32 bg-cover bg-center rounded-lg shrink-0"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${agent.image})` 
        }}
      />
      
      <div className="flex-1">
        <div className="flex flex-wrap gap-2 mb-1">
          <span className="bg-muted text-xs px-2 py-0.5 rounded-full">
            {agent.category === "creative" ? "Creative" :
             agent.category === "art" ? "Art" :
             agent.category === "code" ? "Code" :
             agent.category === "conversation" ? "Chat" :
             agent.category === "research" ? "Research" : 
             "AI"}
          </span>
          
          <span className="bg-muted text-xs px-2 py-0.5 rounded-full flex items-center">
            <BadgeDollarSign className="h-3 w-3 mr-1" />
            {agent.price}
          </span>
          
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xs ${i < parseInt(agent.rating) ? "text-amber-400" : "text-muted"}`}>★</span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">({agent.reviews})</span>
          </div>
        </div>
        
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{agent.name}</h3>
          <span className="text-xs text-muted-foreground">{agent.provider}</span>
        </div>
        
        <p className="text-sm text-muted-foreground my-2">
          {agent.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {agent.tags.slice(0, 4).map((tag, index) => (
            <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
          {agent.tags.length > 4 && (
            <span className="text-xs bg-muted px-2 py-1 rounded-full">
              +{agent.tags.length - 4} more
            </span>
          )}
        </div>
      </div>
      
      <div className="flex md:flex-col justify-between items-center gap-2 md:w-28 shrink-0">
        <Button variant="outline" size="sm" className="w-full gap-1">
          <span>Details</span>
        </Button>
        <Button size="sm" className="w-full gap-1">
          <span>Try Agent</span>
          <ArrowUpRight className="h-3 w-3" />
        </Button>
      </div>
    </motion.div>
  );
};
