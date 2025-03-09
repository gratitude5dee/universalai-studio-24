import React, { useState } from "react";
import { Coins, Map, Landmark, Globe, Wallet, Link, Network, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OnChainActions = () => {
  const [activePortal, setActivePortal] = useState("transactions");

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Landmark className="w-5 h-5 mr-2 text-studio-accent" />
          On-Chain Transaction Center
        </h2>
        <p className="text-muted-foreground mb-4">
          Execute and monitor blockchain transactions with magical ease
        </p>
        
        <Tabs value={activePortal} onValueChange={setActivePortal} className="mt-6">
          <TabsList className="grid grid-cols-6 w-full mb-6">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="mantle">Mantle</TabsTrigger>
            <TabsTrigger value="wormhole">Wormhole</TabsTrigger>
            <TabsTrigger value="mode">Mode</TabsTrigger>
            <TabsTrigger value="taiko">Taiko</TabsTrigger>
            <TabsTrigger value="monad">Monad</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/80 rounded-xl p-5 border border-studio-sand/20">
                <h3 className="font-medium mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" className="justify-start">
                    <Wallet className="mr-2 h-4 w-4" />
                    Send Tokens
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Coins className="mr-2 h-4 w-4" />
                    Swap Tokens
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Landmark className="mr-2 h-4 w-4" />
                    Stake Assets
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Map className="mr-2 h-4 w-4" />
                    Bridge Assets
                  </Button>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Connected Chains</h3>
                  <div className="flex space-x-2">
                    <div className="bg-studio-highlight px-3 py-1 rounded-full text-xs">
                      Ethereum
                    </div>
                    <div className="bg-studio-highlight px-3 py-1 rounded-full text-xs">
                      Polygon
                    </div>
                    <div className="bg-studio-highlight px-3 py-1 rounded-full text-xs">
                      Solana
                    </div>
                    <div className="bg-white px-3 py-1 rounded-full text-xs border border-dashed border-studio-sand">
                      + Add
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 rounded-xl p-5 border border-studio-sand/20">
                <h3 className="font-medium mb-3">Recent Transactions</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-studio-highlight w-8 h-8 rounded-full flex items-center justify-center mr-3">
                          <Coins className="w-4 h-4 text-studio-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Token Transfer</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">0.5 ETH</p>
                        <p className="text-xs text-green-600">Completed</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Transactions
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mantle">
            <div className="bg-white/90 border border-studio-sand/20 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#2563EB]/10 flex items-center justify-center mr-3">
                  <Globe className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Mantle</h3>
                  <p className="text-sm text-muted-foreground">High-speed layer 2 bridge for optimized transactions</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Available Assets</h4>
                    <div className="space-y-2">
                      {['ETH', 'USDC', 'DAI', 'WBTC'].map(token => (
                        <div key={token} className="flex justify-between items-center">
                          <span className="text-sm">{token}</span>
                          <span className="text-sm font-medium">2.54 {token}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 border border-dashed border-studio-accent/30 rounded-lg">
                    <h4 className="font-medium text-studio-accent mb-2">Portal Benefits</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <ArrowRightLeft className="w-3 h-3 mr-2 text-studio-accent" />
                        7-second finality
                      </li>
                      <li className="flex items-center">
                        <ArrowRightLeft className="w-3 h-3 mr-2 text-studio-accent" />
                        90% lower gas fees
                      </li>
                      <li className="flex items-center">
                        <ArrowRightLeft className="w-3 h-3 mr-2 text-studio-accent" />
                        EVM compatible transactions
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#f0f4ff] to-white p-5 rounded-lg border border-[#2563EB]/20">
                  <h4 className="font-medium mb-4">Bridge to Mantle</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium block mb-1">Select Token</label>
                      <select className="w-full p-2 border border-studio-sand rounded-md text-sm">
                        <option>ETH</option>
                        <option>USDC</option>
                        <option>DAI</option>
                        <option>WBTC</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Amount</label>
                      <input type="text" className="w-full p-2 border border-studio-sand rounded-md text-sm" placeholder="0.0" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Destination Address</label>
                      <input type="text" className="w-full p-2 border border-studio-sand rounded-md text-sm" placeholder="0x..." />
                    </div>
                    <Button className="w-full mt-2 bg-[#2563EB]">
                      <Link className="w-4 h-4 mr-2" />
                      Bridge to Mantle
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="wormhole">
            <div className="bg-white/90 border border-studio-sand/20 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center mr-3">
                  <Network className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Wormhole</h3>
                  <p className="text-sm text-muted-foreground">Cross-chain interoperability for seamless asset transfers</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Supported Chains</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {['Ethereum', 'Solana', 'Avalanche', 'Polygon', 'BSC', 'Arbitrum', 'Optimism', 'Cosmos'].map(chain => (
                        <div key={chain} className="text-sm bg-white py-1 px-3 rounded-full border border-studio-sand/20 text-center">
                          {chain}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 border border-dashed border-[#8B5CF6]/30 rounded-lg">
                    <h4 className="font-medium text-[#8B5CF6] mb-2">Universal Asset Transfer</h4>
                    <p className="text-sm">Wormhole allows for cross-chain message passing, enabling unique interoperability features like:</p>
                    <ul className="space-y-1 text-sm mt-2">
                      <li className="flex items-center">
                        <Link className="w-3 h-3 mr-2 text-[#8B5CF6]" />
                        NFT teleportation
                      </li>
                      <li className="flex items-center">
                        <Link className="w-3 h-3 mr-2 text-[#8B5CF6]" />
                        Cross-chain governance
                      </li>
                      <li className="flex items-center">
                        <Link className="w-3 h-3 mr-2 text-[#8B5CF6]" />
                        Multi-chain liquidity
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#f5f3ff] to-white p-5 rounded-lg border border-[#8B5CF6]/20">
                  <h4 className="font-medium mb-4">Wormhole Bridge</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium block mb-1">Source Chain</label>
                      <select className="w-full p-2 border border-studio-sand rounded-md text-sm">
                        <option>Ethereum</option>
                        <option>Solana</option>
                        <option>Avalanche</option>
                        <option>Polygon</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Destination Chain</label>
                      <select className="w-full p-2 border border-studio-sand rounded-md text-sm">
                        <option>Solana</option>
                        <option>Ethereum</option>
                        <option>Avalanche</option>
                        <option>Polygon</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Token & Amount</label>
                      <div className="flex space-x-2">
                        <select className="w-1/3 p-2 border border-studio-sand rounded-md text-sm">
                          <option>USDC</option>
                          <option>ETH</option>
                          <option>AVAX</option>
                          <option>SOL</option>
                        </select>
                        <input type="text" className="w-2/3 p-2 border border-studio-sand rounded-md text-sm" placeholder="0.0" />
                      </div>
                    </div>
                    <Button className="w-full mt-2 bg-[#8B5CF6]">
                      <Network className="w-4 h-4 mr-2" />
                      Transfer via Wormhole
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mode">
            <div className="bg-white/90 border border-studio-sand/20 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center mr-3">
                  <ArrowRightLeft className="w-5 h-5 text-[#10B981]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Mode</h3>
                  <p className="text-sm text-muted-foreground">Optimized Ethereum L2 with enhanced developer rewards</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Mode Network Overview</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Network Gas</span>
                        <span className="text-sm font-medium text-green-600">0.001 ETH (Low)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Time to Finality</span>
                        <span className="text-sm font-medium">~3 seconds</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Sequencer Status</span>
                        <span className="text-sm font-medium text-green-600">Active</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">TVL</span>
                        <span className="text-sm font-medium">$145.3M</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-dashed border-[#10B981]/30 rounded-lg">
                    <h4 className="font-medium text-[#10B981] mb-2">Mode Value Proposition</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <ArrowRightLeft className="w-3 h-3 mr-2 text-[#10B981]" />
                        Sequencer fee sharing for developers
                      </li>
                      <li className="flex items-center">
                        <ArrowRightLeft className="w-3 h-3 mr-2 text-[#10B981]" />
                        EVM-equivalent functionality
                      </li>
                      <li className="flex items-center">
                        <ArrowRightLeft className="w-3 h-3 mr-2 text-[#10B981]" />
                        Zero knowledge proofs for security
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#ecfdf5] to-white p-5 rounded-lg border border-[#10B981]/20">
                  <h4 className="font-medium mb-4">Mode Bridge</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium block mb-1">Direction</label>
                      <select className="w-full p-2 border border-studio-sand rounded-md text-sm">
                        <option>Ethereum → Mode</option>
                        <option>Mode → Ethereum</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Asset</label>
                      <select className="w-full p-2 border border-studio-sand rounded-md text-sm">
                        <option>ETH</option>
                        <option>USDC</option>
                        <option>DAI</option>
                        <option>WBTC</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Amount</label>
                      <div className="relative">
                        <input type="text" className="w-full p-2 border border-studio-sand rounded-md text-sm" placeholder="0.0" />
                        <button className="absolute right-2 top-2 text-xs text-[#10B981]">MAX</button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Bridge Fee: ~0.0005 ETH</p>
                    </div>
                    <Button className="w-full mt-2 bg-[#10B981]">
                      <ArrowRightLeft className="w-4 h-4 mr-2" />
                      Bridge to Mode
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="taiko">
            <div className="bg-white/90 border border-studio-sand/20 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#EC4899]/10 flex items-center justify-center mr-3">
                  <Link className="w-5 h-5 text-[#EC4899]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Taiko</h3>
                  <p className="text-sm text-muted-foreground">Type 1 ZK-EVM with seamless Ethereum compatibility</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Network Status</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Network</span>
                        <span className="text-sm font-medium text-green-600">Active</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Gas Fee</span>
                        <span className="text-sm font-medium">0.0002 ETH</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Block Time</span>
                        <span className="text-sm font-medium">~3 seconds</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Finality</span>
                        <span className="text-sm font-medium">~10 minutes</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-dashed border-[#EC4899]/30 rounded-lg">
                    <h4 className="font-medium text-[#EC4899] mb-2">Taiko Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <Link className="w-3 h-3 mr-2 text-[#EC4899]" />
                        100% EVM equivalence
                      </li>
                      <li className="flex items-center">
                        <Link className="w-3 h-3 mr-2 text-[#EC4899]" />
                        Zero-knowledge proofs
                      </li>
                      <li className="flex items-center">
                        <Link className="w-3 h-3 mr-2 text-[#EC4899]" />
                        Permissionless block production
                      </li>
                      <li className="flex items-center">
                        <Link className="w-3 h-3 mr-2 text-[#EC4899]" />
                        Ethereum-aligned security
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#fdf2f8] to-white p-5 rounded-lg border border-[#EC4899]/20">
                  <h4 className="font-medium mb-4">Taiko Bridge</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium block mb-1">Direction</label>
                      <select className="w-full p-2 border border-studio-sand rounded-md text-sm">
                        <option>Ethereum → Taiko</option>
                        <option>Taiko → Ethereum</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Asset</label>
                      <select className="w-full p-2 border border-studio-sand rounded-md text-sm">
                        <option>ETH</option>
                        <option>USDC</option>
                        <option>DAI</option>
                        <option>WBTC</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Amount</label>
                      <div className="relative">
                        <input type="text" className="w-full p-2 border border-studio-sand rounded-md text-sm" placeholder="0.0" />
                        <button className="absolute right-2 top-2 text-xs text-[#EC4899]">MAX</button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Processing time: ~30 minutes</p>
                    </div>
                    <Button className="w-full mt-2 bg-[#EC4899]">
                      <Link className="w-4 h-4 mr-2" />
                      Bridge to Taiko
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="monad">
            <div className="bg-white/90 border border-studio-sand/20 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mr-3">
                  <Globe className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Monad</h3>
                  <p className="text-sm text-muted-foreground">High-performance L1 blockchain with parallel processing</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Network Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">TPS</span>
                        <span className="text-sm font-medium">10,000+</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Latency</span>
                        <span className="text-sm font-medium">~0.5 seconds</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Gas Price</span>
                        <span className="text-sm font-medium text-green-600">0.0001 MONAD</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Network Load</span>
                        <span className="text-sm font-medium">12%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-dashed border-[#F59E0B]/30 rounded-lg">
                    <h4 className="font-medium text-[#F59E0B] mb-2">Monad Innovations</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <Globe className="w-3 h-3 mr-2 text-[#F59E0B]" />
                        Parallel transaction execution
                      </li>
                      <li className="flex items-center">
                        <Globe className="w-3 h-3 mr-2 text-[#F59E0B]" />
                        Optimized VM for high throughput
                      </li>
                      <li className="flex items-center">
                        <Globe className="w-3 h-3 mr-2 text-[#F59E0B]" />
                        Sublinear validator scaling
                      </li>
                      <li className="flex items-center">
                        <Globe className="w-3 h-3 mr-2 text-[#F59E0B]" />
                        EVM-compatible smart contracts
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#fef3c7] to-white p-5 rounded-lg border border-[#F59E0B]/20">
                  <h4 className="font-medium mb-4">Monad Bridge</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium block mb-1">Bridge Direction</label>
                      <select className="w-full p-2 border border-studio-sand rounded-md text-sm">
                        <option>Ethereum → Monad</option>
                        <option>Monad → Ethereum</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Token</label>
                      <select className="w-full p-2 border border-studio-sand rounded-md text-sm">
                        <option>ETH</option>
                        <option>USDC</option>
                        <option>DAI</option>
                        <option>WBTC</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Amount</label>
                      <div className="relative">
                        <input type="text" className="w-full p-2 border border-studio-sand rounded-md text-sm" placeholder="0.0" />
                        <button className="absolute right-2 top-2 text-xs text-[#F59E0B]">MAX</button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Est. completion: 15 minutes</p>
                    </div>
                    <Button className="w-full mt-2 bg-[#F59E0B]">
                      <Globe className="w-4 h-4 mr-2" />
                      Bridge to Monad
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OnChainActions;
