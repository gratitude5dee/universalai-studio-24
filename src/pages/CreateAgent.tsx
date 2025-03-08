<lov-code>
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bot, 
  Sparkles, 
  Cpu, 
  ArrowRight,
  Paintbrush, 
  Music, 
  FileText,
  Layers,
  Zap,
  Settings,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateAgent = () => {
  const [currentStep, setCurrentStep] = useState<'form' | 'secrets' | 'confirmation'>('form');
  const [activeSection, setActiveSection] = useState<string>("name");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  
  // New wizard state
  const [wizardStep, setWizardStep] = useState(1);
  const [agentPurpose, setAgentPurpose] = useState("art");
  const [blockchain, setBlockchain] = useState("ethereum");
  const [aiModel, setAiModel] = useState("gpt-4o");
  const [outputFormat, setOutputFormat] = useState("image");
  const [feePercentage, setFeePercentage] = useState("5");

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

  const handleNextWizardStep = () => {
    if (wizardStep < 6) {
      setWizardStep(wizardStep + 1);
    }
  };

  const handlePrevWizardStep = () => {
    if (wizardStep > 1) {
      setWizardStep(wizardStep - 1);
    }
  };

  const renderWizardStep = () => {
    switch (wizardStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Agent Purpose & Capabilities</h2>
              <p className="text-muted-foreground">Select what your AI agent will create or manage</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className={`p-6 rounded-xl border cursor-pointer flex flex-col items-center text-center transition-all ${agentPurpose === 'art' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-200'}`}
                onClick={() => setAgentPurpose('art')}
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <Paintbrush className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="font-medium mb-1">Generative Art</h3>
                <p className="text-sm text-muted-foreground">Creates visual art based on prompts and inputs</p>
              </div>
              
              <div 
                className={`p-6 rounded-xl border cursor-pointer flex flex-col items-center text-center transition-all ${agentPurpose === 'music' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}
                onClick={() => setAgentPurpose('music')}
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <Music className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-medium mb-1">Music Composition</h3>
                <p className="text-sm text-muted-foreground">Generates original music and audio compositions</p>
              </div>
              
              <div 
                className={`p-6 rounded-xl border cursor-pointer flex flex-col items-center text-center transition-all ${agentPurpose === 'writing' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-200'}`}
                onClick={() => setAgentPurpose('writing')}
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-medium mb-1">Creative Writing</h3>
                <p className="text-sm text-muted-foreground">Writes stories, poetry, articles, and other text</p>
              </div>
            </div>
            
            <div className="pt-4">
              <Label htmlFor="purpose-description">Description</Label>
              <Textarea 
                id="purpose-description" 
                placeholder="Describe what your agent will do in more detail..."
                className="h-24 mt-2"
              />
            </div>
            
            <div className="pt-2 pb-6">
              <button 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm flex items-center text-muted-foreground hover:text-gray-900"
              >
                {showAdvanced ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
                {showAdvanced ? "Hide advanced options" : "Show advanced options"}
              </button>
              
              {showAdvanced && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Advanced Capabilities</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input type="checkbox" id="cap-autonomous" className="mr-2" />
                      <label htmlFor="cap-autonomous" className="text-sm">Autonomous operation</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="cap-interactive" className="mr-2" />
                      <label htmlFor="cap-interactive" className="text-sm">Interactive feedback loops</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="cap-collaboration" className="mr-2" />
                      <label htmlFor="cap-collaboration" className="text-sm">Multi-agent collaboration</label>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
              <p className="text-sm text-blue-700">
                <strong>AI Assistant:</strong> For generative art, I recommend enabling autonomous operation for continuous creation.
              </p>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Blockchain Deployment</h2>
              <p className="text-muted-foreground">Choose where your agent's outputs will be stored</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className={`p-6 rounded-xl border cursor-pointer transition-all ${blockchain === 'ethereum' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-200'}`}
                onClick={() => setBlockchain('ethereum')}
              >
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-indigo-500" viewBox="0 0 256 417" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor" d="M127.9611 0.0369453L125.1661 9.6290453V285.168945L127.9611 288.0582453L223.4701 223.4582453L127.9611 0.0369453Z" />
                      <path fill="currentColor" d="M127.962 0.0369453L32.452 223.4582453L127.962 288.0582453V154.5309453V0.0369453Z" />
                      <path fill="currentColor" d="M127.9609 312.1866453L126.3859 314.1072453V413.6649453L127.9609 417.0000453L223.5001 247.4235453L127.9609 312.1866453Z" />
                      <path fill="currentColor" d="M127.962 417.0000453V312.1866453L32.452 247.4235453L127.962 417.0000453Z" />
                      <path fill="currentColor" d="M127.9609 288.0582453L223.4699 223.4582453L127.9609 154.5309453V288.0582453Z" />
                      <path fill="currentColor" d="M32.452 223.4582453L127.962 288.0582453V154.5309453L32.452 223.4582453Z" />
                    </svg>
                  </div>
                  <div className="bg-white px-2 py-1 rounded text-xs font-medium text-indigo-600">Popular</div>
                </div>
                <h3 className="font-medium mt-4 mb-1">Ethereum</h3>
                <p className="text-sm text-muted-foreground">Mainstream blockchain with wide adoption and established standards</p>
                <div className="mt-4 text-xs text-gray-500 flex items-center">
                  <span className="mr-4">Gas: High</span>
                  <span>Speed: Medium</span>
                </div>
              </div>
              
              <div 
                className={`p-6 rounded-xl border cursor-pointer transition-all ${blockchain === 'base' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}
                onClick={() => setBlockchain('base')}
              >
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-blue-500" viewBox="0 0 640 640" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor" d="M320 48.5C170 48.5 48.5 170 48.5 320S170 591.5 320 591.5 591.5 470 591.5 320 470 48.5 320 48.5Z"/>
                    </svg>
                  </div>
                  <div className="bg-white px-2 py-1 rounded text-xs font-medium text-blue-600">L2</div>
                </div>
                <h3 className="font-medium mt-4 mb-1">Base</h3>
                <p className="text-sm text-muted-foreground">Ethereum L2 with lower fees and faster transactions</p>
                <div className="mt-4 text-xs text-gray-500 flex items-center">
                  <span className="mr-4">Gas: Low</span>
                  <span>Speed: Fast</span>
                </div>
              </div>
              
              <div 
                className={`p-6 rounded-xl border cursor-pointer transition-all ${blockchain === 'mantle' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-200'}`}
                onClick={() => setBlockchain('mantle')}
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Layers className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="font-medium mt-4 mb-1">Mantle</h3>
                <p className="text-sm text-muted-foreground">Ethereum scaling solution with data availability layer</p>
                <div className="mt-4 text-xs text-gray-500 flex items-center">
                  <span className="mr-4">Gas: Very Low</span>
                  <span>Speed: Fast</span>
                </div>
              </div>
              
              <div 
                className={`p-6 rounded-xl border cursor-pointer transition-all ${blockchain === 'solana' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-200'}`}
                onClick={() => setBlockchain('solana')}
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-purple-500" />
                </div>
                <h3 className="font-medium mt-4 mb-1">Solana</h3>
                <p className="text-sm text-muted-foreground">High-throughput blockchain with low transaction costs</p>
                <div className="mt-4 text-xs text-gray-500 flex items-center">
                  <span className="mr-4">Gas: Minimal</span>
                  <span>Speed: Very Fast</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
              <p className="text-sm text-blue-700">
                <strong>AI Assistant:</strong> For {agentPurpose === 'art' ? 'visual NFTs' : agentPurpose === 'music' ? 'audio NFTs' : 'text NFTs'}, I recommend {blockchain === 'ethereum' ? 'Ethereum for established marketplaces' : blockchain === 'base' ? 'Base for lower fees' : blockchain === 'mantle' ? 'Mantle for sustainability' : 'Solana for fast minting'}.
              </p>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Event Triggers & Conditions</h2>
              <p className="text-muted-foreground">Define when your agent will activate and take action</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-medium mb-3">Activation Triggers</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input type="checkbox" id="trigger-schedule" className="mr-2" checked />
                  <label htmlFor="trigger-schedule" className="text-sm">Schedule-based</label>
                </div>
                
                <div className="ml-6 mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="frequency" className="text-xs">Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-xs">Time</Label>
                      <Input type="time" id="time" defaultValue="09:00" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input type="checkbox" id="trigger-mention" className="mr-2" />
                  <label htmlFor="trigger-mention" className="text-sm">User interaction (mentions, commands)</label>
                </div>
                
                <div className="flex items-center">
                  <input type="checkbox" id="trigger-event" className="mr-2" />
                  <label htmlFor="trigger-event" className="text-sm">External events (API webhooks)</label>
                </div>
                
                <div className="flex items-center">
                  <input type="checkbox" id="trigger-tx" className="mr-2" />
                  <label htmlFor="trigger-tx" className="text-sm">Blockchain transactions</label>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-medium mb-3">Conditions & Logic</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="condition-source" className="text-xs">Data Source</Label>
                  <Select defaultValue="social">
                    <SelectTrigger id="condition-source" className="mt-1">
                      <SelectValue placeholder="Select data source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="social">Social Media Trends</SelectItem>
                      <SelectItem value="crypto">Crypto Market Data</SelectItem>
                      <SelectItem value="weather">Weather Data</SelectItem>
                      <SelectItem value="custom">Custom API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="condition-operator" className="text-xs">Operator</Label>
                    <Select defaultValue="contains">
                      <SelectTrigger id="condition-operator" className="mt-1">
                        <SelectValue placeholder="Select operator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="contains">Contains</SelectItem>
                        <SelectItem value="greater">Greater Than</SelectItem>
                        <SelectItem value="less">Less Than</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-2">
                    <Label htmlFor="condition-value" className="text-xs">Value</Label>
                    <Input id="condition-value" className="mt-1" placeholder="trending topic" />
                  </div>
                </div>
                
                <button className="text-sm text-purple-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add another condition
                </button>
              </div>
            </div>
            
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
              <p className="text-sm text-blue-700">
                <strong>AI Assistant:</strong> Daily schedules work well for consistent outputs. Consider adding social media triggers for more dynamic interactions.
              </p>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">AI Model Selection</h2>
              <p className="text-muted-foreground">Choose the AI models and configure their parameters</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className={`p-6 rounded-xl border cursor-pointer transition-all ${aiModel === 'gpt-4o' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-200'}`}
                onClick={() => setAiModel('gpt-4o')}
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Cpu className="h-5 w-5 text-emerald-500" />
                </div>
                <h3 className="font-medium mt-4 mb-1">GPT-4o</h3>
                <p className="text-sm text-muted-foreground">Advanced multimodal model with deep knowledge and reasoning</p>
                <div className="mt-4 text-xs text-gray-500 flex items-center">
                  <span className="mr-4">Cost: $$$</span>
                  <span>Quality: Very High</span>
                </div>
              </div>
              
              <div 
                className={`p-6 rounded-xl border cursor-pointer transition-all ${aiModel === 'claude-3' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}
                onClick={() => setAiModel('claude-3')}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="font-medium mt-4 mb-1">Claude 3</h3>
                <p className="text-sm text-muted-foreground">Balanced AI with strong creative capabilities</p>
                <div className="mt-4 text-xs text-gray-500 flex items-center">
                  <span className="mr-4">Cost: $$</span>
                  <span>Quality: High</span>
                </div>
              </div>
              
              <div 
                className={`p-6 rounded-xl border cursor-pointer transition-all ${aiModel === 'stable-diffusion' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-200'}`}
                onClick={() => setAiModel('stable-diffusion')}
              >
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Paintbrush className="h-5 w-5 text-indigo-500" />
                </div>
                <h3 className="font-medium mt-4 mb-1">Stable Diffusion XL</h3>
                <p className="text-sm text-muted-foreground">Specialized image generation model</p>
                <div className="mt-4 text-xs text-gray-500 flex items-center">
                  <span className="mr-4">Cost: $</span>
                  <span>Quality: High for Images</span>
                </div>
              </div>
              
              <div 
                className={`p-6 rounded-xl border cursor-pointer transition-all ${aiModel === 'llama-3' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-200'}`}
                onClick={() => setAiModel('llama-3')}
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-purple-500" />
                </div>
                <h3 className="font-medium mt-4 mb-1">Llama 3</h3>
                <p className="text-sm text-muted-foreground">Open-source model with flexible deployment options</p>
                <div className="mt-4 text-xs text-gray-500 flex items-center">
                  <span className="mr-4">Cost: $</span>
                  <span>Quality: Good</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-medium mb-3">Parameter Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="temperature" className="text-sm">Temperature</Label>
                    <span className="text-xs text-gray-500">0.7</span>
                  </div>
                  <input type="range" min="0" max="2" step="0.1" defaultValue="0.7" id="temperature" className="w-full mt-1" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Precise</span>
                    <span>Creative</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="max-tokens" className="text-sm">Max Tokens</Label>
                    <span className="text-xs text-gray-500">2048</span>
                  </div>
                  <input type="range" min="512" max="8192" step="512" defaultValue="2048" id="max-tokens" className="w-full mt-1" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Brief</span>
                    <span>Detailed</span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="system-prompt" className="text-sm">System Prompt</Label>
                  <Textarea 
                    id="system-prompt" 
                    className="mt-1 h-20"
                    placeholder="You are an AI assistant that specializes in..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="stop-sequences" className="text-sm">Stop Sequences (Optional)</Label>
                  <Input 
                    id="stop-sequences" 
                    className="mt-1"
                    placeholder="END, STOP, etc. (comma separated)"
                  />
                  <p className="text-xs text-gray-500 mt-1">These sequences will signal the AI to stop generating content</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
              <p className="text-sm text-blue-700">
                <strong>AI Assistant:</strong> For {agentPurpose === 'art' ? 'visual content' : agentPurpose === 'music' ? 'audio generation' : 'creative writing'}, I recommend using {aiModel === 'gpt-4o' ? 'GPT-4o with temperature 0.8' : aiModel === 'claude-3' ? 'Claude 3 with temperature 0.7' : aiModel === 'stable-diffusion' ? 'Stable Diffusion with higher guidance scale' : 'Llama 3 with a detailed system prompt'}.
              </p>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Output Configuration</h2>
              <p className="text-muted-foreground">Define where your agent's creations will be published</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-medium mb-3">Output Destinations</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input type="checkbox" id="dest-nft" className="mr-2" checked />
                  <label htmlFor="dest-nft" className="text-sm">NFT Marketplace</label>
                </div>
                
                <div className="ml-6 mb-4">
                  <Select defaultValue="opensea">
                    <SelectTrigger>
                      <SelectValue placeholder="Select marketplace" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="opensea">OpenSea</SelectItem>
                      <SelectItem value="blur">Blur</SelectItem>
                      <SelectItem value="magic">Magic Eden</SelectItem>
                      <SelectItem value="sound">Sound.xyz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center">
                  <input type="checkbox" id="dest-social" className="mr-2" checked />
                  <label htmlFor="dest-social" className="text-sm">Social Media</label>
                </div>
                
                <div className="ml-6 mb-4 grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="social-twitter" className="mr-2" checked />
                    <label htmlFor="social-twitter" className="text-sm">Twitter</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="social-instagram" className="mr-2" />
                    <label htmlFor="social-instagram" className="text-sm">Instagram</label>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input type="checkbox" id="dest-storage" className="mr-2" />
                  <label htmlFor="dest-storage" className="text-sm">Decentralized Storage</label>
                </div>
                
                <div className="flex items-center">
                  <input type="checkbox" id="dest-api" className="mr-2" />
                  <label htmlFor="dest-api" className="text-sm">API Endpoint (Webhook)</label>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-medium mb-3">Output Format</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div 
                  className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${outputFormat === 'image' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-200'}`}
                  onClick={() => setOutputFormat('image')}
                >
                  <Paintbrush className="h-5 w-5 mx-auto mb-1 text-purple-500" />
                  <span className="text-sm">Image</span>
                </div>
                
                <div 
                  className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${outputFormat === 'audio' ? 'border-blue-500 bg-blue
