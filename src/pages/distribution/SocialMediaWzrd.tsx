
import React, { useState } from "react";
import DistributionLayout from "@/layouts/distribution-layout";
import { 
  Instagram, Facebook, Twitter, Youtube, 
  TrendingUp, Calendar, BarChart, Award, Plus, Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const SocialMediaWzrd = () => {
  const [activeContent, setActiveContent] = useState("insights");

  // Mock data for social platforms
  const platforms = [
    { 
      name: "Instagram", 
      icon: Instagram, 
      color: "#E1306C", 
      followers: "124.5K",
      engagement: "3.2%",
      posts: 342,
      growth: "+2.4%"
    },
    { 
      name: "Facebook", 
      icon: Facebook, 
      color: "#1877F2", 
      followers: "98.2K",
      engagement: "1.8%",
      posts: 210,
      growth: "+0.9%"
    },
    { 
      name: "Twitter", 
      icon: Twitter, 
      color: "#1DA1F2", 
      followers: "76.3K",
      engagement: "2.5%",
      posts: 528,
      growth: "+3.1%"
    },
    { 
      name: "YouTube", 
      icon: Youtube, 
      color: "#FF0000", 
      followers: "45.8K",
      engagement: "4.7%",
      posts: 86,
      growth: "+5.2%"
    }
  ];

  // Mock data for scheduled posts
  const scheduledPosts = [
    { 
      id: 1, 
      title: "New Single Teaser", 
      platform: "Instagram", 
      date: "Tomorrow, 10:00 AM",
      status: "Scheduled",
      thumbnail: "https://placehold.co/120x80/9b87f5/FFFFFF"
    },
    { 
      id: 2, 
      title: "Behind the Scenes Video", 
      platform: "YouTube", 
      date: "Oct 28, 2:30 PM",
      status: "Draft",
      thumbnail: "https://placehold.co/120x80/FF0000/FFFFFF"
    },
    { 
      id: 3, 
      title: "Album Launch Announcement", 
      platform: "All Platforms", 
      date: "Oct 30, 12:00 PM",
      status: "Scheduled",
      thumbnail: "https://placehold.co/120x80/1DA1F2/FFFFFF"
    },
  ];

  return (
    <DistributionLayout 
      title="Social Media WZRD" 
      subtitle="Manage and optimize your social media presence"
    >
      {/* Platform Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platforms.map((platform) => {
          const PlatformIcon = platform.icon;
          return (
            <motion.div 
              key={platform.name}
              className="glass-card p-5 flex flex-col"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full mr-3" style={{ backgroundColor: `${platform.color}20` }}>
                  <PlatformIcon style={{ color: platform.color }} className="h-5 w-5" />
                </div>
                <span className="font-medium">{platform.name}</span>
              </div>
              
              <div className="mt-2">
                <div className="text-2xl font-semibold">{platform.followers}</div>
                <div className="text-sm text-studio-clay">Followers</div>
              </div>
              
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="text-sm font-medium">{platform.engagement}</div>
                  <div className="text-xs text-studio-clay">Engagement</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">{platform.posts}</div>
                  <div className="text-xs text-studio-clay">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-emerald-500">{platform.growth}</div>
                  <div className="text-xs text-studio-clay">Growth</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Content Management Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Content Management</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Calendar className="h-4 w-4" />
              Calendar
            </Button>
            <Button variant="default" size="sm" className="bg-studio-accent gap-1">
              <Plus className="h-4 w-4" />
              Create Post
            </Button>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-xl border border-studio-sand/30 overflow-hidden">
          <div className="flex border-b border-studio-sand/30">
            <button 
              className={`px-4 py-3 text-sm font-medium ${activeContent === "insights" ? "border-b-2 border-studio-accent text-studio-accent" : "text-studio-clay"}`}
              onClick={() => setActiveContent("insights")}
            >
              Insights & Analytics
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium ${activeContent === "scheduled" ? "border-b-2 border-studio-accent text-studio-accent" : "text-studio-clay"}`}
              onClick={() => setActiveContent("scheduled")}
            >
              Scheduled Posts
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium ${activeContent === "posts" ? "border-b-2 border-studio-accent text-studio-accent" : "text-studio-clay"}`}
              onClick={() => setActiveContent("posts")}
            >
              Published Posts
            </button>
          </div>

          <div className="p-4">
            {activeContent === "insights" && (
              <div className="space-y-4">
                <div className="glass-card p-4">
                  <h3 className="text-lg font-medium mb-3">Growth Insights</h3>
                  <div className="h-64 flex items-center justify-center bg-studio-sand/20 rounded-lg">
                    <div className="text-studio-clay">Interactive Analytics Chart</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-studio-sand/30">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-4 w-4 text-emerald-500 mr-2" />
                      <span className="font-medium">Best Performance</span>
                    </div>
                    <div className="text-sm">Instagram Reels: +216% engagement</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl border border-studio-sand/30">
                    <div className="flex items-center mb-2">
                      <BarChart className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="font-medium">Audience Growth</span>
                    </div>
                    <div className="text-sm">+3.2% in the last 30 days</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl border border-studio-sand/30">
                    <div className="flex items-center mb-2">
                      <Award className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="font-medium">Top Content</span>
                    </div>
                    <div className="text-sm">Video: "Studio Session" (8.4K likes)</div>
                  </div>
                </div>
              </div>
            )}
            
            {activeContent === "scheduled" && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-studio-sand/30">
                        <th className="px-4 py-2 text-left text-sm font-medium text-studio-clay">Content</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-studio-clay">Platform</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-studio-clay">Date</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-studio-clay">Status</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-studio-clay">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduledPosts.map((post) => (
                        <tr key={post.id} className="border-b border-studio-sand/30 hover:bg-studio-sand/10">
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <img src={post.thumbnail} alt={post.title} className="w-12 h-8 object-cover rounded mr-3" />
                              <span className="font-medium">{post.title}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{post.platform}</td>
                          <td className="px-4 py-3 text-sm">{post.date}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              post.status === "Scheduled" 
                                ? "bg-emerald-100 text-emerald-700" 
                                : "bg-amber-100 text-amber-700"
                            }`}>
                              {post.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <Button variant="ghost" size="sm">Edit</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeContent === "posts" && (
              <div className="p-8 text-center">
                <h3 className="text-lg font-medium mb-2">Published Content Grid</h3>
                <p className="text-studio-clay mb-4">View and analyze your published content across all platforms</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div key={item} className="bg-studio-sand/20 rounded-lg h-28 flex items-center justify-center">
                      Post {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Content Suggestions */}
      <div className="mt-8 glass-card p-5 bg-gradient-to-br from-purple-50 to-white">
        <div className="flex items-center mb-4">
          <div className="bg-[#9b87f5]/20 p-2 rounded-xl mr-3">
            <Zap className="h-5 w-5 text-[#9b87f5]" />
          </div>
          <h2 className="text-xl font-semibold">AI Content Suggestions</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-studio-sand/30">
            <h3 className="font-medium mb-2">Trend-Based Post</h3>
            <p className="text-sm text-studio-clay mb-3">Create a reel using the trending sound "Hypnotic Rhythm" for maximum reach.</p>
            <Button variant="outline" size="sm" className="w-full">Generate Content</Button>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-studio-sand/30">
            <h3 className="font-medium mb-2">Engagement Booster</h3>
            <p className="text-sm text-studio-clay mb-3">Post a poll asking fans to choose between two unreleased track samples.</p>
            <Button variant="outline" size="sm" className="w-full">Generate Content</Button>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-studio-sand/30">
            <h3 className="font-medium mb-2">Cross-Platform Campaign</h3>
            <p className="text-sm text-studio-clay mb-3">Launch a coordinated release teaser across all platforms with custom content.</p>
            <Button variant="outline" size="sm" className="w-full">Generate Campaign</Button>
          </div>
        </div>
      </div>
    </DistributionLayout>
  );
};

export default SocialMediaWzrd;
