
import React, { useState } from "react";
import AccountSummary from "./AccountSummary";
import TransactionHistory from "./TransactionHistory";
import AccountStats from "./AccountStats";
import { defaultAccountInfo } from "./types";

const AccountDashboard: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  
  const togglePause = () => {
    setIsPaused(!isPaused);
    toast(isPaused ? "Account activated" : "Account paused", {
      description: isPaused ? "All banking operations are now active" : "All banking operations are temporarily paused",
      icon: isPaused ? <RefreshCw className="h-4 w-4 text-green-500" /> : <Ban className="h-4 w-4 text-red-500" />,
    });
  };
  
  return (
    <div className="space-y-6">
      <AccountSummary 
        accountInfo={defaultAccountInfo} 
        isPaused={isPaused} 
        togglePause={togglePause} 
      />
      <TransactionHistory />
      <AccountStats />
    </div>
  );
};

import { toast } from "sonner";
import { RefreshCw, Ban } from "lucide-react";

export default AccountDashboard;
