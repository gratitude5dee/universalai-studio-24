
import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Content } from "@/components/ui/content";
import { Palette } from "lucide-react";

const WzrdStudio = () => {
  return (
    <DashboardLayout>
      <Content title="WZRD.tech Studio" subtitle="Create magical digital experiences with our advanced creative tools">
        <div className="glass-card p-6">
          <div className="flex items-center mb-4">
            <div className="bg-studio-highlight p-3 rounded-2xl mr-4">
              <Palette className="h-8 w-8 text-studio-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Studio</h2>
              <p className="text-muted-foreground">Advanced creative wizardry tools</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">Visual Design Tools</h3>
              <p className="text-sm text-studio-clay">Create stunning visuals with AI-powered design tools</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">Audio Engineering</h3>
              <p className="text-sm text-studio-clay">Craft immersive soundscapes with magical audio tools</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">Interactive Experiences</h3>
              <p className="text-sm text-studio-clay">Build engaging interactive content with no-code wizardry</p>
            </div>
          </div>
        </div>
      </Content>
    </DashboardLayout>
  );
};

export default WzrdStudio;
