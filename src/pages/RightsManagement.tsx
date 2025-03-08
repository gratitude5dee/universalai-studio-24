
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/dashboard-layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Book, Users, DollarSign, Shield, Share2, ChevronRight } from "lucide-react";
import RightsJourney from "@/components/rights/RightsJourney";
import CollaboratorEcosystem from "@/components/rights/CollaboratorEcosystem";
import RevenueJourney from "@/components/rights/RevenueJourney";
import RecentMilestones from "@/components/rights/RecentMilestones";

const RightsManagement = () => {
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState<string | null>("The Universal Dream");
  
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
          <h1 className="text-3xl font-semibold text-studio-charcoal mb-2">Rights Journey</h1>
          <p className="text-studio-clay">Transform legal complexity into the story of your creation's journey</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="glass-card p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium flex items-center gap-2">
                  <Book className="text-studio-accent" size={20} />
                  Your Creation's Story
                </h2>
                <Button variant="ghost" size="sm" className="text-studio-accent" onClick={() => navigate("/collection")}>
                  Change Creation <ChevronRight size={16} />
                </Button>
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
                <Users className="text-studio-accent" size={20} />
                Collaborator Ecosystem
              </h2>
              <CollaboratorEcosystem />
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
                <DollarSign className="text-studio-accent" size={20} />
                Revenue Journey
              </h2>
              <RevenueJourney />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="glass-card p-6 h-full">
              <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
                <Shield className="text-studio-accent" size={20} />
                License Story
              </h2>
              <div className="space-y-4">
                <motion.div 
                  className="p-4 bg-studio-highlight/30 rounded-xl border border-studio-sand flex gap-3 items-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="bg-studio-accent/20 p-2 rounded-full">
                    <Share2 size={18} className="text-studio-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium">Creative Commons</h3>
                    <p className="text-sm text-studio-clay">Share, remix, and build upon</p>
                  </div>
                </motion.div>
                
                <Button variant="outline" className="w-full">Change License Terms</Button>
                <p className="text-sm text-studio-clay text-center">Your creation can be shared while giving you credit</p>
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
              <Users className="text-studio-accent" size={20} />
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
