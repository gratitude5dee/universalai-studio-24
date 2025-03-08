
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Heart, MessageCircle } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  likes: number;
  views: number;
  comments: number;
}

interface GalleryProps {
  items: GalleryItem[];
  title?: string;
  maxDisplay?: number;
}

const Gallery: React.FC<GalleryProps> = ({ 
  items, 
  title = "Recent Creations", 
  maxDisplay = 4 
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const displayItems = items.slice(0, maxDisplay);
  
  return (
    <div className="w-full">
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">{title}</h2>
          {items.length > maxDisplay && (
            <button className="text-sm text-studio-accent hover:text-studio-accent/80 font-medium transition-colors">
              View all
            </button>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {displayItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-2xl"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: hoveredItem === item.id ? 1 : 0,
                y: hoveredItem === item.id ? 0 : 10
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end"
            >
              <h3 className="text-white font-medium mb-1">{item.title}</h3>
              <div className="flex space-x-3 text-white/80 text-sm">
                <span className="flex items-center">
                  <Heart className="h-3 w-3 mr-1" /> {item.likes}
                </span>
                <span className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" /> {item.views}
                </span>
                <span className="flex items-center">
                  <MessageCircle className="h-3 w-3 mr-1" /> {item.comments}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
