
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DashboardLayout from "@/layouts/dashboard-layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Users, 
  DollarSign, 
  Shield, 
  Share2, 
  ChevronRight,
  Copyright,
  Clock,
  Wallet,
  BarChart4
} from "lucide-react";
import RightsJourney from "@/components/rights/RightsJourney";
import CollaboratorEcosystem from "@/components/rights/CollaboratorEcosystem";
import RevenueJourney from "@/components/rights/RevenueJourney";
import RecentMilestones from "@/components/rights/RecentMilestones";

const RightsManagement = () => {
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState<string | null>("The Universal Dream");
  
  const assetOptions = [
    "The Universal Dream",
    "Cosmic Voyager",
    "Digital Renaissance",
    "Neural Nexus"
  ];
  
  const handleAssetChange = (asset: string) => {
    setSelectedAsset(asset);
    toast(`Loaded IP details for "${asset}"`);
  };
  
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-semibold text-studio-charcoal mb-2">IP Portal</h1>
          <p className="text-studio-clay">Transform legal complexity into the story of your creation's journey</p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-6">
          {assetOptions.map((asset) => (
            <motion.button
              key={asset}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                selectedAsset === asset 
                  ? 'bg-[#9b87f5] text-white' 
                  : 'bg-white border border-studio-sand hover:border-[#9b87f5]/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAssetChange(asset)}
            >
              {asset}
            </motion.button>
          ))}
          
          <motion.button
            className="px-4 py-2 rounded-lg text-sm border border-dashed border-studio-sand flex items-center text-studio-clay hover:border-[#9b87f5]/50 hover:text-[#9b87f5]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/collection")}
          >
            <span>Add Asset</span>
            <ChevronRight size={16} className="ml-1" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="glass-card p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium flex items-center gap-2">
                  <Shield className="text-[#9b87f5]" size={20} />
                  IP Rights Journey
                </h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Clock size={14} className="mr-1" />
                    History
                  </Button>
                  <Button variant="ghost" size="sm" className="text-[#9b87f5]" onClick={() => navigate("/collection")}>
                    Change Creation <ChevronRight size={16} />
                  </Button>
                </div>
              </div>

              {selectedAsset && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl font-semibold text-studio-charcoal">{selectedAsset}</h3>
                  <RightsJourney />
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-card p-6 h-full">
              <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
                <Users className="text-[#9b87f5]" size={20} />
                Collaborator Ecosystem
              </h2>
              <CollaboratorEcosystem />
              
              <div className="mt-6 pt-4 border-t border-studio-sand/30">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                  <Copyright size={14} className="text-[#9b87f5]" />
                  Rights Management
                </h3>
                <div className="space-y-2">
                  <motion.button 
                    className="w-full text-left p-3 flex items-center justify-between rounded-lg bg-[#F1F0FB] text-sm hover:bg-[#E5DEFF]"
                    whileHover={{ x: 3 }}
                  >
                    <span>Register Copyright</span>
                    <ChevronRight size={16} />
                  </motion.button>
                  <motion.button 
                    className="w-full text-left p-3 flex items-center justify-between rounded-lg bg-[#F1F0FB] text-sm hover:bg-[#E5DEFF]"
                    whileHover={{ x: 3 }}
                  >
                    <span>Trademark Creation</span>
                    <ChevronRight size={16} />
                  </motion.button>
                  <motion.button 
                    className="w-full text-left p-3 flex items-center justify-between rounded-lg bg-[#F1F0FB] text-sm hover:bg-[#E5DEFF]"
                    whileHover={{ x: 3 }}
                  >
                    <span>View Smart Contracts</span>
                    <ChevronRight size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="glass-card p-6 h-full">
              <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
                <DollarSign className="text-[#9b87f5]" size={20} />
                Revenue Journey
              </h2>
              <RevenueJourney />
              
              <div className="mt-4 pt-4 border-t border-studio-sand/30">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium flex items-center gap-1.5">
                    <Wallet size={14} className="text-[#9b87f5]" />
                    Earnings Overview
                  </h3>
                  <Button variant="outline" size="sm" className="text-xs">
                    <BarChart4 size={14} className="mr-1" />
                    Full Analytics
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div className="p-3 rounded-lg border border-studio-sand/30 text-center">
                    <p className="text-xs text-studio-clay">Last 30 Days</p>
                    <p className="text-lg font-medium mt-1">$1,245.80</p>
                  </div>
                  <div className="p-3 rounded-lg border border-studio-sand/30 text-center">
                    <p className="text-xs text-studio-clay">Platforms</p>
                    <p className="text-lg font-medium mt-1">8</p>
                  </div>
                  <div className="p-3 rounded-lg border border-studio-sand/30 text-center">
                    <p className="text-xs text-studio-clay">Growth</p>
                    <p className="text-lg font-medium text-green-500 mt-1">+24%</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="glass-card p-6 h-full">
              <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
                <FileText className="text-[#9b87f5]" size={20} />
                License Scenario Modeling
              </h2>
              <div className="space-y-4">
                <motion.div 
                  className="p-4 bg-[#F1F0FB] rounded-xl border border-studio-sand flex gap-3 items-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="bg-[#9b87f5]/20 p-2 rounded-full">
                    <Share2 size={18} className="text-[#9b87f5]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Creative Commons</h3>
                    <p className="text-sm text-studio-clay">Share, remix, and build upon</p>
                  </div>
                </motion.div>
                
                <div className="text-sm text-studio-clay p-3 border border-dashed border-studio-sand/50 rounded-lg">
                  <p className="mb-2"><strong>License Terms:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Share — copy and redistribute in any medium or format</li>
                    <li>Adapt — remix, transform, and build upon the material</li>
                    <li>Credit must be given to the creator</li>
                    <li>Changes must be indicated</li>
                  </ul>
                </div>
                
                <Button variant="outline" className="w-full">Explore License Scenarios</Button>
                <Button variant="outline" className="w-full">Export License Agreement</Button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="glass-card p-6">
            <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
              <Shield className="text-[#9b87f5]" size={20} />
              Recent Milestones
            </h2>
            <RecentMilestones />
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default RightsManagement;
