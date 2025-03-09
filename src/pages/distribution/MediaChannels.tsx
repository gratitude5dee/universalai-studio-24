
import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Content } from "@/components/ui/content";
import { Tv } from "lucide-react";

const MediaChannels = () => {
  return (
    <DashboardLayout>
      <Content title="Media Channels" subtitle="Manage traditional media distribution channels">
        <div className="glass-card p-6">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-2xl mr-4">
              <Tv className="h-8 w-8 text-purple-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Media Channels</h2>
              <p className="text-muted-foreground">Distribution across traditional media platforms</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">Television</h3>
              <p className="text-sm text-studio-clay">Distribute content to television networks and platforms</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">Radio</h3>
              <p className="text-sm text-studio-clay">Manage radio distribution and promotional campaigns</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">Print Media</h3>
              <p className="text-sm text-studio-clay">Distribute to newspapers, magazines and physical publications</p>
            </div>
          </div>
        </div>
      </Content>
    </DashboardLayout>
  );
};

export default MediaChannels;
