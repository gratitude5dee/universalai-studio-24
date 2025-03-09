
import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Content } from "@/components/ui/content";
import { Link } from "lucide-react";

const OnChainDistribution = () => {
  return (
    <DashboardLayout>
      <Content title="On-Chain Distribution" subtitle="Manage blockchain-based content distribution">
        <div className="glass-card p-6">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-2xl mr-4">
              <Link className="h-8 w-8 text-purple-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">On-Chain Distribution</h2>
              <p className="text-muted-foreground">Decentralized content sharing solutions</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">NFT Releases</h3>
              <p className="text-sm text-studio-clay">Create and manage NFT collections for your content</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">Token-Gated Content</h3>
              <p className="text-sm text-studio-clay">Distribute exclusive content to token holders</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">On-Chain Analytics</h3>
              <p className="text-sm text-studio-clay">Monitor blockchain engagement and distribution metrics</p>
            </div>
          </div>
        </div>
      </Content>
    </DashboardLayout>
  );
};

export default OnChainDistribution;
