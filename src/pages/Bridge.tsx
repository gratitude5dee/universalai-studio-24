
import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { MagicPortal } from "@/components/bridge/MagicPortal";
import { AssetJourney } from "@/components/bridge/AssetJourney";
import { GuardianSpirits } from "@/components/bridge/GuardianSpirits";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, ArrowRightLeft, Shield } from "lucide-react";

const Bridge = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Magical Bridge</h1>
          <p className="text-muted-foreground">Connect your digital assets to the physical world with powerful bridging tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-subtle">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#9b87f5]/10 flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-[#9b87f5]" />
              </div>
              <h3 className="font-medium">Physical Product Linking</h3>
            </div>
            <p className="text-sm text-muted-foreground">Connect NFTs to physical products with secure verification methods</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-subtle">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#F97316]/10 flex items-center justify-center">
                <ArrowRightLeft className="w-5 h-5 text-[#F97316]" />
              </div>
              <h3 className="font-medium">Digital-Physical Twin</h3>
            </div>
            <p className="text-sm text-muted-foreground">Create digital twins of physical items or manifest digital assets physically</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-subtle">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#0EA5E9]" />
              </div>
              <h3 className="font-medium">Secure Verification</h3>
            </div>
            <p className="text-sm text-muted-foreground">Protect your bridged assets with robust security measures</p>
          </div>
        </div>

        <Tabs defaultValue="portal" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="portal">Magic Portal</TabsTrigger>
            <TabsTrigger value="journey">Asset Journey</TabsTrigger>
            <TabsTrigger value="guardians">Guardians</TabsTrigger>
          </TabsList>
          <TabsContent value="portal" className="pt-4">
            <MagicPortal />
          </TabsContent>
          <TabsContent value="journey" className="pt-4">
            <AssetJourney />
          </TabsContent>
          <TabsContent value="guardians" className="pt-4">
            <GuardianSpirits />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Bridge;
