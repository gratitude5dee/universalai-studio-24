
import React, { useState } from "react";
import DistributionLayout from "@/layouts/distribution-layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Link, Wallet, Layers, BarChart3, ArrowUpRight, ChevronRight,
  Timer, RefreshCw, Sparkles, Share2, Boxes, CheckCircle
} from "lucide-react";

const OnChainDistribution = () => {
  const [activeTab, setActiveTab] = useState("nfts");

  // Mock data for blockchain platforms
  const blockchains = [
    { name: "Ethereum", icon: "https://placehold.co/40/6f42c1/FFFFFF?text=ETH", color: "#6f42c1" },
    { name: "Solana", icon: "https://placehold.co/40/14f195/FFFFFF?text=SOL", color: "#14f195" },
    { name: "Polygon", icon: "https://placehold.co/40/8247e5/FFFFFF?text=POLY", color: "#8247e5" },
    { name: "Flow", icon: "https://placehold.co/40/13efc0/FFFFFF?text=FLOW", color: "#13efc0" },
    { name: "Tezos", icon: "https://placehold.co/40/2c7df7/FFFFFF?text=XTZ", color: "#2c7df7" },
  ];

  // Mock NFT collection data
  const nftCollections = [
    { 
      id: 1, 
      name: "Sonic Artifacts: Genesis", 
      blockchain: "Ethereum", 
      totalSupply: 3000,
      minted: 1845,
      price: "0.08 ETH",
      thumbnail: "https://placehold.co/80/6f42c1/FFFFFF?text=NFT1",
      status: "Active"
    },
    { 
      id: 2, 
      name: "Rhythm Fragments", 
      blockchain: "Solana", 
      totalSupply: 10000,
      minted: 8721,
      price: "2.5 SOL",
      thumbnail: "https://placehold.co/80/14f195/FFFFFF?text=NFT2",
      status: "Active"
    },
    { 
      id: 3, 
      name: "Harmonic Landscapes", 
      blockchain: "Polygon", 
      totalSupply: 5000,
      minted: 4998,
      price: "45 MATIC",
      thumbnail: "https://placehold.co/80/8247e5/FFFFFF?text=NFT3",
      status: "Sold Out"
    }
  ];

  // Mock token distribution data
  const tokenDistributions = [
    {
      id: 1,
      name: "BEAT Token",
      symbol: "BEAT",
      blockchain: "Ethereum",
      totalSupply: "1,000,000",
      circulatingSupply: "450,000",
      holders: 2735,
      price: "$0.42",
      change: "+5.2%"
    },
    {
      id: 2,
      name: "Metaverse Audio Coin",
      symbol: "MAC",
      blockchain: "Polygon",
      totalSupply: "10,000,000",
      circulatingSupply: "2,500,000",
      holders: 8341,
      price: "$0.018",
      change: "-2.3%"
    }
  ];

  return (
    <DistributionLayout 
      title="On-Chain Distribution" 
      subtitle="Manage your music NFTs, tokens, and on-chain distribution channels"
    >
      {/* Blockchain Network Selection */}
      <div className="glass-card p-5">
        <h2 className="text-lg font-semibold mb-4">Select Blockchain Networks</h2>
        <div className="flex flex-wrap gap-3">
          {blockchains.map((blockchain) => (
            <motion.div
              key={blockchain.name}
              className="flex items-center p-3 bg-white rounded-xl border border-studio-sand/30 cursor-pointer"
              whileHover={{ y: -3, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
            >
              <img src={blockchain.icon} alt={blockchain.name} className="w-6 h-6 mr-2 rounded-full" />
              <span className="font-medium">{blockchain.name}</span>
            </motion.div>
          ))}
          <motion.div
            className="flex items-center p-3 bg-studio-sand/20 rounded-xl border border-dashed border-studio-sand/50 cursor-pointer"
            whileHover={{ y: -3 }}
          >
            <Plus className="w-5 h-5 mr-2 text-studio-clay" />
            <span className="font-medium text-studio-clay">Add Network</span>
          </motion.div>
        </div>
      </div>

      {/* Distribution Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="glass-card p-5">
          <div className="flex items-center mb-2">
            <Boxes className="h-5 w-5 text-[#8B5CF6] mr-2" />
            <span className="text-sm text-studio-clay">Total NFTs</span>
          </div>
          <div className="text-2xl font-semibold">18,000</div>
          <div className="text-xs text-emerald-500 mt-1">+12.4% from last month</div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center mb-2">
            <Wallet className="h-5 w-5 text-[#F97316] mr-2" />
            <span className="text-sm text-studio-clay">Revenue Generated</span>
          </div>
          <div className="text-2xl font-semibold">$124,587</div>
          <div className="text-xs text-emerald-500 mt-1">+23.7% from last month</div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center mb-2">
            <Users className="h-5 w-5 text-[#0EA5E9] mr-2" />
            <span className="text-sm text-studio-clay">Unique Collectors</span>
          </div>
          <div className="text-2xl font-semibold">8,342</div>
          <div className="text-xs text-emerald-500 mt-1">+8.3% from last month</div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center mb-2">
            <Layers className="h-5 w-5 text-[#10B981] mr-2" />
            <span className="text-sm text-studio-clay">Active Collections</span>
          </div>
          <div className="text-2xl font-semibold">12</div>
          <div className="text-xs text-emerald-500 mt-1">+2 new this month</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-8 bg-white rounded-xl border border-studio-sand/30 overflow-hidden">
        <div className="flex border-b border-studio-sand/30">
          <button 
            className={`px-6 py-3 text-sm font-medium ${activeTab === "nfts" ? "border-b-2 border-studio-accent text-studio-accent" : "text-studio-clay"}`}
            onClick={() => setActiveTab("nfts")}
          >
            NFT Collections
          </button>
          <button 
            className={`px-6 py-3 text-sm font-medium ${activeTab === "tokens" ? "border-b-2 border-studio-accent text-studio-accent" : "text-studio-clay"}`}
            onClick={() => setActiveTab("tokens")}
          >
            Token Distribution
          </button>
          <button 
            className={`px-6 py-3 text-sm font-medium ${activeTab === "royalties" ? "border-b-2 border-studio-accent text-studio-accent" : "text-studio-clay"}`}
            onClick={() => setActiveTab("royalties")}
          >
            Royalty Management
          </button>
        </div>

        <div className="p-5">
          {activeTab === "nfts" && (
            <div>
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold">Your NFT Collections</h3>
                <Button variant="default" size="sm" className="bg-studio-accent gap-1">
                  <Plus className="h-4 w-4" />
                  Create Collection
                </Button>
              </div>

              <div className="space-y-4">
                {nftCollections.map((collection) => (
                  <div key={collection.id} className="bg-white rounded-xl border border-studio-sand/30 p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={collection.thumbnail} alt={collection.name} className="w-12 h-12 object-cover rounded-lg mr-4" />
                      <div>
                        <h4 className="font-medium">{collection.name}</h4>
                        <div className="flex items-center gap-3 text-sm text-studio-clay mt-1">
                          <span>{collection.blockchain}</span>
                          <span className="h-1 w-1 rounded-full bg-studio-clay"></span>
                          <span>{collection.minted}/{collection.totalSupply} minted</span>
                          <span className="h-1 w-1 rounded-full bg-studio-clay"></span>
                          <span>{collection.price}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        collection.status === "Active" 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {collection.status}
                      </span>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <BarChart3 className="h-4 w-4" />
                        Stats
                      </Button>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "tokens" && (
            <div>
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold">Your Tokens</h3>
                <Button variant="default" size="sm" className="bg-studio-accent gap-1">
                  <Plus className="h-4 w-4" />
                  Create Token
                </Button>
              </div>

              <div className="space-y-4">
                {tokenDistributions.map((token) => (
                  <div key={token.id} className="bg-white rounded-xl border border-studio-sand/30 p-4">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{token.name} <span className="text-sm text-studio-clay ml-1">({token.symbol})</span></h4>
                        <div className="text-sm text-studio-clay mt-1">{token.blockchain}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">{token.price}</div>
                        <div className={`text-sm ${token.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {token.change}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="p-3 bg-studio-sand/10 rounded-lg">
                        <div className="text-sm text-studio-clay">Total Supply</div>
                        <div className="font-medium">{token.totalSupply}</div>
                      </div>
                      <div className="p-3 bg-studio-sand/10 rounded-lg">
                        <div className="text-sm text-studio-clay">Circulating</div>
                        <div className="font-medium">{token.circulatingSupply}</div>
                      </div>
                      <div className="p-3 bg-studio-sand/10 rounded-lg">
                        <div className="text-sm text-studio-clay">Holders</div>
                        <div className="font-medium">{token.holders}</div>
                      </div>
                    </div>
                    
                    <div className="flex mt-4 gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Share2 className="h-4 w-4" />
                        Distribute
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <ArrowUpRight className="h-4 w-4" />
                        View Explorer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "royalties" && (
            <div>
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold">Royalty Management</h3>
                <Button variant="default" size="sm" className="bg-studio-accent gap-1">
                  <Sparkles className="h-4 w-4" />
                  Optimize Royalties
                </Button>
              </div>

              <div className="glass-card p-5 bg-gradient-to-br from-purple-50 to-white">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
                  <h3 className="font-medium">Smart Royalty System Active</h3>
                </div>
                
                <p className="text-sm text-studio-clay mb-4">
                  Your on-chain royalty collection system is active and monitoring sales across 4 marketplaces.
                  Recent improvements have increased collection efficiency by 23%.
                </p>
                
                <div className="flex gap-3">
                  <div className="bg-white p-3 rounded-lg border border-studio-sand/30 flex-1">
                    <div className="text-sm text-studio-clay">Last 30 Days</div>
                    <div className="text-xl font-semibold">$8,423.56</div>
                    <div className="text-xs text-emerald-500">+12.4% from previous period</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-studio-sand/30 flex-1">
                    <div className="text-sm text-studio-clay">Secondary Sales</div>
                    <div className="text-xl font-semibold">542</div>
                    <div className="text-xs text-emerald-500">+8.7% from previous period</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-studio-sand/30 flex-1">
                    <div className="text-sm text-studio-clay">Floor Price (Avg)</div>
                    <div className="text-xl font-semibold">0.12 ETH</div>
                    <div className="text-xs text-emerald-500">+2.3% from previous period</div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" className="gap-1">
                    <RefreshCw className="h-4 w-4" />
                    Refresh Stats
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 ml-2">
                    <Timer className="h-4 w-4" />
                    View History
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Smart Contract Templates */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Smart Contract Templates</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-studio-sand/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Standard NFT Collection</h3>
              <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">ERC-721</div>
            </div>
            <p className="text-sm text-studio-clay mb-4">Basic NFT collection with royalty support and metadata management.</p>
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
              <ChevronRight className="h-4 w-4" />
              Use Template
            </Button>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-studio-sand/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Token-Gated Content</h3>
              <div className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">Multi-chain</div>
            </div>
            <p className="text-sm text-studio-clay mb-4">Exclusive content access for token or NFT holders with tiered permissions.</p>
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
              <ChevronRight className="h-4 w-4" />
              Use Template
            </Button>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-studio-sand/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Royalty Splitting</h3>
              <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Automated</div>
            </div>
            <p className="text-sm text-studio-clay mb-4">Automatically distribute royalties to collaborators based on predefined shares.</p>
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
              <ChevronRight className="h-4 w-4" />
              Use Template
            </Button>
          </div>
        </div>
      </div>
    </DistributionLayout>
  );
};

export default OnChainDistribution;
