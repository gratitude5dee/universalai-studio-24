
import React from "react";
import { motion } from "framer-motion";
import { Bell, Search, Menu } from "lucide-react";
import Greeting from "./greeting";
import AvatarWithStatus from "./avatar-with-status";

const Header = () => {
  const notifications = 3;
  
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-4 md:p-8 md:pb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 z-10"
    >
      <div className="flex items-center">
        <button className="md:hidden mr-4 text-studio-charcoal">
          <Menu size={24} />
        </button>
        <Greeting />
      </div>
      
      <div className="flex items-center space-x-4 w-full md:w-auto">
        <div className="w-full md:w-64 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search projects, assets..." 
            className="w-full bg-white/70 border border-studio-sand/50 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-studio-accent/30 transition-all"
          />
        </div>
        
        <div className="relative">
          <Bell className="h-5 w-5 text-studio-charcoal/70 hover:text-studio-charcoal cursor-pointer transition-colors" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-studio-accent text-[10px] font-medium text-white">
              {notifications}
            </span>
          )}
        </div>
        
        <AvatarWithStatus 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          status="online"
          size="md"
        />
      </div>
    </motion.header>
  );
};

export default Header;
