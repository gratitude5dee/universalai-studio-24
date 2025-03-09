
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import SidebarNavItem from "./sidebar-nav-item";
import SidebarSubmenu from "./sidebar-submenu";

interface SidebarContentProps {
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
  isCollapsed: boolean;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ navItems, isCollapsed }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [agentsSubmenuOpen, setAgentsSubmenuOpen] = useState(false);
  const [projectsSubmenuOpen, setProjectsSubmenuOpen] = useState(false);

  const toggleAgentsSubmenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isCollapsed) {
      setAgentsSubmenuOpen(!agentsSubmenuOpen);
    }
  };

  const toggleProjectsSubmenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isCollapsed) {
      setProjectsSubmenuOpen(!projectsSubmenuOpen);
    }
  };

  return (
    <>
      <div className={`mb-8 mt-2 ${isCollapsed ? 'justify-center' : 'px-3'} flex items-center`}>
        {!isCollapsed ? 
          <h1 className="text-2xl font-medium flex items-center">
            <span className="bg-studio-accent/20 w-8 h-8 rounded-full flex items-center justify-center mr-2">
              <span className="text-studio-accent font-semibold">5</span>
            </span>
            <div className="flex flex-col">
              <span className="text-studio-accent leading-tight">Universal</span>
              <span>Studio</span>
            </div>
          </h1> 
          : 
          <span className="bg-studio-accent/20 w-8 h-8 rounded-full flex items-center justify-center">
            <span className="text-studio-accent font-semibold">5</span>
          </span>
        }
      </div>
          
      <nav className="flex-1 space-y-1">
        {navItems.map(item => {
          const isActive = item.path === "/" && currentPath === "/" || 
                           (item.path !== "/" && item.path !== "#" && currentPath.startsWith(item.path)) ||
                           (item.hasSubmenu && item.submenuItems?.some(subItem => currentPath.startsWith(subItem.path)));
          const isSubMenuActive = item.hasSubmenu && item.submenuItems?.some(subItem => currentPath.startsWith(subItem.path));
          
          return (
            <div key={item.name} className="relative">
              <SidebarNavItem 
                item={item}
                isActive={isActive}
                isSubMenuActive={isSubMenuActive}
                isCollapsed={isCollapsed}
                submenuOpen={item.name === "Agents" ? agentsSubmenuOpen : projectsSubmenuOpen}
                toggleSubmenu={item.name === "Agents" ? toggleAgentsSubmenu : toggleProjectsSubmenu}
              />
              
              {/* Submenu */}
              {item.name === "Agents" ? (
                <SidebarSubmenu
                  isOpen={agentsSubmenuOpen}
                  isCollapsed={isCollapsed}
                  submenuItems={item.submenuItems || []}
                  currentPath={currentPath}
                />
              ) : item.name === "Projects" ? (
                <SidebarSubmenu
                  isOpen={projectsSubmenuOpen}
                  isCollapsed={isCollapsed}
                  submenuItems={item.submenuItems || []}
                  currentPath={currentPath}
                />
              ) : null}
            </div>
          );
        })}
      </nav>
        
      <div className="mt-auto mb-4 space-y-1">
        {/* Log Out button */}
        <Link to="/logout" className={`flex items-center ${isCollapsed ? 'justify-center' : 'px-3'} py-3 text-sm text-muted-foreground hover:bg-studio-sand/30 rounded-xl transition-all duration-200`} title={isCollapsed ? "Log Out" : ""}>
          <LogOut className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-studio-clay`} />
          {!isCollapsed && "Log Out"}
        </Link>
      </div>
    </>
  );
};

export default SidebarContent;
