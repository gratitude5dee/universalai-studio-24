
import React, { useState } from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Grid2x2, 
  List, 
  Tag, 
  Search, 
  Star, 
  Sparkles, 
  ArrowUpRight, 
  Activity,
  Sliders,
  BadgeDollarSign
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AgentCatalog from "@/components/marketplace/AgentCatalog";
import AgentComparison from "@/components/marketplace/AgentComparison";
import CategoryNav from "@/components/marketplace/CategoryNav";

const AgentMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Agent Marketplace</h1>
          <p className="text-muted-foreground mt-2">
            Discover, evaluate, and acquire pre-built AI agents for your creative projects
          </p>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="browse" className="flex items-center gap-2">
                <Grid2x2 className="w-4 h-4" />
                <span>Browse</span>
              </TabsTrigger>
              <TabsTrigger value="compare" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>Compare</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search agents..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setFilterOpen(!filterOpen)}
                className={filterOpen ? "bg-muted" : ""}
              >
                <Sliders className="h-4 w-4" />
              </Button>
              
              <div className="hidden sm:flex border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-r-none ${viewMode === 'grid' ? 'bg-muted' : ''}`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid2x2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-l-none ${viewMode === 'list' ? 'bg-muted' : ''}`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <TabsContent value="browse" className="space-y-6 mt-0">
            {filterOpen && (
              <div className="bg-muted/50 p-4 rounded-lg animate-in fade-in-50 slide-in-from-top-5 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Agent Type</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="bg-background">Creative</Button>
                      <Button variant="outline" size="sm" className="bg-background">Analytical</Button>
                      <Button variant="outline" size="sm" className="bg-background">Conversational</Button>
                      <Button variant="outline" size="sm" className="bg-background">Assistive</Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Pricing Model</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="bg-background">Free</Button>
                      <Button variant="outline" size="sm" className="bg-background">Subscription</Button>
                      <Button variant="outline" size="sm" className="bg-background">Pay-per-use</Button>
                      <Button variant="outline" size="sm" className="bg-background">One-time</Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Base Model</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="bg-background">GPT-4o</Button>
                      <Button variant="outline" size="sm" className="bg-background">Claude 3</Button>
                      <Button variant="outline" size="sm" className="bg-background">Gemini Pro</Button>
                      <Button variant="outline" size="sm" className="bg-background">Mixtral</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <CategoryNav selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              </div>
              <div className="md:col-span-3">
                <AgentCatalog viewMode={viewMode} searchQuery={searchQuery} selectedCategory={selectedCategory} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="compare" className="space-y-6 mt-0">
            <AgentComparison />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AgentMarketplace;
