
import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Content } from "@/components/ui/content";
import { Music } from "lucide-react";

const SyncLicensing = () => {
  return (
    <DashboardLayout>
      <Content title="Sync Licensing" subtitle="Manage synchronization licensing for your content">
        <div className="glass-card p-6">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-2xl mr-4">
              <Music className="h-8 w-8 text-purple-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Sync Licensing</h2>
              <p className="text-muted-foreground">License your content for film, TV, ads and more</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">License Catalog</h3>
              <p className="text-sm text-studio-clay">Browse and manage your catalog of licensable content</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">Opportunity Dashboard</h3>
              <p className="text-sm text-studio-clay">Track incoming licensing opportunities and requests</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">Revenue Reports</h3>
              <p className="text-sm text-studio-clay">Monitor licensing revenue and performance metrics</p>
            </div>
          </div>
        </div>
      </Content>
    </DashboardLayout>
  );
};

export default SyncLicensing;
