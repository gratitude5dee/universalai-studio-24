
import React, { ReactNode } from "react";
import { LayoutDashboard, Image as ImageIcon, BarChart3, Shield, Wand2, Wallet, Users, Bot, Database, Eye, Globe, ShoppingCart } from "lucide-react";
import Header from "@/components/ui/header";
import Ambient from "@/components/ui/ambient";
import Sidebar from "@/components/ui/sidebar/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navItems = [{
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard
  }, {
    name: "Projects",
    path: "#",
    icon: Users,
    hasSubmenu: true,
    submenuItems: [
      {
        name: "Asset Library",
        path: "/gallery",
        icon: ImageIcon
      },
      {
        name: "Analytics",
        path: "/analytics",
        icon: BarChart3
      },
      {
        name: "Marketplace Launch",
        path: "/marketplace-launch",
        icon: Globe
      }
    ]
  }, {
    name: "Agents",
    path: "#",
    icon: Users,
    hasSubmenu: true,
    submenuItems: [
      {
        name: "Create New Agent",
        path: "/create-agent",
        icon: Bot
      },
      {
        name: "My Collection",
        path: "/collection",
        icon: Database
      },
      {
        name: "Marketplace",
        path: "/agent-marketplace",
        icon: ShoppingCart
      },
      {
        name: "Observability",
        path: "/observability",
        icon: Eye
      }
    ]
  }, {
    name: "IP Portal",
    path: "/rights",
    icon: Shield
  }, {
    name: "Bridge",
    path: "/bridge",
    icon: Wand2
  }, {
    name: "Treasury",
    path: "/treasury",
    icon: Wallet
  }];

  return (
    <div className="min-h-screen flex flex-col bg-studio-cream overflow-hidden">
      <Ambient />
      
      <div className="flex flex-1 z-10">
        <Sidebar navItems={navItems} />
        
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
