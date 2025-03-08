
import React from "react";
import { Card } from "@/components/ui/card";
import DashboardLayout from "@/layouts/dashboard-layout";

const CreateAgent = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Agent</h1>
          <p className="text-muted-foreground">
            Design and customize your new digital agent.
          </p>
        </div>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Agent Creation Form</h2>
          <p>Create and configure your new AI agent with customizable settings and capabilities.</p>
          
          {/* Agent creation form would go here */}
          <div className="mt-6 grid gap-4">
            <p className="text-muted-foreground">
              This is the new Create Agent page. The full implementation will contain a form for creating new agents.
            </p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CreateAgent;
