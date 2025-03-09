
import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface SubmenuProps {
  isOpen: boolean;
  isCollapsed: boolean;
  submenuItems: {
    name: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  currentPath: string;
  currentTab?: string | null;
  parentName: string;
}

const SidebarSubmenu: React.FC<SubmenuProps> = ({
  isOpen,
  isCollapsed,
  submenuItems,
  currentPath,
  currentTab,
  parentName,
}) => {
  if (!submenuItems.length) return null;

  // Submenu that appears on hover when sidebar is collapsed
  if (isCollapsed) {
    return (
      <div className="absolute left-full top-0 ml-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="bg-white rounded-lg shadow-lg p-2 min-w-48 border border-studio-sand/30">
          <div className="text-xs font-medium text-muted-foreground mb-1 px-2 uppercase tracking-wider">
            {parentName}
          </div>
          <div className="space-y-1">
            {submenuItems.map(subItem => {
              const basePathMatch = currentPath.startsWith(subItem.path.split("?")[0]);
              const queryMatch = subItem.path.includes(`tab=${currentTab}`);
              
              const isSubItemActive = basePathMatch && 
                (!subItem.path.includes("?tab=") || (currentTab && queryMatch));
              
              return (
                <Link 
                  key={subItem.name} 
                  to={subItem.path} 
                  className={`
                    flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200
                    ${isSubItemActive ? 'bg-studio-accent/10 text-studio-accent' : 'hover:bg-studio-sand/20'}
                  `}
                >
                  <subItem.icon className={`h-4 w-4 mr-2 ${isSubItemActive ? 'text-studio-accent' : 'text-studio-clay'}`} />
                  {subItem.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Expanded submenu animation for non-collapsed state
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="mt-1 ml-4 space-y-1 overflow-hidden"
        >
          {submenuItems.map(subItem => {
            const basePathMatch = currentPath.startsWith(subItem.path.split("?")[0]);
            const queryMatch = subItem.path.includes(`tab=${currentTab}`);
            
            const isSubItemActive = basePathMatch && 
              (!subItem.path.includes("?tab=") || (currentTab && queryMatch));
            
            return (
              <Link 
                key={subItem.name} 
                to={subItem.path} 
                className={`
                  flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200
                  ${isSubItemActive ? 'bg-studio-accent/10 text-studio-accent' : 'hover:bg-studio-sand/20'}
                `}
              >
                <subItem.icon className={`h-4 w-4 mr-2 ${isSubItemActive ? 'text-studio-accent' : 'text-studio-clay'}`} />
                {subItem.name}
              </Link>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SidebarSubmenu;
