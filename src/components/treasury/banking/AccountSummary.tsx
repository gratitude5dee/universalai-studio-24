
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff, RefreshCw, Ban, ClipboardCopy, Send, Download, CreditCard, Calendar, Settings, Link } from "lucide-react";
import { toast } from "sonner";
import { AccountInfo, formatCurrency } from "./types";

interface AccountSummaryProps {
  accountInfo: AccountInfo;
  isPaused: boolean;
  togglePause: () => void;
}

const AccountSummary: React.FC<AccountSummaryProps> = ({ 
  accountInfo, 
  isPaused, 
  togglePause 
}) => {
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [showRoutingNumber, setShowRoutingNumber] = useState(false);

  const toggleAccountNumber = () => {
    setShowAccountNumber(!showAccountNumber);
  };

  const toggleRoutingNumber = () => {
    setShowRoutingNumber(!showRoutingNumber);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast(`${type} copied`, {
      description: `The ${type.toLowerCase()} has been copied to clipboard`,
      icon: <Check className="h-4 w-4" />,
    });
  };

  return (
    <div className={`glass-card p-6 ${isPaused ? 'border-red-300' : ''} relative overflow-hidden`}>
      {isPaused && (
        <div className="absolute inset-0 bg-red-100/30 backdrop-blur-[1px] flex items-center justify-center z-10">
          <div className="bg-white p-4 rounded-lg shadow-lg border border-red-200 flex items-center">
            <Ban className="h-5 w-5 text-red-500 mr-2" />
            <span className="font-medium text-red-700">Account Temporarily Paused</span>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">Research Assistant</h2>
          <p className="text-muted-foreground">Agent Bank Account (Checking)</p>
        </div>
        <Button 
          variant={isPaused ? "default" : "outline"} 
          size="sm"
          onClick={togglePause}
          className={isPaused ? "bg-red-500 hover:bg-red-600 text-white" : ""}
        >
          {isPaused ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2" /> Reactivate Account
            </>
          ) : (
            <>
              <Ban className="h-4 w-4 mr-2" /> Emergency Pause
            </>
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Current Balance</h3>
          <div className="text-3xl font-bold">{formatCurrency(accountInfo.balance)}</div>
          
          <div className="mt-6 space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-medium text-muted-foreground">Account Number</h4>
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={toggleAccountNumber}
                    className="text-studio-accent hover:text-studio-accent/80 transition-colors"
                  >
                    {showAccountNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button 
                    onClick={() => copyToClipboard(accountInfo.accountNumber, "Account Number")}
                    className="text-studio-accent hover:text-studio-accent/80 transition-colors"
                  >
                    <ClipboardCopy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="bg-studio-sand/10 p-2 rounded-md font-mono text-sm flex items-center">
                <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                {showAccountNumber ? accountInfo.accountNumber : '••••-••••-••••-' + accountInfo.accountNumber.slice(-4)}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-medium text-muted-foreground">Routing Number</h4>
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={toggleRoutingNumber}
                    className="text-studio-accent hover:text-studio-accent/80 transition-colors"
                  >
                    {showRoutingNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button 
                    onClick={() => copyToClipboard(accountInfo.routingNumber, "Routing Number")}
                    className="text-studio-accent hover:text-studio-accent/80 transition-colors"
                  >
                    <ClipboardCopy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="bg-studio-sand/10 p-2 rounded-md font-mono text-sm flex items-center">
                <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                {showRoutingNumber ? accountInfo.routingNumber : '•••••••' + accountInfo.routingNumber.slice(-2)}
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-studio-sand/10 p-5 rounded-xl border border-studio-sand/20 h-full">
            <h3 className="text-sm font-medium mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="h-auto py-3 px-3 flex flex-col items-center justify-center gap-2">
                <Send className="h-5 w-5 text-studio-accent" />
                <span className="text-xs font-normal">Transfer</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-3 px-3 flex flex-col items-center justify-center gap-2">
                <Download className="h-5 w-5 text-studio-accent" />
                <span className="text-xs font-normal">Deposit</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-3 px-3 flex flex-col items-center justify-center gap-2">
                <CreditCard className="h-5 w-5 text-studio-accent" />
                <span className="text-xs font-normal">Pay</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-3 px-3 flex flex-col items-center justify-center gap-2">
                <Calendar className="h-5 w-5 text-studio-accent" />
                <span className="text-xs font-normal">Schedule</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-3 px-3 flex flex-col items-center justify-center gap-2">
                <Settings className="h-5 w-5 text-studio-accent" />
                <span className="text-xs font-normal">Settings</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-3 px-3 flex flex-col items-center justify-center gap-2">
                <Link className="h-5 w-5 text-studio-accent" />
                <span className="text-xs font-normal">Connect</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Check } from "lucide-react";

export default AccountSummary;
