
import React from "react";
import DistributionLayout from "@/layouts/distribution-layout";
import { Globe, TrendingUp, Play, ThumbsUp, BarChart3, Users } from "lucide-react";
import StatsCard from "@/components/ui/stats-card";

const SocialMediaWzrd = () => {
  const platforms = [
    { 
      name: "Instagram", 
      icon: "/placeholder.svg", 
      followers: "145K", 
      engagement: "4.2%",
      posts: 86,
      contentTypes: ["Reels", "Stories", "Posts"]
    },
    { 
      name: "TikTok", 
      icon: "/placeholder.svg", 
      followers: "312K", 
      engagement: "6.8%",
      posts: 124,
      contentTypes: ["Videos", "Challenges", "Duets"]
    },
    { 
      name: "YouTube", 
      icon: "/placeholder.svg", 
      followers: "98K", 
      engagement: "3.5%",
      posts: 42,
      contentTypes: ["Music Videos", "Shorts", "Live"]
    },
    { 
      name: "Twitter", 
      icon: "/placeholder.svg", 
      followers: "76K", 
      engagement: "2.1%",
      posts: 218,
      contentTypes: ["Tweets", "Spaces", "Polls"]
    }
  ];
  
  return (
    <DistributionLayout 
      title="Social Media WZRD" 
      subtitle="Manage and optimize your social media presence across platforms"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Followers"
          value="631K"
          description="Across all platforms"
          icon={Users}
          trend="up"
          trendValue="15.8%"
          delay={0}
        />
        <StatsCard
          title="Engagement Rate"
          value="4.7%"
          description="30-day average"
          icon={ThumbsUp}
          trend="up"
          trendValue="0.5%"
          delay={1}
        />
        <StatsCard
          title="Content Reach"
          value="2.8M"
          description="Last 30 days"
          icon={Globe}
          trend="up"
          trendValue="22.3%"
          delay={2}
        />
        <StatsCard
          title="Content Created"
          value="47"
          description="Last 30 days"
          icon={Play}
          trend="down"
          trendValue="3.2%"
          delay={3}
        />
      </div>

      <div className="glass-card p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Platform Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platforms.map((platform, index) => (
            <div key={platform.name} className="bg-white p-6 rounded-xl border border-studio-sand/30 hover:shadow-md transition-all">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-100 mr-4">
                  <img src={platform.icon} alt={platform.name} className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{platform.name}</h3>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground">{platform.followers} followers</span>
                    <span className="text-xs text-green-500 ml-2">+{platform.engagement} engagement</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active campaigns</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Posts this month</span>
                  <span className="font-medium">{platform.posts}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Content types</span>
                  <span className="font-medium">{platform.contentTypes.join(", ")}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-studio-sand/30">
                <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
                  Manage {platform.name} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="glass-card p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Content Calendar</h2>
        <div className="bg-white rounded-xl border border-studio-sand/30 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Upcoming Posts</h3>
            <button className="text-sm text-purple-600 font-medium">Create New +</button>
          </div>
          
          <div className="space-y-4">
            {[
              { date: "Today, 4:00 PM", platform: "Instagram", type: "Story", title: "New Single Teaser", status: "Scheduled" },
              { date: "Tomorrow, 10:00 AM", platform: "TikTok", type: "Video", title: "Dance Challenge", status: "Draft" },
              { date: "Sep 5, 12:00 PM", platform: "YouTube", type: "Premiere", title: "Music Video Release", status: "Scheduled" },
              { date: "Sep 7, 3:00 PM", platform: "Twitter", type: "Thread", title: "Behind The Scenes", status: "Idea" },
            ].map((post, index) => (
              <div key={index} className="flex items-center p-3 rounded-lg hover:bg-studio-sand/10 transition-colors">
                <div className="w-12 text-center">
                  <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                    post.status === "Scheduled" ? "bg-green-100 text-green-700" :
                    post.status === "Draft" ? "bg-yellow-100 text-yellow-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>
                    {post.status}
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-medium">{post.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {post.platform} • {post.type}
                  </div>
                </div>
                <div className="text-sm text-right text-muted-foreground">
                  {post.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DistributionLayout>
  );
};

export default SocialMediaWzrd;
