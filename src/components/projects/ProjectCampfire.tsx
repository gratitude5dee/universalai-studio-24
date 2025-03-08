
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame, MessageCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProjectCampfire = () => {
  const [messages, setMessages] = useState([
    { id: 1, author: "Alex", content: "I love how the color palette is coming together!", timestamp: "Just now" },
    { id: 2, author: "Morgan", content: "The narrative arc feels so much stronger now", timestamp: "2h ago" },
    { id: 3, author: "Jordan", content: "Should we schedule another brainstorming session?", timestamp: "Yesterday" },
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  
  const handleAddMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        { id: Date.now(), author: "You", content: newMessage, timestamp: "Just now" },
        ...messages
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200/50 p-6">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1920')] opacity-10 bg-cover bg-center" />
      
      {/* Campfire visualization */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Campfire center */}
        <div className="md:col-span-1 flex flex-col items-center justify-center">
          <div className="relative">
            <motion.div
              className="w-32 h-32 rounded-full bg-amber-500/20 flex items-center justify-center"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              <motion.div
                className="w-24 h-24 rounded-full bg-amber-500/30 flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5
                }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-amber-500/50 flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.15, 1],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                  }}
                >
                  <Flame className="h-10 w-10 text-studio-accent" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Collaborators around the fire */}
            {["Alex", "Morgan", "Jordan", "You"].map((name, index) => {
              const angle = (index * 2 * Math.PI) / 4;
              const radius = 90;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <motion.div
                  key={name}
                  className="absolute w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-sm font-medium border-2 border-amber-100"
                  initial={{ x, y }}
                  style={{ x, y }}
                  whileHover={{ scale: 1.1 }}
                >
                  {name.charAt(0)}
                </motion.div>
              );
            })}
          </div>
          
          <h3 className="mt-10 text-lg font-medium">Campfire Stories</h3>
          <p className="text-sm text-center text-studio-clay">
            Interactive storytelling project
          </p>
        </div>
        
        {/* Campfire chat/activity */}
        <div className="md:col-span-2 flex flex-col">
          <div className="mb-3 flex justify-between items-center">
            <h3 className="text-lg font-medium flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-studio-accent" />
              Around the Fire
            </h3>
            <Button variant="outline" size="sm" className="bg-white/70">
              <PlusCircle className="h-4 w-4 mr-1" />
              New Thread
            </Button>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 max-h-60 overflow-y-auto space-y-3 mb-3">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className="flex"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-8 h-8 rounded-full bg-studio-accent/20 flex items-center justify-center text-xs text-studio-accent font-medium mr-3 shrink-0">
                  {message.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-medium text-sm">{message.author}</span>
                    <span className="text-xs text-studio-clay">{message.timestamp}</span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Share your thoughts..."
              className="flex-1 p-2 rounded-lg border border-amber-200/50 bg-white/70"
              onKeyDown={(e) => e.key === "Enter" && handleAddMessage()}
            />
            <Button onClick={handleAddMessage} className="bg-studio-accent">
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCampfire;
