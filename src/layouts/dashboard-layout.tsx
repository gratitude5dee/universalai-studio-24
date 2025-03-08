import React, { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Image as ImageIcon, BarChart3, Settings, LogOut, Gem, Book, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/ui/header";
import Ambient from "@/components/ui/ambient";
import { Button } from "@/components/ui/button";
interface DashboardLayoutProps {
  children: ReactNode;
}
const DashboardLayout = ({
  children
}: DashboardLayoutProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navItems = [{
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard
  }, {
    name: "Gallery",
    path: "/gallery",
    icon: ImageIcon
  }, {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3
  }, {
    name: "Create New Agent",
    path: "/create-agent",
    icon: Settings
  }, {
    name: "My Collection",
    path: "/collection",
    icon: Gem
  }, {
    name: "Rights Journey",
    path: "/rights",
    icon: Book
  }, {
    name: "Marketplace Launch",
    path: "/marketplace-launch",
    icon: Globe
  }];
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return <div className="min-h-screen flex flex-col bg-studio-cream overflow-hidden">
      <Ambient />
      
      <div className="flex flex-1 z-10">
        {/* Sidebar */}
        <aside className={`relative md:flex flex-col ${isCollapsed ? 'w-16' : 'w-64'} p-5 glass-card m-5 rounded-3xl transition-all duration-300`}>
          <div className={`mb-8 mt-2 ${isCollapsed ? 'justify-center' : 'px-3'} flex items-center`}>
            {!isCollapsed ? <h1 className="text-2xl font-medium flex items-center">
                <span className="bg-studio-accent/20 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                  <span className="text-studio-accent font-semibold">5
Universal Studio</span>
                </span>
                Creator Studio
              </h1> : <span className="bg-studio-accent/20 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-studio-accent font-semibold">C</span>
              </span>}
          </div>
          
          <nav className="flex-1 space-y-1">
            {navItems.map(item => {
            const isActive = item.path === "/" && currentPath === "/" || item.path !== "/" && currentPath.startsWith(item.path);
            return <Link to={item.path} key={item.name} className="relative block" title={isCollapsed ? item.name : ""}>
                  <div className={`
                    flex items-center ${isCollapsed ? 'justify-center' : 'px-3'} py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                    ${isActive ? 'text-studio-cream bg-studio-accent' : 'hover:bg-studio-sand/30'}
                  `}>
                    <item.icon className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 transition-all duration-200
                      ${isActive ? 'text-studio-cream' : 'text-studio-clay group-hover:text-studio-accent'}
                    `} />
                    {!isCollapsed && item.name}
                    {isActive && !isCollapsed && <motion.div layoutId="sidebar-indicator" className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white" transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.6
                }} />}
                  </div>
                </Link>;
          })}
          </nav>
          
          <div className="mt-auto mb-4 space-y-1">
            {/* Settings button */}
            <Link to="/create-agent" className={`flex items-center ${isCollapsed ? 'justify-center' : 'px-3'} py-3 text-sm text-muted-foreground hover:bg-studio-sand/30 rounded-xl transition-all duration-200`} title={isCollapsed ? "Create New Agent" : ""}>
              <Settings className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-studio-clay`} />
              {!isCollapsed && "Create New Agent"}
            </Link>
            
            {/* Log Out button */}
            <Link to="/logout" className={`flex items-center ${isCollapsed ? 'justify-center' : 'px-3'} py-3 text-sm text-muted-foreground hover:bg-studio-sand/30 rounded-xl transition-all duration-200`} title={isCollapsed ? "Log Out" : ""}>
              <LogOut className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-studio-clay`} />
              {!isCollapsed && "Log Out"}
            </Link>
          </div>

          {/* Toggle button */}
          <Button variant="outline" size="icon" onClick={toggleSidebar} className="absolute -right-4 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-white border-studio-sand shadow-subtle" aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 flex flex-col max-h-screen overflow-y-auto">
          <Header />
          <div className="flex-1 px-4 md:px-8 py-4 pb-10">
            {children}
          </div>
        </main>
      </div>
    </div>;
};
export default DashboardLayout;