
import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Tree, GitBranch, ArrowUpRight, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const ThreadOfLife = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Thread of Life</h1>
          <p className="text-muted-foreground">Track the lineage and transformations of your real-world assets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-subtle">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
                <Tree className="w-5 h-5 text-[#22c55e]" />
              </div>
              <h3 className="font-medium">Asset Lineage</h3>
            </div>
            <p className="text-sm text-muted-foreground">Track the origins and transformations of your physical assets</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-subtle">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#6366f1]/10 flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-[#6366f1]" />
              </div>
              <h3 className="font-medium">Transformation Records</h3>
            </div>
            <p className="text-sm text-muted-foreground">Document every change in your asset's lifecycle</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-subtle">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#f59e0b]/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <h3 className="font-medium">Historical Timeline</h3>
            </div>
            <p className="text-sm text-muted-foreground">View the complete history of your asset through time</p>
          </div>
        </div>

        <Tabs defaultValue="lineage" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="lineage">Asset Lineage</TabsTrigger>
            <TabsTrigger value="transformations">Transformations</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          <TabsContent value="lineage" className="pt-4">
            <div className="bg-white p-6 rounded-xl shadow-subtle">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Asset Lineage Visualization</h3>
                <Button variant="outline" size="sm">
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              
              <div className="flex justify-center items-center h-64 bg-studio-sand/10 rounded-lg border border-dashed border-studio-sand">
                <p className="text-muted-foreground">Select an asset to view its lineage tree</p>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-studio-sand/10 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Asset Selection</h4>
                  <p className="text-sm text-muted-foreground">Choose from your collection of registered assets</p>
                  <Button className="w-full mt-4" size="sm">Browse Assets</Button>
                </div>
                
                <div className="bg-studio-sand/10 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Lineage Depth</h4>
                  <p className="text-sm text-muted-foreground">Determine how many generations to display in the visualization</p>
                  <div className="flex items-center justify-between mt-4">
                    <Button variant="outline" size="sm">1 Gen</Button>
                    <Button variant="outline" size="sm">3 Gen</Button>
                    <Button variant="outline" size="sm">All</Button>
                  </div>
                </div>
                
                <div className="bg-studio-sand/10 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">View Options</h4>
                  <p className="text-sm text-muted-foreground">Customize the display of your asset lineage</p>
                  <Button className="w-full mt-4" size="sm" variant="outline">Customize View</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="transformations" className="pt-4">
            <div className="bg-white p-6 rounded-xl shadow-subtle">
              <h3 className="text-lg font-medium mb-6">Transformation Records</h3>
              <p className="text-muted-foreground mb-4">This tab will display the transformation records for your assets.</p>
            </div>
          </TabsContent>
          <TabsContent value="timeline" className="pt-4">
            <div className="bg-white p-6 rounded-xl shadow-subtle">
              <h3 className="text-lg font-medium mb-6">Historical Timeline</h3>
              <p className="text-muted-foreground mb-4">This tab will display the complete historical timeline for your assets.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ThreadOfLife;
