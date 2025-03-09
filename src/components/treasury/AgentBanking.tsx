
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSetupWizard from "@/components/treasury/banking/AccountSetupWizard";
import EmptyState from "@/components/treasury/banking/EmptyState";
import AccountDashboard from "@/components/treasury/banking/AccountDashboard";
import BankingControls from "@/components/treasury/banking/BankingControls";
import ActivityTab from "@/components/treasury/banking/ActivityTab";
import ApiIntegration from "@/components/treasury/banking/ApiIntegration";

const AgentBanking: React.FC = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const [currentTab, setCurrentTab] = useState("overview");
  const [wizardStep, setWizardStep] = useState(1);
  const [totalSteps] = useState(6);
  
  const startWizard = () => {
    setHasAccount(false);
  };

  const finishWizard = () => {
    setHasAccount(true);
    toast("Agent account created!", {
      description: "Your agent now has a fully functional bank account",
      icon: <Landmark className="h-4 w-4 text-studio-accent" />,
    });
  };

  return (
    <div className="mt-6">
      <div className="mb-5">
        <h2 className="text-2xl font-bold mb-1">Agent Banking Portal</h2>
        <p className="text-muted-foreground">
          Empower your AI agents with autonomous financial capabilities
        </p>
      </div>
      
      {!hasAccount ? (
        <AccountSetupWizard 
          wizardStep={wizardStep} 
          totalSteps={totalSteps} 
          setWizardStep={setWizardStep} 
          finishWizard={finishWizard} 
          setHasAccount={setHasAccount}
        />
      ) : (
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="mb-6 bg-white/80 backdrop-blur-md border border-studio-sand/30 rounded-xl p-1 shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-studio-accent data-[state=active]:text-white">
              Account Overview
            </TabsTrigger>
            <TabsTrigger value="controls" className="data-[state=active]:bg-studio-accent data-[state=active]:text-white">
              Banking Controls
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-studio-accent data-[state=active]:text-white">
              Transaction Activity
            </TabsTrigger>
            <TabsTrigger value="integration" className="data-[state=active]:bg-studio-accent data-[state=active]:text-white">
              API Integration
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="outline-none">
            {hasAccount ? <AccountDashboard /> : <EmptyState startWizard={startWizard} />}
          </TabsContent>
          
          <TabsContent value="controls" className="outline-none">
            <BankingControls />
          </TabsContent>
          
          <TabsContent value="activity" className="outline-none">
            <ActivityTab />
          </TabsContent>
          
          <TabsContent value="integration" className="outline-none">
            <ApiIntegration />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

import { Landmark } from "lucide-react";
import { toast } from "sonner";

export default AgentBanking;
