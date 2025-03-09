
import React from "react";
import DistributionLayout from "@/layouts/distribution-layout";
import { Link, ArrowRightLeft, BarChart3, Wallet, Database, Shield } from "lucide-react";
import StatsCard from "@/components/ui/stats-card";

const OnChainDistribution = () => {
  const nftCollections = [
    {
      name: "Sonic Dimensions",
      blockchain: "Ethereum",
      released: "June 2023",
      items: 1000,
      sold: 782,
      floorPrice: "0.15 ETH",
      volume: "142 ETH"
    },
    {
      name: "Rhythm Genesis",
      blockchain: "Solana",
      released: "August 2023",
      items: 5000,
      sold: 4213,
      floorPrice: "3.2 SOL",
      volume: "12,450 SOL"
    },
    {
      name: "Beats & Bytes",
      blockchain: "Polygon",
      released: "April 2023",
      items: 2500,
      sold: 2500,
      floorPrice: "200 MATIC",
      volume: "520,000 MATIC"
    }
  ];
  
  return (
    <DistributionLayout 
      title="On-Chain Distribution" 
      subtitle="Manage your music NFTs, tokens, and on-chain royalties"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total NFTs Sold"
          value="7,495"
          description="Across all collections"
          icon={Link}
          trend="up"
          trendValue="24.3%"
          delay={0}
        />
        <StatsCard
          title="Trading Volume"
          value="182 ETH"
          description="All-time volume"
          icon={ArrowRightLeft}
          trend="up"
          trendValue="18.5%"
          delay={1}
        />
        <StatsCard
          title="Royalty Revenue"
          value="12.4 ETH"
          description="Last 30 days"
          icon={Wallet}
          trend="up"
          trendValue="8.7%"
          delay={2}
        />
        <StatsCard
          title="Unique Collectors"
          value="3,241"
          description="Across all chains"
          icon={Database}
          trend="up"
          trendValue="15.2%"
          delay={3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="glass-card p-6 lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">NFT Collections</h2>
          <div className="space-y-6">
            {nftCollections.map((collection, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-studio-sand/30 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-100 mr-4">
                      <Link className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{collection.name}</h3>
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground">{collection.blockchain}</span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">Released {collection.released}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-100 px-3 py-1 rounded-full text-green-700 text-sm font-medium">
                    {Math.round((collection.sold / collection.items) * 100)}% Sold
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="text-center p-3 bg-studio-sand/10 rounded-lg">
                    <div className="text-sm text-muted-foreground">Items</div>
                    <div className="text-lg font-medium">{collection.items.toLocaleString()}</div>
                  </div>
                  <div className="text-center p-3 bg-studio-sand/10 rounded-lg">
                    <div className="text-sm text-muted-foreground">Sold</div>
                    <div className="text-lg font-medium">{collection.sold.toLocaleString()}</div>
                  </div>
                  <div className="text-center p-3 bg-studio-sand/10 rounded-lg">
                    <div className="text-sm text-muted-foreground">Floor Price</div>
                    <div className="text-lg font-medium">{collection.floorPrice}</div>
                  </div>
                  <div className="text-center p-3 bg-studio-sand/10 rounded-lg">
                    <div className="text-sm text-muted-foreground">Volume</div>
                    <div className="text-lg font-medium">{collection.volume}</div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-studio-sand/30 flex justify-end">
                  <button className="text-purple-600 text-sm font-medium hover:text-purple-700 mr-4">
                    View Dashboard
                  </button>
                  <button className="text-studio-accent text-sm font-medium hover:text-studio-accent/80">
                    Manage Collection
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Quick Launch</h2>
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-purple-100 text-purple-700 rounded-xl font-medium flex items-center hover:bg-purple-200 transition-colors">
                <Link className="h-5 w-5 mr-3" />
                Create New Collection
              </button>
              <button className="w-full py-3 px-4 bg-blue-100 text-blue-700 rounded-xl font-medium flex items-center hover:bg-blue-200 transition-colors">
                <ArrowRightLeft className="h-5 w-5 mr-3" />
                Manage Royalty Splits
              </button>
              <button className="w-full py-3 px-4 bg-green-100 text-green-700 rounded-xl font-medium flex items-center hover:bg-green-200 transition-colors">
                <Shield className="h-5 w-5 mr-3" />
                View Smart Contracts
              </button>
            </div>
          </div>
          
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Connected Wallets</h2>
            <div className="space-y-3">
              {[
                { name: "Creator Wallet", address: "0x7Fc...3a29", balance: "2.4 ETH" },
                { name: "Royalty Wallet", address: "0x3Db...8f91", balance: "15.6 ETH" },
                { name: "Team Wallet", address: "0x9aF...b271", balance: "4.2 ETH" }
              ].map((wallet, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-studio-sand/30">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-100 mr-3">
                      <Wallet className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">{wallet.name}</div>
                      <div className="text-xs text-muted-foreground">{wallet.address}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{wallet.balance}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DistributionLayout>
  );
};

export default OnChainDistribution;
