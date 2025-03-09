
import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Content } from "@/components/ui/content";
import { Globe } from "lucide-react";

const SocialMediaWzrd = () => {
  return (
    <DashboardLayout>
      <Content title="Social Media WZRD" subtitle="Manage and optimize your social media distribution">
        <div className="glass-card p-6">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-2xl mr-4">
              <Globe className="h-8 w-8 text-purple-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Social Media WZRD</h2>
              <p className="text-muted-foreground">Powerful tools to enhance your social media presence</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">Content Calendar</h3>
              <p className="text-sm text-studio-clay">Schedule and plan your social media content strategy</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
              <p className="text-sm text-studio-clay">Track engagement and performance across platforms</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">AI Content Generator</h3>
              <p className="text-sm text-studio-clay">Create engaging social media content with AI assistance</p>
            </div>
          </div>
        </div>
      </Content>
    </DashboardLayout>
  );
};

export default SocialMediaWzrd;
