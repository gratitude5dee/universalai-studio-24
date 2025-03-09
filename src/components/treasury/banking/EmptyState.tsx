
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Landmark, Plus, Zap, Download, Calendar } from "lucide-react";

interface EmptyStateProps {
  startWizard: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ startWizard }) => {
  return (
    <motion.div 
      className="glass-card p-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="inline-flex items-center justify-center bg-studio-highlight/30 w-16 h-16 rounded-full mb-6">
        <Landmark className="h-8 w-8 text-studio-accent" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">Agent Banking</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        Give your AI agents their own financial autonomy with secure banking infrastructure. 
        Enable automated payments, income collection, and scheduled transactions.
      </p>
      
      <Button 
        size="lg" 
        onClick={startWizard}
        className="bg-studio-accent hover:bg-studio-accent/90 transition-all mx-auto"
      >
        <Plus className="mr-2 h-4 w-4" /> Create Agent Account
      </Button>
      
      <div className="grid grid-cols-3 gap-6 mt-10 text-left">
        <div>
          <div className="bg-studio-highlight/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
            <Zap className="h-5 w-5 text-studio-accent" />
          </div>
          <h3 className="font-medium mb-1">Autonomous Payments</h3>
          <p className="text-sm text-muted-foreground">Agents can pay for services without your constant approval</p>
        </div>
        
        <div>
          <div className="bg-studio-highlight/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
            <Download className="h-5 w-5 text-studio-accent" />
          </div>
          <h3 className="font-medium mb-1">Income Collection</h3>
          <p className="text-sm text-muted-foreground">Agents can receive payments for their services</p>
        </div>
        
        <div>
          <div className="bg-studio-highlight/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
            <Calendar className="h-5 w-5 text-studio-accent" />
          </div>
          <h3 className="font-medium mb-1">Scheduled Transactions</h3>
          <p className="text-sm text-muted-foreground">Set up recurring payments and deposits</p>
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyState;
