
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Milestone, Flame, Award, PartyPopper, Sparkles } from "lucide-react";
import DashboardLayout from "@/layouts/dashboard-layout";
import ProjectCampfire from "@/components/projects/ProjectCampfire";
import CollaboratorCircle from "@/components/projects/CollaboratorCircle";
import JourneyTimeline from "@/components/projects/JourneyTimeline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCelebrations from "@/components/projects/ProjectCelebrations";
import ContributionFlow from "@/components/projects/ContributionFlow";

const Projects = () => {
  const [activeProject, setActiveProject] = useState("campfire-stories");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Creative Campfire</h1>
          <p className="text-muted-foreground mt-2">
            Gather around and collaborate on shared journeys with your creative companions
          </p>
        </div>

        {/* Campfire visualization with collaborators */}
        <ProjectCampfire />

        {/* Tabs for different aspects of the campfire collaboration */}
        <Tabs defaultValue="journey" className="w-full">
          <TabsList className="w-full justify-start bg-white/50 p-1 rounded-xl">
            <TabsTrigger value="journey" className="data-[state=active]:bg-studio-accent data-[state=active]:text-white">
              <Milestone className="w-4 h-4 mr-2" />
              Shared Journey
            </TabsTrigger>
            <TabsTrigger value="contributions" className="data-[state=active]:bg-studio-accent data-[state=active]:text-white">
              <Flame className="w-4 h-4 mr-2" />
              Contributions
            </TabsTrigger>
            <TabsTrigger value="celebrations" className="data-[state=active]:bg-studio-accent data-[state=active]:text-white">
              <PartyPopper className="w-4 h-4 mr-2" />
              Celebrations
            </TabsTrigger>
            <TabsTrigger value="governance" className="data-[state=active]:bg-studio-accent data-[state=active]:text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              Shared Hearth
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="journey" className="mt-4">
            <JourneyTimeline />
          </TabsContent>
          
          <TabsContent value="contributions" className="mt-4">
            <ContributionFlow />
          </TabsContent>
          
          <TabsContent value="celebrations" className="mt-4">
            <ProjectCelebrations />
          </TabsContent>
          
          <TabsContent value="governance" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Flame className="w-5 h-5 mr-2 text-studio-accent" />
                  Tending the Flame
                </h3>
                <p className="text-sm text-studio-clay mb-4">
                  How we make decisions together and keep our creative fire burning
                </p>
                <div className="space-y-2">
                  {["Everyone contributes to project direction", "Weekly flame-keeping ritual", "Monthly retrospective around the fire"].map((practice, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/70 p-3 rounded-lg flex items-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="w-6 h-6 bg-studio-accent/20 rounded-full flex items-center justify-center mr-3 text-xs text-studio-accent font-medium">
                        {i + 1}
                      </span>
                      {practice}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-studio-accent" />
                  Collaborator Circle
                </h3>
                <p className="text-sm text-studio-clay mb-4">
                  Every voice matters in our creative community
                </p>
                <CollaboratorCircle />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
