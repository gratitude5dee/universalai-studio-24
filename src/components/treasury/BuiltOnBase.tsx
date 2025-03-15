import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layers, ExternalLink, Shield, Zap, Globe, Database, ArrowDownRight, ArrowUpRight, CircleDollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OnRamp from "@/pages/treasury/OnRamp";
import OffRamp from "@/pages/treasury/OffRamp";
import Fund from "@/pages/treasury/Fund";
import { useNavigate, useSearchParams } from "react-router-dom";

interface BuiltOnBaseProps {
  initialSubtab?: string | null;
}

const BuiltOnBase: React.FC<BuiltOnBaseProps> = ({ initialSubtab }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Initialize activeTab from URL parameters
  useEffect(() => {
    const subtab = initialSubtab || searchParams.get("subtab");
    if (subtab) {
      setActiveTab(subtab);
    } else {
      setActiveTab("overview");
    }
  }, [initialSubtab, searchParams]);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value === "overview") {
      // Remove subtab param for the overview tab
      navigate("/treasury?tab=base", { replace: true });
    } else {
      // Add subtab param for other tabs
      navigate(`/treasury?tab=base&subtab=${value}`, { replace: true });
    }
  };

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="onramp">On Ramp</TabsTrigger>
          <TabsTrigger value="offramp">Off Ramp</TabsTrigger>
          <TabsTrigger value="fund">Fund</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-studio-sand/20 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-50 p-3 rounded-xl">
                <Layers className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-studio-charcoal">Built on Base</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Explore projects, dApps, and financial opportunities built on Base - the secure, low-cost Ethereum L2 built by Coinbase to bring the next billion users to web3.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-white p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-xs text-blue-600 font-medium">Layer 2</div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Security</h3>
                <p className="text-gray-600 text-sm">
                  Secured by Ethereum with all the security and stability of the world's largest smart contract platform.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-100"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-white p-2 rounded-lg">
                    <Zap className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="text-xs text-indigo-600 font-medium">Performance</div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Fast & Low-cost</h3>
                <p className="text-gray-600 text-sm">
                  Optimistic rollup architecture enabling high throughput and ultra-low transaction costs.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-purple-50 to-blue-50 p-5 rounded-xl border border-purple-100"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-white p-2 rounded-lg">
                    <Globe className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="text-xs text-purple-600 font-medium">Ecosystem</div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Thriving Ecosystem</h3>
                <p className="text-gray-600 text-sm">
                  Growing network of dApps, marketplaces, and financial tools built on EVM compatibility.
                </p>
              </motion.div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Database className="h-4 w-4" />
                Base Resources
              </h3>
              <ul className="space-y-3">
                {[
                  { 
                    title: "Base Bridge", 
                    description: "Securely move assets between Ethereum and Base",
                    link: "https://bridge.base.org" 
                  },
                  { 
                    title: "Base Explorer", 
                    description: "View transactions, addresses, and blocks on Base",
                    link: "https://basescan.org" 
                  },
                  { 
                    title: "Base Documentation", 
                    description: "Developer resources and technical documentation",
                    link: "https://docs.base.org" 
                  },
                  { 
                    title: "Base Ecosystem", 
                    description: "Explore the growing ecosystem of apps on Base",
                    link: "https://base.org/ecosystem" 
                  }
                ].map((resource, index) => (
                  <li key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors">
                    <div>
                      <h4 className="font-medium text-gray-900">{resource.title}</h4>
                      <p className="text-xs text-gray-500">{resource.description}</p>
                    </div>
                    <a 
                      href={resource.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <motion.div 
              className="bg-gradient-to-br from-green-50 to-blue-50 p-5 rounded-xl border border-green-100 cursor-pointer"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.1)" }}
              transition={{ duration: 0.2 }}
              onClick={() => handleTabChange("onramp")}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-white p-2 rounded-lg">
                  <ArrowUpRight className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-xs text-green-600 font-medium">Fiat → Crypto</div>
              </div>
              <h3 className="text-lg font-semibold mb-2">On Ramp</h3>
              <p className="text-gray-600 text-sm">
                Convert fiat currency to cryptocurrency with a simple, seamless flow.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-purple-50 to-indigo-50 p-5 rounded-xl border border-purple-100 cursor-pointer"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.1)" }}
              transition={{ duration: 0.2 }}
              onClick={() => handleTabChange("offramp")}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-white p-2 rounded-lg">
                  <ArrowDownRight className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-xs text-purple-600 font-medium">Crypto → Fiat</div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Off Ramp</h3>
              <p className="text-gray-600 text-sm">
                Convert cryptocurrency back to fiat currency easily and securely.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-yellow-50 to-amber-50 p-5 rounded-xl border border-yellow-100 cursor-pointer"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(234, 179, 8, 0.1)" }}
              transition={{ duration: 0.2 }}
              onClick={() => handleTabChange("fund")}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-white p-2 rounded-lg">
                  <CircleDollarSign className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="text-xs text-yellow-600 font-medium">Simple Funding</div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fund</h3>
              <p className="text-gray-600 text-sm">
                Pre-built components for funding projects with cryptocurrency.
              </p>
            </motion.div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-studio-sand/20 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h2 className="text-xl font-bold text-studio-charcoal mb-4">Popular Base Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "Aerodrome Finance",
                  description: "Optimized AMM and liquidity hub for Base",
                  category: "DeFi",
                  url: "https://aerodrome.finance/"
                },
                {
                  name: "BaseSwap",
                  description: "DEX and yield farming platform built for Base",
                  category: "DeFi",
                  url: "https://baseswap.fi/"
                },
                {
                  name: "Mint Fun",
                  description: "NFT launchpad and marketplace for Base",
                  category: "NFTs",
                  url: "https://mint.fun/"
                },
                {
                  name: "Friend.tech",
                  description: "Social platform for monetizing relationships",
                  category: "Social",
                  url: "https://friend.tech/"
                }
              ].map((project, index) => (
                <motion.a
                  key={index}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{project.name}</h3>
                    <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{project.category}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                  <div className="flex items-center text-blue-600 text-xs font-medium">
                    <span>Visit</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="onramp">
          <OnRamp />
        </TabsContent>
        
        <TabsContent value="offramp">
          <OffRamp />
        </TabsContent>
        
        <TabsContent value="fund">
          <Fund />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuiltOnBase;
