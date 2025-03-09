import React from "react";
import { 
  Link, ArrowUpDown, Coins, ArrowRight, Settings, 
  BarChart, Calendar, Plus, Users
} from "lucide-react";
import DistributionLayout from "@/layouts/distribution-layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const OnChainDistribution = () => {
  const [activeTab, setActiveTab] = React.useState("overview");

  // Mock data for token balances
  const tokenBalances = [
    { token: "WZRD", balance: 12500, chain: "Ethereum" },
    { token: "MAGIC", balance: 8750, chain: "Arbitrum" },
    { token: "GEM", balance: 5300, chain: "Optimism" },
  ];

  // Mock data for distribution campaigns
  const distributionCampaigns = [
    {
      id: 1,
      name: "Community Airdrop",
      token: "WZRD",
      amount: 5000,
      recipients: 250,
      status: "Active",
      startDate: "2023-10-26",
    },
    {
      id: 2,
      name: "Liquidity Mining Rewards",
      token: "MAGIC",
      amount: 3000,
      recipients: 150,
      status: "Completed",
      startDate: "2023-10-20",
    },
    {
      id: 3,
      name: "Staking Rewards",
      token: "GEM",
      amount: 2000,
      recipients: 100,
      status: "Scheduled",
      startDate: "2023-11-01",
    },
  ];

  return (
    <DistributionLayout
      title="On-Chain Distribution"
      subtitle="Manage and execute token distributions directly on the blockchain"
    >
      {/* Token Balances Overview */}
      <div className="glass-card p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Coins className="w-5 h-5 mr-2 text-studio-accent" />
          Token Balances
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tokenBalances.map((token, index) => (
            <div
              key={index}
              className="bg-white/80 rounded-xl p-4 border border-studio-sand/30"
            >
              <h3 className="font-medium">{token.token}</h3>
              <p className="text-2xl font-semibold">{token.balance}</p>
              <p className="text-sm text-muted-foreground">
                {token.chain}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Distribution Campaigns */}
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <ArrowUpDown className="w-5 h-5 mr-2 text-studio-accent" />
            Distribution Campaigns
          </h2>
          <Button variant="default" size="sm" className="bg-studio-accent gap-1">
            <Plus className="h-4 w-4" />
            Create Campaign
          </Button>
        </div>

        {/* Tabs for Active, Completed, Scheduled Campaigns */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="w-full max-w-md mb-6">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            {distributionCampaigns
              .filter((campaign) => campaign.status === "Active")
              .map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-white/80 rounded-xl p-4 mb-4 border border-studio-sand/30"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{campaign.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {campaign.token} - {campaign.amount} tokens
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                      {campaign.status}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Recipients: {campaign.recipients}
                    </p>
                    <Button variant="link" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
          </TabsContent>
          <TabsContent value="completed">
            {distributionCampaigns
              .filter((campaign) => campaign.status === "Completed")
              .map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-white/80 rounded-xl p-4 mb-4 border border-studio-sand/30"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{campaign.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {campaign.token} - {campaign.amount} tokens
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      {campaign.status}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Recipients: {campaign.recipients}
                    </p>
                    <Button variant="link" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
          </TabsContent>
          <TabsContent value="scheduled">
            {distributionCampaigns
              .filter((campaign) => campaign.status === "Scheduled")
              .map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-white/80 rounded-xl p-4 mb-4 border border-studio-sand/30"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{campaign.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {campaign.token} - {campaign.amount} tokens
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                      {campaign.status}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Recipients: {campaign.recipients}
                    </p>
                    <Button variant="link" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Community Engagement Tools */}
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Users className="w-5 h-5 mr-2 text-studio-accent" />
            Community Engagement
          </h2>
          <Button variant="default" size="sm" className="bg-studio-accent gap-1">
            <Plus className="h-4 w-4" />
            Create Poll
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/80 rounded-xl p-4 border border-studio-sand/30">
            <h3 className="font-medium mb-2">Token-Gated Content</h3>
            <p className="text-sm text-muted-foreground">
              Reward token holders with exclusive content and experiences.
            </p>
            <Button variant="outline" size="sm" className="mt-4">
              Create Token Gate
            </Button>
          </div>

          <div className="bg-white/80 rounded-xl p-4 border border-studio-sand/30">
            <h3 className="font-medium mb-2">On-Chain Polls</h3>
            <p className="text-sm text-muted-foreground">
              Gather community feedback and make decisions transparently.
            </p>
            <Button variant="outline" size="sm" className="mt-4">
              Create New Poll
            </Button>
          </div>
        </div>
      </div>
    </DistributionLayout>
  );
};

export default OnChainDistribution;
