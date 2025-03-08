
import React, { useState } from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeatherKingdom } from "@/components/observability/WeatherKingdom";
import { GuardianAlerts } from "@/components/observability/GuardianAlerts";
import { ResourceCycles } from "@/components/observability/ResourceCycles";
import { LivingEcosystem } from "@/components/observability/LivingEcosystem";
import { MagicalDashboard } from "@/components/observability/MagicalDashboard";
import { Button } from "@/components/ui/button";
import { Eye, BarChart3, Shield, Droplets, Leaf, Layout } from "lucide-react";

const Observability = () => {
  const [activeView, setActiveView] = useState<"dashboard" | "observatory">("dashboard");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Magical Observatory</h1>
          <p className="text-muted-foreground">Monitor your digital realm with mindful guardianship</p>
        </div>

        <div className="flex space-x-4 mb-6">
          <Button 
            variant={activeView === "dashboard" ? "default" : "outline"} 
            onClick={() => setActiveView("dashboard")}
            className="gap-2"
          >
            <Layout size={18} />
            Command Center
          </Button>
          <Button 
            variant={activeView === "observatory" ? "default" : "outline"} 
            onClick={() => setActiveView("observatory")}
            className="gap-2"
          >
            <Eye size={18} />
            Observatory View
          </Button>
        </div>

        {activeView === "dashboard" ? (
          <MagicalDashboard />
        ) : (
          <Tabs defaultValue="weather" className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl">
              <TabsTrigger value="weather" className="flex items-center gap-2">
                <BarChart3 size={16} /> Weather Kingdom
              </TabsTrigger>
              <TabsTrigger value="guardians" className="flex items-center gap-2">
                <Shield size={16} /> Guardian Spirits
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <Droplets size={16} /> Natural Cycles
              </TabsTrigger>
              <TabsTrigger value="ecosystem" className="flex items-center gap-2">
                <Leaf size={16} /> Living Ecosystem
              </TabsTrigger>
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
        )}
      </div>
    </DashboardLayout>
  );
};

export default Observability;
