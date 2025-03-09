
import React from "react";
import DistributionLayout from "@/layouts/distribution-layout";
import { Tv, Radio, Newspaper, Play, Calendar, BarChart3, Users } from "lucide-react";
import StatsCard from "@/components/ui/stats-card";

const MediaChannels = () => {
  const mediaAppearances = [
    {
      channel: "Music Tonight",
      type: "TV Show",
      date: "Sep 15, 2023",
      time: "8:00 PM EST",
      audience: "2.4M",
      status: "Confirmed"
    },
    {
      channel: "Morning Buzz",
      type: "Radio Interview",
      date: "Sep 18, 2023",
      time: "7:30 AM EST",
      audience: "850K",
      status: "Confirmed"
    },
    {
      channel: "Music Weekly",
      type: "Magazine Feature",
      date: "Oct 1, 2023",
      time: "Issue #42",
      audience: "1.2M",
      status: "Pending"
    },
    {
      channel: "Soundwave",
      type: "Podcast",
      date: "Sep 22, 2023",
      time: "Episode #128",
      audience: "350K",
      status: "Confirmed"
    }
  ];
  
  return (
    <DistributionLayout 
      title="Media Channels" 
      subtitle="Manage your traditional media appearances and press coverage"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Media Appearances"
          value="14"
          description="Last 90 days"
          icon={Tv}
          trend="up"
          trendValue="4"
          delay={0}
        />
        <StatsCard
          title="Media Reach"
          value="12.8M"
          description="Estimated audience"
          icon={Users}
          trend="up"
          trendValue="18.5%"
          delay={1}
        />
        <StatsCard
          title="Press Features"
          value="8"
          description="Last 90 days"
          icon={Newspaper}
          trend="up"
          trendValue="2"
          delay={2}
        />
        <StatsCard
          title="Upcoming Events"
          value="6"
          description="Next 30 days"
          icon={Calendar}
          delay={3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="glass-card p-6 lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Upcoming Media Appearances</h2>
          <div className="bg-white rounded-xl border border-studio-sand/30 overflow-hidden">
            <table className="min-w-full divide-y divide-studio-sand/30">
              <thead className="bg-studio-sand/10">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Channel</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date & Time</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Audience</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-studio-sand/30">
                {mediaAppearances.map((appearance, index) => (
                  <tr key={index} className="hover:bg-studio-sand/5">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{appearance.channel}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-muted-foreground">{appearance.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{appearance.date}</div>
                      <div className="text-xs text-muted-foreground">{appearance.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{appearance.audience}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        appearance.status === "Confirmed" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {appearance.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Media Contacts</h2>
            <div className="space-y-3">
              {[
                { name: "Sarah Johnson", role: "TV Producer", outlet: "Music Tonight", email: "sarah@music-tonight.com" },
                { name: "Mike Reynolds", role: "Radio Host", outlet: "Morning Buzz", email: "mike@morningbuzz.fm" },
                { name: "Emma Clark", role: "Editor", outlet: "Music Weekly", email: "emma@musicweekly.com" }
              ].map((contact, index) => (
                <div key={index} className="flex items-start p-3 bg-white rounded-lg border border-studio-sand/30">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <span className="text-purple-700 font-medium">{contact.name.charAt(0)}</span>
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-xs text-muted-foreground">{contact.role}, {contact.outlet}</div>
                    <div className="text-xs text-purple-600 mt-1">{contact.email}</div>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 px-4 text-sm bg-purple-100 text-purple-700 rounded-lg font-medium mt-2 hover:bg-purple-200 transition-colors">
                View All Contacts
              </button>
            </div>
          </div>
          
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Media Kit</h2>
            <div className="space-y-3">
              {[
                { name: "Press Release - New Album", type: "Document", size: "0.5 MB" },
                { name: "Artist Bio - 2023", type: "Document", size: "0.3 MB" },
                { name: "Press Photos", type: "Image Pack", size: "12 MB" },
                { name: "Logo Package", type: "Vector Files", size: "5 MB" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-studio-sand/30">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-studio-sand/20 mr-3">
                      <Newspaper className="h-4 w-4 text-studio-clay" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.type} • {item.size}</div>
                    </div>
                  </div>
                  <button className="text-xs text-purple-600 hover:text-purple-700">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DistributionLayout>
  );
};

export default MediaChannels;
