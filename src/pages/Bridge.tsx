
import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { MagicPortal } from "@/components/bridge/MagicPortal";
import { AssetJourney } from "@/components/bridge/AssetJourney";
import { GuardianSpirits } from "@/components/bridge/GuardianSpirits";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Bridge = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Magical Bridge</h1>
          <p className="text-muted-foreground">Cross between digital and physical realms with creative intent</p>
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
