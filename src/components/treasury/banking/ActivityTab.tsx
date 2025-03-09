
import React from "react";
import { BarChart3 } from "lucide-react";
import TransactionHistory from "./TransactionHistory";

const ActivityTab: React.FC = () => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-medium mb-4">Banking Activities</h3>
      
      <div className="mb-6">
        {/* Visualization of transaction activity */}
        <div className="aspect-video bg-studio-sand/10 rounded-xl flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <BarChart3 className="h-10 w-10 mx-auto mb-2 text-studio-accent/50" />
            <p>Transaction Activity Chart</p>
          </div>
        </div>
      </div>
      
      <TransactionHistory />
    </div>
  );
};

export default ActivityTab;
