
import React from "react";
import { Link } from "react-router-dom";

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
}

const SidebarSubmenu: React.FC<SubmenuProps> = ({
  isOpen,
  isCollapsed,
  submenuItems,
  currentPath,
  currentTab,
}) => {
  if (!(isOpen || isCollapsed) || !submenuItems) {
    return null;
  }

  return (
    <div className={`mt-1 ml-4 space-y-1 ${isCollapsed ? 'absolute left-full top-0 ml-2 bg-white p-2 rounded-lg shadow-lg z-10 min-w-48' : ''}`}>
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
              flex items-center px-3 py-2 rounded-lg text-sm transition-colors duration-200
              ${isSubItemActive ? 'bg-studio-accent/10 text-studio-accent' : 'hover:bg-studio-sand/20'}
            `}
            title={isCollapsed ? subItem.name : ""}
          >
            <subItem.icon className={`h-4 w-4 ${isCollapsed ? '' : 'mr-2'} ${isSubItemActive ? 'text-studio-accent' : 'text-studio-clay'}`} />
            {(!isCollapsed || (isCollapsed && true)) && subItem.name}
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarSubmenu;
