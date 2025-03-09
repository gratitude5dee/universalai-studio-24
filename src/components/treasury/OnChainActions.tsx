
import React from "react";
import { Coins, Map, Landmark, Globe, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const OnChainActions = () => {
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
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
        </div>
      </div>
    </div>
  );
};

export default OnChainActions;
