
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Pin } from "lucide-react";
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
  const [isHidden, setIsHidden] = useState(false);

  // Check for user preference in localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    const savedHiddenState = localStorage.getItem('sidebarHidden');
    
    if (savedState) {
      setIsCollapsed(savedState === 'true');
    }
    
    if (savedHiddenState) {
      setIsHidden(savedHiddenState === 'true');
    } else {
      // Default to hidden for new users
      setIsHidden(true);
      localStorage.setItem('sidebarHidden', 'true');
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

  const toggleHidden = () => {
    const newHiddenState = !isHidden;
    setIsHidden(newHiddenState);
    localStorage.setItem('sidebarHidden', String(newHiddenState));
    if (newHiddenState) {
      setPinned(false); // Unpin when hiding
    }
  };

  const togglePin = () => {
    const newPinState = !pinned;
    setPinned(newPinState);
    
    if (newPinState) {
      // When pinning, ensure sidebar is visible
      setIsHidden(false);
      localStorage.setItem('sidebarHidden', 'false');
    }
    
    if (isCollapsed) {
      setIsHovered(newPinState);
    }
  };

  return (
    <>
      {/* Hover detection area along the left edge */}
      {isHidden && !pinned && (
        <div 
          className="fixed left-0 top-0 w-3 h-full z-40 bg-transparent"
          onMouseEnter={() => setIsHidden(false)}
        />
      )}
      
      <motion.aside 
        className="fixed left-0 h-full flex flex-col bg-white/90 backdrop-blur-md border-r border-studio-sand/30 shadow-subtle transition-all duration-300 overflow-hidden z-30"
        initial={false}
        animate={{ 
          width: isCollapsed ? (isHovered || pinned ? '16rem' : '4.5rem') : '16rem',
          x: isHidden && !pinned ? '-100%' : 0,
          opacity: isHidden && !pinned ? 0.8 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseEnter={() => {
          setHoverIntent(true);
          if (isHidden) setIsHidden(false);
        }}
        onMouseLeave={() => {
          setHoverIntent(false);
          if (!pinned) {
            setTimeout(() => {
              setIsHidden(true);
            }, 500); // Delay before hiding
          }
        }}
      >
        <div className="p-5 h-full flex flex-col overflow-hidden">
          <SidebarContent 
            navItems={navItems} 
            isCollapsed={isCollapsed && !(isHovered || pinned)} 
          />
        </div>
        
        {/* Pin button - only visible when hovered and collapsed */}
        {isCollapsed && (isHovered || pinned) && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={togglePin}
            className={`absolute right-4 top-5 h-6 w-6 rounded-full transition-all duration-200 ${pinned ? 'bg-studio-accent text-white' : 'bg-transparent text-studio-charcoal hover:bg-studio-sand/30'}`}
            aria-label={pinned ? "Unpin sidebar" : "Pin sidebar"}
          >
            <Pin className="h-4 w-4" />
          </Button>
        )}
        
        {/* Toggle collapse button */}
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleSidebar} 
          className="absolute -right-3 top-24 transform -translate-y-1/2 h-6 w-6 rounded-full bg-white border-studio-sand/30 shadow-subtle z-10" 
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </Button>
        
        {/* Hide/Show button */}
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleHidden}
          className="absolute -right-3 top-36 transform -translate-y-1/2 h-6 w-6 rounded-full bg-white border-studio-sand/30 shadow-subtle z-10" 
          aria-label={isHidden ? "Show sidebar" : "Hide sidebar"}
        >
          {isHidden ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </Button>
      </motion.aside>
    </>
  );
};

export default Sidebar;
