
import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Content } from "@/components/ui/content";
import { UserRound } from "lucide-react";

const WzrdCompanions = () => {
  return (
    <DashboardLayout>
      <Content title="WZRD.tech Companions" subtitle="Discover AI companions to assist in your magical journey">
        <div className="glass-card p-6">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-2xl mr-4">
              <UserRound className="h-8 w-8 text-purple-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Companions</h2>
              <p className="text-muted-foreground">AI assistants for your magical journey</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">Research Assistants</h3>
              <p className="text-sm text-studio-clay">AI companions that help you explore magical knowledge</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">Creative Collaborators</h3>
              <p className="text-sm text-studio-clay">AI partners that enhance your creative magical projects</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-studio-sand/30">
              <h3 className="text-lg font-medium mb-2">Magical Mentors</h3>
              <p className="text-sm text-studio-clay">Guidance and coaching from experienced AI wizards</p>
            </div>
          </div>
        </div>
      </Content>
    </DashboardLayout>
  );
};

export default WzrdCompanions;
