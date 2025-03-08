
import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  BarChart3, 
  Settings,
  LogOut
} from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/ui/header";
import Ambient from "@/components/ui/ambient";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Gallery", path: "/gallery", icon: ImageIcon },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-studio-cream overflow-hidden">
      <Ambient />
      
      <div className="flex flex-1 z-10">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 p-5 glass-card m-5 rounded-3xl">
          <div className="mb-8 mt-2">
            <h1 className="text-2xl font-medium px-3 flex items-center">
              <span className="bg-studio-accent/20 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                <span className="text-studio-accent font-semibold">C</span>
              </span>
              Creator Studio
            </h1>
          </div>
          
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive = 
                (item.path === "/" && currentPath === "/") || 
                (item.path !== "/" && currentPath.startsWith(item.path));
              
              return (
                <Link 
                  to={item.path} 
                  key={item.name}
                  className="relative block"
                >
                  <div className={`
                    flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                    ${isActive ? 'text-studio-cream bg-studio-accent' : 'hover:bg-studio-sand/30'}
                  `}>
                    <item.icon className={`mr-3 h-5 w-5 transition-all duration-200
                      ${isActive ? 'text-studio-cream' : 'text-studio-clay group-hover:text-studio-accent'}
                    `} />
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-indicator"
                        className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-auto mb-4">
            <Link to="/logout" className="flex items-center px-3 py-3 text-sm text-muted-foreground hover:bg-studio-sand/30 rounded-xl transition-all duration-200">
              <LogOut className="mr-3 h-5 w-5 text-studio-clay" />
              Log Out
            </Link>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 flex flex-col max-h-screen overflow-y-auto">
          <Header />
          <div className="flex-1 px-4 md:px-8 py-4 pb-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
