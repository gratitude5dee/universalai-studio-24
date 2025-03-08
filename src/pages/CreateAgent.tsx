
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layouts/dashboard-layout";
import TableOfContents from "@/components/agent/TableOfContents";
import BasicInfoSection from "@/components/agent/BasicInfoSection";
import KnowledgeSection from "@/components/agent/KnowledgeSection";
import MessageExamplesSection from "@/components/agent/MessageExamplesSection";
import PostExamplesSection from "@/components/agent/PostExamplesSection";
import StyleSection from "@/components/agent/StyleSection";
import LoreSection from "@/components/agent/LoreSection";
import TopicsAndAdjectives from "@/components/agent/TopicsAndAdjectives";
import BioSection from "@/components/agent/BioSection";
import SecretsSection from "@/components/agent/SecretsSection";
import AgentConfirmation from "@/components/agent/AgentConfirmation";

const CreateAgent = () => {
  const [currentStep, setCurrentStep] = useState<'form' | 'secrets' | 'confirmation'>('form');
  const [activeSection, setActiveSection] = useState<string>("name");

  const handleContinue = () => {
    if (currentStep === 'form') {
      setCurrentStep('secrets');
    } else if (currentStep === 'secrets') {
      setCurrentStep('confirmation');
    }
  };

  const handleGoBack = () => {
    if (currentStep === 'confirmation') {
      setCurrentStep('secrets');
    } else if (currentStep === 'secrets') {
      setCurrentStep('form');
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const sections = [
      "startTemplate", "name", "avatar", "modelProvider", "clients", "plugins", 
      "bio", "lore", "knowledge", "messageExamples", "postExamples", "style", 
      "topics", "adjectives"
    ];
    
    const scrollPosition = e.currentTarget.scrollTop;
    
    // Find which section is currently in view
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { top } = element.getBoundingClientRect();
        const offset = 100; // Adjust based on your layout
        
        if (top <= offset) {
          setActiveSection(section);
        }
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-8">
          <div className="w-3/4">
            {currentStep === 'form' && (
              <div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2">Create New Agent</h1>
                  <p className="text-muted-foreground mb-6">
                    Design and customize your new digital agent with unique personality traits and knowledge.
                  </p>
                </div>
                
                <div 
                  className="bg-studio-cream rounded-xl text-studio-charcoal max-h-[calc(100vh-200px)] overflow-y-auto pr-4"
                  onScroll={handleScroll}
                >
                  <div className="pb-24">
                    <BasicInfoSection />
                    <BioSection />
                    <LoreSection />
                    <KnowledgeSection />
                    <MessageExamplesSection />
                    <PostExamplesSection />
                    <StyleSection />
                    <TopicsAndAdjectives />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={handleContinue}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-6 text-lg font-medium"
                  >
                    Continue to Settings
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 'secrets' && (
              <div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
                  <p className="text-muted-foreground mb-6">
                    Add the secrets for any services your AI agent will access, including LLMs.
                    Click <a href="#" className="text-studio-accent underline">here</a> to view all the supported secrets.
                  </p>
                </div>
                
                <div className="bg-studio-cream rounded-xl text-studio-charcoal pb-24">
                  <SecretsSection />
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={handleContinue}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-6 text-lg font-medium"
                  >
                    Review character
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 'confirmation' && (
              <div className="bg-studio-cream rounded-xl text-studio-charcoal pb-6">
                <AgentConfirmation 
                  name="Trump"
                  modelProvider="OpenAI"
                  clients={["X (Twitter)"]}
                  onGoBack={handleGoBack}
                />
              </div>
            )}
          </div>
          
          <div className="w-1/4">
            {currentStep === 'form' && <TableOfContents activeSection={activeSection} />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateAgent;
