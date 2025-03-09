
import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Content } from "@/components/ui/content";
import { User } from "lucide-react";

const IndependentChannels = () => {
  return (
    <DashboardLayout>
      <Content title="Independent Channels" subtitle="Manage distribution through independent creator channels">
        <div className="glass-card p-6">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-2xl mr-4">
              <User className="h-8 w-8 text-purple-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Independent Channels</h2>
              <p className="text-muted-foreground">Distribution through individual creators and partners</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">Creator Partnerships</h3>
              <p className="text-sm text-studio-clay">Manage collaborations with independent content creators</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">Ambassador Program</h3>
              <p className="text-sm text-studio-clay">Track and manage your brand ambassador network</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">Independent Releases</h3>
              <p className="text-sm text-studio-clay">Distribute content through independent platforms and channels</p>
            </div>
          </div>
        </div>
      </Content>
    </DashboardLayout>
  );
};

export default IndependentChannels;
