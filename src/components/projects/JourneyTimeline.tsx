
import React from "react";
import { motion } from "framer-motion";
import { Milestone, CheckCircle, Clock, Calendar } from "lucide-react";

const JourneyTimeline = () => {
  const milestones = [
    {
      title: "Project Inception",
      date: "October 15, 2023",
      description: "First gathered around the campfire to share ideas",
      completed: true,
      memories: ["Alex sketched the first concept", "Morgan wrote the initial story outline"]
    },
    {
      title: "First Prototype",
      date: "November 28, 2023",
      description: "Created interactive storytelling prototype with basic visuals",
      completed: true,
      memories: ["Late night coding session", "Jordan's breakthrough with the animation sequence"]
    },
    {
      title: "User Testing",
      date: "January 12, 2024",
      description: "Shared with first test group and gathered feedback",
      completed: true,
      memories: ["The surprise emotional response from testers", "Celebration dinner after positive feedback"]
    },
    {
      title: "Visual Refinement",
      date: "Current Phase",
      description: "Enhancing visuals and polishing user experience",
      completed: false,
      memories: ["Color palette evolution", "Character design workshop"]
    },
    {
      title: "Public Launch",
      date: "Planned for June 2024",
      description: "Release to the world and celebrate our journey",
      completed: false,
      memories: []
    }
  ];

  return (
    <div className="space-y-6">
      <div className="relative glass-card p-6 rounded-xl">
        <div className="absolute left-[27px] top-[60px] bottom-[28px] w-[2px] bg-studio-sand/50" />
        
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            className="relative mb-8 last:mb-0 pl-12"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="absolute left-0 top-0 z-10">
              {milestone.completed ? (
                <CheckCircle className="w-6 h-6 text-green-500 bg-white rounded-full" />
              ) : index === milestones.findIndex(m => !m.completed) ? (
                <Clock className="w-6 h-6 text-studio-accent bg-white rounded-full" />
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-studio-sand bg-white" />
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <h3 className="text-lg font-medium">{milestone.title}</h3>
              <div className="flex items-center text-sm text-studio-clay">
                <Calendar className="w-4 h-4 mr-1" />
                {milestone.date}
              </div>
            </div>
            
            <p className="text-studio-clay">{milestone.description}</p>
            
            {milestone.memories.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-medium mb-2 text-studio-accent">Shared Memories:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {milestone.memories.map((memory, i) => (
                    <div key={i} className="bg-studio-highlight/20 p-2 rounded-md text-sm flex items-start">
                      <span className="bg-studio-highlight w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 shrink-0">
                        ✨
                      </span>
                      {memory}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JourneyTimeline;
