
import React from "react";
import { motion } from "framer-motion";
import { Camera, Users, PlayCircle, Sparkles, TrendingUp, Zap } from "lucide-react";
import DashboardLayout from "@/layouts/dashboard-layout";
import Gallery from "@/components/ui/gallery";
import StatsCard from "@/components/ui/stats-card";
import Earnings from "@/components/ui/earnings";

const galleryItems = [
  {
    id: "1",
    title: "Mountain Sunrise",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
    likes: 243,
    views: 1024,
    comments: 42,
  },
  {
    id: "2",
    title: "Urban Architecture",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
    likes: 187,
    views: 876,
    comments: 29,
  },
  {
    id: "3",
    title: "Ocean Waves",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2626&q=80",
    likes: 312,
    views: 1452,
    comments: 56,
  },
  {
    id: "4",
    title: "Forest Path",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
    likes: 178,
    views: 932,
    comments: 34,
  },
];

const earningsData = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 1800 },
  { name: "Mar", value: 1600 },
  { name: "Apr", value: 2200 },
  { name: "May", value: 1900 },
  { name: "Jun", value: 2700 },
  { name: "Jul", value: 3500 },
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatsCard 
            title="Total Photos" 
            value="1,024" 
            icon={Camera}
            trend="up"
            trendValue="12%"
            delay={0}
          />
          <StatsCard 
            title="Followers" 
            value="45.2K" 
            icon={Users}
            trend="up"
            trendValue="8%"
            delay={1}
          />
          <StatsCard 
            title="Engagement" 
            value="24%" 
            icon={Sparkles}
            trend="up"
            trendValue="5%"
            delay={2}
          />
          <StatsCard 
            title="Video Views" 
            value="128K" 
            icon={PlayCircle}
            trend="up"
            trendValue="18%"
            delay={3}
          />
        </div>
        
        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Earnings Chart */}
          <div className="lg:col-span-2">
            <Earnings 
              data={earningsData}
              total={3500}
              trend="up"
              trendValue="+28% from last month"
            />
          </div>
          
          {/* Performance Highlights */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium">Performance</h3>
              <div className="bg-studio-accent/10 p-2 rounded-xl">
                <TrendingUp className="h-5 w-5 text-studio-accent" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-studio-sand/30 pb-3">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Zap className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Top performer</h4>
                    <p className="text-xs text-muted-foreground">Mountain Sunrise</p>
                  </div>
                </div>
                <span className="text-sm font-medium">24.8K</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-studio-sand/30 pb-3">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Users className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">New followers</h4>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </div>
                </div>
                <span className="text-sm font-medium">+842</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <PlayCircle className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Video engagement</h4>
                    <p className="text-xs text-muted-foreground">Above average</p>
                  </div>
                </div>
                <span className="text-sm font-medium">18.2%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Gallery Section */}
        <div>
          <Gallery items={galleryItems} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
