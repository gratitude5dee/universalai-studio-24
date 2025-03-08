
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
                  className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${outputFormat === 'audio' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}
                  onClick={() => setOutputFormat('audio')}
                >
                  <Music className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                  <span className="text-sm">Audio</span>
                </div>
                
                <div 
                  className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${outputFormat === 'text' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-200'}`}
                  onClick={() => setOutputFormat('text')}
                >
                  <FileText className="h-5 w-5 mx-auto mb-1 text-green-500" />
                  <span className="text-sm">Text</span>
                </div>
                
                <div 
                  className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${outputFormat === 'mixed' ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-200'}`}
                  onClick={() => setOutputFormat('mixed')}
                >
                  <Layers className="h-5 w-5 mx-auto mb-1 text-amber-500" />
                  <span className="text-sm">Mixed</span>
                </div>
              </div>
              
              <div className="mt-4">
                <Label htmlFor="format-details" className="text-sm">Format Details</Label>
                {outputFormat === 'image' && (
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <Select defaultValue="png">
                      <SelectTrigger id="image-format">
                        <SelectValue placeholder="File format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="jpg">JPG</SelectItem>
                        <SelectItem value="webp">WebP</SelectItem>
                        <SelectItem value="svg">SVG</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select defaultValue="square">
                      <SelectTrigger id="image-ratio">
                        <SelectValue placeholder="Aspect ratio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="square">1:1 (Square)</SelectItem>
                        <SelectItem value="portrait">3:4 (Portrait)</SelectItem>
                        <SelectItem value="landscape">16:9 (Landscape)</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {outputFormat === 'audio' && (
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <Select defaultValue="mp3">
                      <SelectTrigger id="audio-format">
                        <SelectValue placeholder="File format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mp3">MP3</SelectItem>
                        <SelectItem value="wav">WAV</SelectItem>
                        <SelectItem value="ogg">OGG</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div>
                      <Input id="duration" type="number" placeholder="Duration (seconds)" defaultValue="60" />
                    </div>
                  </div>
                )}
                
                {outputFormat === 'text' && (
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <Select defaultValue="markdown">
                      <SelectTrigger id="text-format">
                        <SelectValue placeholder="Format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="markdown">Markdown</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="plain">Plain Text</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select defaultValue="medium">
                      <SelectTrigger id="text-length">
                        <SelectValue placeholder="Length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short (< 300 words)</SelectItem>
                        <SelectItem value="medium">Medium (300-1000 words)</SelectItem>
                        <SelectItem value="long">Long (> 1000 words)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {outputFormat === 'mixed' && (
                  <div className="mt-2">
                    <Textarea 
                      id="mixed-format-details" 
                      placeholder="Describe the mixed media format you want to create..."
                      className="h-20"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
              <p className="text-sm text-blue-700">
                <strong>AI Assistant:</strong> For {blockchain} deployment, I recommend {outputFormat === 'image' ? 'PNG format with metadata' : outputFormat === 'audio' ? 'MP3 format with embedded cover art' : outputFormat === 'text' ? 'markdown with HTML fallback' : 'consistent mixed media template'} to maximize compatibility.
              </p>
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Economic Parameters</h2>
              <p className="text-muted-foreground">Configure the financial aspects of your AI agent</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-medium mb-3">Pricing Model</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                  <div className="flex items-center">
                    <input type="radio" name="pricing" id="pricing-fixed" className="mr-2" checked />
                    <label htmlFor="pricing-fixed" className="text-sm font-medium">Fixed Price</label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-5">Set a specific price for each creation</p>
                </div>
                
                <div className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <input type="radio" name="pricing" id="pricing-auction" className="mr-2" />
                    <label htmlFor="pricing-auction" className="text-sm font-medium">Auction</label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-5">Let the market determine the value</p>
                </div>
                
                <div className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <input type="radio" name="pricing" id="pricing-dynamic" className="mr-2" />
                    <label htmlFor="pricing-dynamic" className="text-sm font-medium">Dynamic Pricing</label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-5">Adjust based on demand and scarcity</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="base-price" className="text-sm">Base Price</Label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <Input id="base-price" type="text" className="pl-7" placeholder="0.00" defaultValue="25.00" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="token-currency" className="text-sm">Currency</Label>
                  <Select defaultValue="eth">
                    <SelectTrigger id="token-currency" className="mt-1">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eth">ETH</SelectItem>
                      <SelectItem value="usdc">USDC</SelectItem>
                      <SelectItem value="sol">SOL</SelectItem>
                      <SelectItem value="custom">Custom Token</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-medium mb-3">Revenue Splits</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-3">
                  <div className="col-span-3">
                    <Label htmlFor="creator-fee" className="text-sm">Creator Fee</Label>
                    <div className="relative mt-1">
                      <Input 
                        id="creator-fee" 
                        value={feePercentage}
                        onChange={(e) => setFeePercentage(e.target.value)}
                        type="number" 
                        min="0" 
                        max="100" 
                        className="pr-8" 
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <div className="bg-gray-100 rounded p-2 w-full text-center">
                      <span className="text-2xl font-bold">{feePercentage}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="royalty-address" className="text-sm">Payout Address</Label>
                  <Input id="royalty-address" className="mt-1 font-mono text-sm" placeholder="0x..." />
                </div>
                
                <div>
                  <Label className="text-sm">Secondary Sales Royalty</Label>
                  <div className="relative mt-1">
                    <input type="range" min="0" max="10" step="0.5" defaultValue="2.5" className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span>2.5%</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm mb-2 block">Additional Revenue Splits</Label>
                  
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Contributor 1</span>
                      <span className="text-sm">25%</span>
                    </div>
                    <div className="text-xs text-gray-500 font-mono truncate">0x8f12b...90cf</div>
                  </div>
                  
                  <button className="text-sm text-purple-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Split Recipient
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-dashed border-blue-300">
              <h3 className="font-medium mb-3 text-blue-600">Agent Flow Preview</h3>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700 mb-2">Your AI Agent Configuration:</p>
                <div className="space-y-1 text-xs text-left inline-block">
                  <div className="flex gap-2">
                    <span className="font-medium">Purpose:</span>
                    <span className="capitalize">{agentPurpose}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium">Blockchain:</span>
                    <span className="capitalize">{blockchain}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium">Model:</span>
                    <span>{aiModel}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium">Output:</span>
                    <span className="capitalize">{outputFormat}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium">Creator Fee:</span>
                    <span>{feePercentage}%</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-center">
                <svg width="240" height="150" viewBox="0 0 240 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="10" width="60" height="30" rx="4" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="2"/>
                  <text x="40" y="30" textAnchor="middle" fill="#6D28D9" fontSize="12" fontFamily="sans-serif">Trigger</text>
                  
                  <rect x="90" y="10" width="60" height="30" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2"/>
                  <text x="120" y="30" textAnchor="middle" fill="#1D4ED8" fontSize="12" fontFamily="sans-serif">AI Model</text>
                  
                  <rect x="170" y="10" width="60" height="30" rx="4" fill="#ECFDF5" stroke="#10B981" strokeWidth="2"/>
                  <text x="200" y="30" textAnchor="middle" fill="#047857" fontSize="12" fontFamily="sans-serif">Output</text>
                  
                  <rect x="90" y="60" width="60" height="30" rx="4" fill="#FCE7F3" stroke="#EC4899" strokeWidth="2"/>
                  <text x="120" y="80" textAnchor="middle" fill="#DB2777" fontSize="12" fontFamily="sans-serif">Blockchain</text>
                  
                  <rect x="90" y="110" width="60" height="30" rx="4" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2"/>
                  <text x="120" y="130" textAnchor="middle" fill="#B45309" fontSize="12" fontFamily="sans-serif">Economics</text>
                  
                  <path d="M70 25H90" stroke="#6D28D9" strokeWidth="2"/>
                  <path d="M150 25H170" stroke="#1D4ED8" strokeWidth="2"/>
                  <path d="M120 40V60" stroke="#3B82F6" strokeWidth="2"/>
                  <path d="M120 90V110" stroke="#EC4899" strokeWidth="2"/>
                  
                  <circle cx="70" cy="25" r="3" fill="#6D28D9"/>
                  <circle cx="150" cy="25" r="3" fill="#1D4ED8"/>
                  <circle cx="170" cy="25" r="3" fill="#1D4ED8"/>
                  <circle cx="120" cy="40" r="3" fill="#3B82F6"/>
                  <circle cx="120" cy="60" r="3" fill="#3B82F6"/>
                  <circle cx="120" cy="90" r="3" fill="#EC4899"/>
                  <circle cx="120" cy="110" r="3" fill="#EC4899"/>
                </svg>
              </div>
            </div>
            
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
              <p className="text-sm text-blue-700">
                <strong>AI Assistant:</strong> For creators, I typically recommend a 5-10% royalty on secondary sales to incentivize long-term support while remaining competitive in the market.
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderWizardNavigation = () => (
    <div className="flex justify-between items-center mt-8">
      <Button
        variant="outline"
        onClick={handlePrevWizardStep}
        disabled={wizardStep === 1}
      >
        Previous
      </Button>
      
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <div 
            key={step} 
            className={`w-3 h-3 rounded-full ${wizardStep === step ? 'bg-purple-500' : 'bg-gray-300'}`}
            onClick={() => setWizardStep(step)}
          ></div>
        ))}
      </div>
      
      {wizardStep < 6 ? (
        <Button onClick={handleNextWizardStep}>
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button className="bg-purple-600 hover:bg-purple-700">
          Create Agent <Sparkles className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-8">
          <div className="w-3/4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Create AI Agent</h1>
              <p className="text-muted-foreground">
                Configure your AI agent to autonomously create on the blockchain
              </p>
            </div>
            
            <Tabs defaultValue="wizard" className="mb-6">
              <TabsList>
                <TabsTrigger value="wizard">Guided Wizard</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Editor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="wizard" className="pt-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                  {renderWizardStep()}
                  {renderWizardNavigation()}
                </div>
              </TabsContent>
              
              <TabsContent value="advanced" className="pt-4">
                {currentStep === 'form' && (
                  <div>
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
              </TabsContent>
            </Tabs>
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
