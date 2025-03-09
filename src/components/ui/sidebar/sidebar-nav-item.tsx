
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
  
  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: 0.05, 
        duration: 0.2 
      } 
    }
  };

  if (!item.hasSubmenu) {
    return (
      <Link to={item.path} className="relative block" title={isCollapsed ? item.name : ""}>
        <div className={`
          flex items-center ${isCollapsed ? 'justify-center' : 'px-3'} py-2.5 my-1 rounded-lg text-sm font-medium transition-all duration-200 group
          ${isActive 
            ? 'text-white bg-studio-accent/90 shadow-md' 
            : 'text-studio-charcoal hover:bg-studio-sand/30'}
        `}>
          <div className={`
            ${isCollapsed ? 'flex justify-center w-full' : 'mr-3'}
            ${isActive ? 'text-white' : 'text-studio-clay group-hover:text-studio-accent'}
          `}>
            <item.icon className={`h-5 w-5 transition-all duration-200
              ${isActive && 'filter drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))'}
            `} />
          </div>
          
          {!isCollapsed && (
            <motion.span
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="flex-1 text-[13px]"
            >
              {item.name}
            </motion.span>
          )}
          
          {isActive && (
            <motion.div 
              layoutId="sidebar-indicator" 
              className={`absolute ${isCollapsed ? 'right-1.5' : 'right-2.5'} w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.5)]`} 
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
          flex items-center justify-between ${isCollapsed ? 'justify-center' : 'px-3'} py-2.5 my-1 rounded-lg text-sm font-medium transition-all duration-200 group
          ${isSubMenuActive 
            ? 'text-white bg-studio-accent/90 shadow-md' 
            : 'text-studio-charcoal hover:bg-studio-sand/30'}
        `}>
          <div className="flex items-center flex-1">
            <div className={`
              ${isCollapsed ? 'flex justify-center w-full' : 'mr-3'}
              ${isSubMenuActive ? 'text-white' : 'text-studio-clay group-hover:text-studio-accent'}
            `}>
              <item.icon className={`h-5 w-5 transition-all duration-200
                ${isSubMenuActive && 'filter drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))'}
              `} />
            </div>
            
            {!isCollapsed && (
              <motion.span
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-[13px]"
              >
                {item.name}
              </motion.span>
            )}
          </div>
          
          {!isCollapsed && (
            <ChevronRight 
              className={`h-3.5 w-3.5 transition-transform duration-200 ${submenuOpen ? 'rotate-90' : ''} 
                ${isSubMenuActive ? 'text-white' : 'text-studio-clay'}
              `} 
            />
          )}
          
          {isSubMenuActive && (
            <motion.div 
              layoutId="sidebar-indicator" 
              className={`absolute ${isCollapsed ? 'right-1.5' : 'right-2.5'} w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.5)]`} 
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
