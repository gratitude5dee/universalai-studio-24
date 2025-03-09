
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface NavItemProps {
  item: {
    name: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    hasSubmenu?: boolean;
    submenuItems?: {
      name: string;
      path: string;
      icon: React.ComponentType<{ className?: string }>;
    }[];
  };
  isActive: boolean;
  isSubMenuActive?: boolean;
  isCollapsed: boolean;
  submenuOpen: boolean;
  toggleSubmenu: (e: React.MouseEvent) => void;
}

const SidebarNavItem: React.FC<NavItemProps> = ({
  item,
  isActive,
  isSubMenuActive,
  isCollapsed,
  submenuOpen,
  toggleSubmenu,
}) => {
  // Create variants for the animated indicator
  const indicatorVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } }
  };

  if (!item.hasSubmenu) {
    return (
      <Link to={item.path} className="relative block" title={isCollapsed ? item.name : ""}>
        <div className={`
          flex items-center ${isCollapsed ? 'justify-center' : 'px-3'} py-3 rounded-xl text-sm font-medium transition-all duration-200 group
          ${isActive ? 'text-studio-cream bg-studio-accent' : 'hover:bg-studio-sand/30'}
        `}>
          <item.icon className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 transition-all duration-200
            ${isActive ? 'text-studio-cream' : 'text-studio-clay group-hover:text-studio-accent'}
          `} />
          {!isCollapsed && item.name}
          {isActive && !isCollapsed && (
            <motion.div 
              layoutId="sidebar-indicator" 
              className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white" 
              initial="initial"
              animate="animate"
              variants={indicatorVariants}
            />
          )}
        </div>
      </Link>
    );
  }
  
  return (
    <>
      <a 
        href="#" 
        onClick={toggleSubmenu} 
        className="relative block" 
        title={isCollapsed ? item.name : ""}
      >
        <div className={`
          flex items-center justify-between ${isCollapsed ? 'justify-center' : 'px-3'} py-3 rounded-xl text-sm font-medium transition-all duration-200 group
          ${isSubMenuActive ? 'text-studio-cream bg-studio-accent' : 'hover:bg-studio-sand/30'}
        `}>
          <div className="flex items-center">
            <item.icon className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 transition-all duration-200
              ${isSubMenuActive ? 'text-studio-cream' : 'text-studio-clay group-hover:text-studio-accent'}
            `} />
            {!isCollapsed && item.name}
          </div>
          {!isCollapsed && (
            <ChevronRight 
              className={`h-4 w-4 transition-transform duration-200 ${submenuOpen ? 'rotate-90' : ''} 
                ${isSubMenuActive ? 'text-studio-cream' : 'text-studio-clay'}
              `} 
            />
          )}
          {isSubMenuActive && !isCollapsed && (
            <motion.div 
              layoutId="sidebar-indicator" 
              className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white"
              initial="initial"
              animate="animate" 
              variants={indicatorVariants}
            />
          )}
        </div>
      </a>
    </>
  );
};

export default SidebarNavItem;
