
import { motion } from "framer-motion";
import { Play, Award, Globe, Users, Star } from "lucide-react";

const RightsJourney = () => {
  const journey = [
    { 
      icon: Play, 
      title: "Creation", 
      date: "May 12, 2023",
      description: "Your journey began when you created this work"
    },
    { 
      icon: Award, 
      title: "Rights Established", 
      date: "May 12, 2023",
      description: "Copyright automatically applied to your creation" 
    },
    { 
      icon: Users, 
      title: "Collaboration", 
      date: "May 15, 2023",
      description: "You invited 3 collaborators to join the journey" 
    },
    { 
      icon: Globe, 
      title: "Public Release", 
      date: "June 1, 2023",
      description: "Your creation was shared with the world" 
    },
    { 
      icon: Star, 
      title: "First Milestone", 
      date: "July 10, 2023",
      description: "Reached 5,000 views and first revenue" 
    }
  ];

  return (
    <div className="relative py-2">
      <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-studio-sand/50" />
      
      {journey.map((step, index) => (
        <motion.div 
          key={index}
          className="flex items-start gap-4 mb-6 relative"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          whileHover={{ x: 5 }}
        >
          <motion.div 
            className="w-7 h-7 rounded-full bg-studio-accent/20 flex items-center justify-center shrink-0 z-10"
            whileHover={{ scale: 1.2, backgroundColor: "rgba(217, 143, 100, 0.4)" }}
          >
            <step.icon size={14} className="text-studio-accent" />
          </motion.div>
          
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{step.title}</h3>
              <span className="text-xs text-studio-clay">{step.date}</span>
            </div>
            <p className="text-sm text-studio-clay">{step.description}</p>
          </div>
        </motion.div>
      ))}

      <motion.button 
        className="ml-7 text-sm text-studio-accent flex items-center gap-1"
        whileHover={{ x: 3 }}
      >
        Complete journey
      </motion.button>
    </div>
  );
};

export default RightsJourney;
