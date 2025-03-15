
import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SidebarSubmenuProps {
  isOpen: boolean;
  isCollapsed: boolean;
  submenuItems: {
    name: string;
    path: string;
    icon: React.ComponentType<{
      className?: string;
    }>;
    hasSubmenu?: boolean;
    submenuItems?: {
      name: string;
      path: string;
      icon: React.ComponentType<{
        className?: string;
      }>;
    }[];
  }[];
  currentPath: string;
  currentTab: string | null;
  parentName: string;
}

const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({
  isOpen,
  isCollapsed,
  submenuItems,
  currentPath,
  currentTab,
  parentName
}) => {
  const submenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        easings: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.2,
        easings: "easeInOut"
      }
    }
  };

  // Function to check if a path is active
  const isPathActive = (path: string) => {
    // For paths with query parameters
    if (path.includes("?")) {
      const [basePath, params] = path.split("?");
      const searchParams = new URLSearchParams(params);
      const tabParam = searchParams.get("tab");
      const subtabParam = searchParams.get("subtab");
      
      // Check if current URL has the same base path
      const isBasePathMatch = currentPath.startsWith(basePath.split("?")[0]);
      
      // If URL has tab parameter
      if (tabParam && currentTab) {
        // Check if the tab parameter matches
        const isTabMatch = currentTab === tabParam;
        
        // If both have subtab parameters
        if (subtabParam && new URLSearchParams(window.location.search).get("subtab")) {
          return isBasePathMatch && isTabMatch && new URLSearchParams(window.location.search).get("subtab") === subtabParam;
        }
        
        // If only the path has subtab parameter
        if (subtabParam && !new URLSearchParams(window.location.search).get("subtab")) {
          return false;
        }
        
        // If neither have subtab parameter
        return isBasePathMatch && isTabMatch;
      }
      
      return currentPath.startsWith(basePath.split("?")[0]);
    }
    
    // For paths without query parameters
    return path === "/" ? currentPath === "/" : currentPath.startsWith(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(
            "overflow-hidden",
            isCollapsed ? "bg-studio-clay opacity-0 absolute left-full w-36 ml-1 rounded-tr-lg rounded-br-lg" : "pl-8 w-full"
          )}
          key={`submenu-${parentName}`}
          variants={submenuVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <ul className={cn(
            "py-2 space-y-1",
            isCollapsed ? "shadow-md border border-studio-sand/10 p-2 bg-studio-charcoal/90 backdrop-blur-sm " : ""
          )}>
            {submenuItems.map((item) => (
              <li key={item.name} className="relative">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center py-2 px-3 text-sm rounded-lg text-studio-clay group transition-colors",
                      isActive || isPathActive(item.path) ? "bg-studio-accent/10 text-studio-accent font-medium" : "hover:bg-studio-accent/5 hover:text-studio-accent/80",
                      isCollapsed ? "justify-between text-[13px] font-medium" : "text-[13px]"
                    )
                  }
                >
                  <div className="flex items-center">
                    <item.icon className={cn("h-4 w-4", isCollapsed ? "mr-2" : "mr-3")} />
                    <span>{item.name}</span>
                  </div>
                </NavLink>
                
                {/* Render nested submenu if it exists */}
                {item.hasSubmenu && item.submenuItems && (
                  <ul className="pl-6 mt-1 space-y-1">
                    {item.submenuItems.map((subItem) => (
                      <li key={subItem.name}>
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center py-1.5 px-3 text-xs rounded-lg text-studio-clay group transition-colors",
                              isActive || isPathActive(subItem.path) ? "bg-studio-accent/10 text-studio-accent font-medium" : "hover:bg-studio-accent/5 hover:text-studio-accent/80"
                            )
                          }
                        >
                          <div className="flex items-center">
                            <subItem.icon className="h-3.5 w-3.5 mr-2" />
                            <span>{subItem.name}</span>
                          </div>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SidebarSubmenu;
