
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
  const [hoverIntent, setHoverIntent] = useState(false);
  const [pinned, setPinned] = useState(false);

  // Check for user preference in localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);

  // Hover intent with delay
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (hoverIntent && !pinned) {
      timer = setTimeout(() => {
        setIsHovered(true);
      }, 150); // 150ms delay before expanding
    } else if (!hoverIntent && !pinned) {
      timer = setTimeout(() => {
        setIsHovered(false);
      }, 300); // Slightly longer delay before collapsing for better UX
    }
    return () => clearTimeout(timer);
  }, [hoverIntent, pinned]);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
    if (!newState) {
      setPinned(false); // Unpin when manually expanded
    }
  };

  const togglePin = () => {
    setPinned(!pinned);
    if (isCollapsed) {
      setIsHovered(!pinned);
    }
  };

  return (
    <motion.aside 
      className="relative flex flex-col glass-card m-5 rounded-3xl transition-all duration-300 overflow-hidden"
      initial={false}
      animate={{ 
        width: isCollapsed ? (isHovered || pinned ? '16rem' : '4.5rem') : '16rem',
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={() => setHoverIntent(true)}
      onMouseLeave={() => setHoverIntent(false)}
    >
      <div className="p-5 h-full flex flex-col overflow-hidden">
        <SidebarContent 
          navItems={navItems} 
          isCollapsed={isCollapsed && !(isHovered || pinned)} 
        />
      </div>
      
      {/* Toggle button */}
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleSidebar} 
        className="absolute -right-4 top-1/3 transform -translate-y-1/2 h-8 w-8 rounded-full bg-white border-studio-sand shadow-subtle z-10" 
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
      
      {/* Pin button - only visible when hovered and collapsed */}
      {isCollapsed && (isHovered || pinned) && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={togglePin}
          className={`absolute right-4 top-5 h-6 w-6 rounded-full transition-all duration-200 ${pinned ? 'bg-studio-accent text-white' : 'bg-transparent text-studio-charcoal hover:bg-studio-sand/30'}`}
          aria-label={pinned ? "Unpin sidebar" : "Pin sidebar"}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-current" />
        </Button>
      )}
    </motion.aside>
  );
};

export default Sidebar;
