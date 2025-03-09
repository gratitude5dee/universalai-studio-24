
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SidebarContent from "./sidebar-content";
import { motion } from "framer-motion";

interface SidebarProps {
  navItems: {
    name: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    hasSubmenu?: boolean;
    submenuItems?: {
      name: string;
      path: string;
      icon: React.ComponentType<{ className?: string }>;
    }[];
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ navItems }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check for user preference in localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
  };

  return (
    <motion.aside 
      className="relative flex flex-col glass-card m-5 rounded-3xl transition-all duration-300"
      initial={false}
      animate={{ 
        width: isCollapsed ? (isHovered ? '16rem' : '4rem') : '16rem',
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5 h-full flex flex-col">
        <SidebarContent navItems={navItems} isCollapsed={isCollapsed && !isHovered} />
      </div>
      
      {/* Toggle button */}
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleSidebar} 
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-white border-studio-sand shadow-subtle z-10" 
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </motion.aside>
  );
};

export default Sidebar;
