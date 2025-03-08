
import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeatherKingdom } from "@/components/observability/WeatherKingdom";
import { GuardianAlerts } from "@/components/observability/GuardianAlerts";
import { ResourceCycles } from "@/components/observability/ResourceCycles";
import { LivingEcosystem } from "@/components/observability/LivingEcosystem";

const Observability = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Magical Observatory</h1>
          <p className="text-muted-foreground">Monitor your digital realm with mindful guardianship</p>
        </div>

        <Tabs defaultValue="weather" className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="weather">Weather Kingdom</TabsTrigger>
            <TabsTrigger value="guardians">Guardian Spirits</TabsTrigger>
            <TabsTrigger value="resources">Natural Cycles</TabsTrigger>
            <TabsTrigger value="ecosystem">Living Ecosystem</TabsTrigger>
          </TabsList>
          <TabsContent value="weather" className="pt-4">
            <WeatherKingdom />
          </TabsContent>
          <TabsContent value="guardians" className="pt-4">
            <GuardianAlerts />
          </TabsContent>
          <TabsContent value="resources" className="pt-4">
            <ResourceCycles />
          </TabsContent>
          <TabsContent value="ecosystem" className="pt-4">
            <LivingEcosystem />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Observability;
