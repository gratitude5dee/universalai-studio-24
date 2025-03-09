
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

  // Animation variants for menu items
  const menuItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.2,
      }
    }),
    exit: { opacity: 0, y: -5, transition: { duration: 0.1 } }
  };

  // Submenu that appears on hover when sidebar is collapsed
  if (isCollapsed) {
    return (
      <div className="absolute left-full top-0 ml-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-elevation p-3 min-w-52 border border-studio-sand/30">
          <div className="text-xs font-medium text-studio-accent mb-2 px-2 uppercase tracking-wider">
            {parentName}
          </div>
          <div className="space-y-1">
            {submenuItems.map((subItem, index) => {
              const basePathMatch = currentPath.startsWith(subItem.path.split("?")[0]);
              const queryMatch = subItem.path.includes(`tab=${currentTab}`);
              
              const isSubItemActive = basePathMatch && 
                (!subItem.path.includes("?tab=") || (currentTab && queryMatch));
              
              return (
                <motion.div
                  key={subItem.name}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={menuItemVariants}
                >
                  <Link 
                    to={subItem.path} 
                    className={`
                      flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200
                      ${isSubItemActive 
                        ? 'bg-studio-accent/10 text-studio-accent font-medium' 
                        : 'hover:bg-studio-sand/30'}
                    `}
                  >
                    <subItem.icon className={`h-4 w-4 mr-2 ${isSubItemActive ? 'text-studio-accent' : 'text-studio-clay'}`} />
                    {subItem.name}
                  </Link>
                </motion.div>
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
          {submenuItems.map((subItem, index) => {
            const basePathMatch = currentPath.startsWith(subItem.path.split("?")[0]);
            const queryMatch = subItem.path.includes(`tab=${currentTab}`);
            
            const isSubItemActive = basePathMatch && 
              (!subItem.path.includes("?tab=") || (currentTab && queryMatch));
            
            return (
              <motion.div
                key={subItem.name}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={menuItemVariants}
              >
                <Link 
                  to={subItem.path} 
                  className={`
                    flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200
                    ${isSubItemActive 
                      ? 'bg-studio-accent/10 text-studio-accent font-medium' 
                      : 'hover:bg-studio-sand/30'}
                  `}
                >
                  <subItem.icon className={`h-4 w-4 mr-2 ${isSubItemActive ? 'text-studio-accent' : 'text-studio-clay'}`} />
                  {subItem.name}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SidebarSubmenu;
