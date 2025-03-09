
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SidebarContent from "./sidebar-content";

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

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`relative md:flex flex-col ${isCollapsed ? 'w-16' : 'w-64'} p-5 glass-card m-5 rounded-3xl transition-all duration-300`}>
      <SidebarContent navItems={navItems} isCollapsed={isCollapsed} />
      
      {/* Toggle button */}
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleSidebar} 
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-white border-studio-sand shadow-subtle" 
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </aside>
  );
};

export default Sidebar;
