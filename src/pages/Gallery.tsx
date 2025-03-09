
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Grid, 
  Columns, 
  Image as ImageIcon, 
  Video, 
  Filter, 
  Plus,
  ChevronDown
} from "lucide-react";
import DashboardLayout from "@/layouts/dashboard-layout";

const galleryItems = [
  {
    id: "1",
    title: "Mountain Sunrise",
    type: "image",
    category: "landscape",
    date: "2023-08-15",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
  },
  {
    id: "2",
    title: "Urban Architecture",
    type: "image",
    category: "urban",
    date: "2023-09-02",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
  },
  {
    id: "3",
    title: "Ocean Waves",
    type: "image",
    category: "nature",
    date: "2023-07-24",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2626&q=80",
  },
  {
    id: "4",
    title: "Forest Path",
    type: "image",
    category: "landscape",
    date: "2023-10-10",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
  },
  {
    id: "5",
    title: "City Lights",
    type: "video",
    category: "urban",
    date: "2023-09-18",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2244&q=80",
  },
  {
    id: "6",
    title: "Autumn Colors",
    type: "image",
    category: "nature",
    date: "2023-10-25",
    image: "https://images.unsplash.com/photo-1507783548227-544c3b8fc065?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
  },
  {
    id: "7",
    title: "Storm Approaching",
    type: "video",
    category: "weather",
    date: "2023-08-30",
    image: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80",
  },
  {
    id: "8",
    title: "Desert Sunset",
    type: "image",
    category: "landscape",
    date: "2023-07-05",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2376&q=80",
  },
];

type ViewMode = "grid" | "columns";

const Gallery = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">Asset Library</h1>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 bg-white border border-studio-sand/50 rounded-xl overflow-hidden">
              <button 
                className={`p-2 ${viewMode === 'grid' ? 'bg-studio-accent text-white' : 'text-studio-charcoal hover:bg-studio-sand/30'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button 
                className={`p-2 ${viewMode === 'columns' ? 'bg-studio-accent text-white' : 'text-studio-charcoal hover:bg-studio-sand/30'}`}
                onClick={() => setViewMode('columns')}
              >
                <Columns className="h-4 w-4" />
              </button>
            </div>
            
            <button className="flex items-center gap-1 px-3 py-2 bg-white border border-studio-sand/50 text-studio-charcoal rounded-xl text-sm hover:bg-studio-sand/30 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
              <ChevronDown className="h-3 w-3 ml-1" />
            </button>
            
            <button className="flex items-center gap-1 px-3 py-2 bg-studio-accent text-white rounded-xl text-sm hover:bg-studio-accent/90 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add New</span>
            </button>
          </div>
        </div>
        
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'} gap-6`}>
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`${viewMode === 'grid' ? 'aspect-square' : 'aspect-video'} w-full overflow-hidden`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              {/* Item type indicator */}
              <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-lg">
                {item.type === "image" ? (
                  <ImageIcon className="h-4 w-4 text-studio-charcoal" />
                ) : (
                  <Video className="h-4 w-4 text-studio-charcoal" />
                )}
              </div>
              
              {/* Content overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: hoveredItem === item.id ? 1 : 0,
                  y: hoveredItem === item.id ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 flex flex-col justify-end"
              >
                <span className="text-xs text-white/70 bg-white/10 w-fit px-2 py-0.5 rounded-full mb-1.5 backdrop-blur-sm">
                  {item.category}
                </span>
                <h3 className="text-white font-medium">{item.title}</h3>
                <p className="text-white/70 text-xs">{item.date}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Gallery;
