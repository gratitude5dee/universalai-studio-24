
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, Landmark, Lock, Eye, EyeOff, Wallet, Send, Download, 
  Plus, Shield, BellRing, Calendar, RefreshCw, AlertTriangle, Zap, 
  Settings, Ban, Key, Check, Filter, Search, ClipboardCopy, Trash, 
  Bot, ChevronRight, Globe, Badge, Link, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const transactionHistory = [
  { 
    id: "tx1", 
    type: "incoming", 
    amount: 2500, 
    date: "2023-06-15T10:30:00Z", 
    description: "Commission payment",
    status: "completed",
    counterparty: "MarketplaceX"
  },
  { 
    id: "tx2", 
    type: "outgoing", 
    amount: 320.50, 
    date: "2023-06-12T15:45:00Z", 
    description: "API subscription renewal",
    status: "completed",
    counterparty: "CloudServices Inc."
  },
  { 
    id: "tx3", 
    type: "incoming", 
    amount: 1750, 
    date: "2023-06-05T09:15:00Z", 
    description: "Royalty payment",
    status: "completed",
    counterparty: "Content Network"
  },
  { 
    id: "tx4", 
    type: "outgoing", 
    amount: 89.99, 
    date: "2023-06-02T11:20:00Z", 
    description: "Data storage fee",
    status: "completed",
    counterparty: "DataVault Pro"
  },
  { 
    id: "tx5", 
    type: "outgoing", 
    amount: 1200, 
    date: "2023-06-01T16:30:00Z", 
    description: "Content creation service",
    status: "pending",
    counterparty: "CreativeMinds Agency"
  },
];

interface AccountInfo {
  accountNumber: string;
  routingNumber: string;
  balance: number;
  currency: string;
  type: "checking" | "savings" | "multi-currency";
  status: "active" | "paused" | "inactive";
  creationDate: string;
  lastActivity: string;
}

const AgentBanking: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("overview");
  const [hasAccount, setHasAccount] = useState(true);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [showRoutingNumber, setShowRoutingNumber] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [totalSteps] = useState(6);
  
  const accountInfo: AccountInfo = {
    accountNumber: "4218-7643-9025-1103",
    routingNumber: "072541836",
    balance: 4539.51,
    currency: "USD",
    type: "checking",
    status: "active",
    creationDate: "2023-01-15",
    lastActivity: "2023-06-15T10:30:00Z"
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: accountInfo.currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    toast(isPaused ? "Account activated" : "Account paused", {
      description: isPaused ? "All banking operations are now active" : "All banking operations are temporarily paused",
      icon: isPaused ? <RefreshCw className="h-4 w-4 text-green-500" /> : <Ban className="h-4 w-4 text-red-500" />,
    });
  };

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

  const startWizard = () => {
    setHasAccount(false);
  };

  const finishWizard = () => {
    setHasAccount(true);
    toast("Agent account created!", {
      description: "Your agent now has a fully functional bank account",
      icon: <Landmark className="h-4 w-4 text-studio-accent" />,
    });
  };

  const getWizardTitle = () => {
    switch(wizardStep) {
      case 1: return "Select Account Purpose";
      case 2: return "Choose Your Agent";
      case 3: return "Select Account Type";
      case 4: return "Initial Funding";
      case 5: return "Risk Profile & Limits";
      case 6: return "Compliance Verification";
      default: return "Create Agent Account";
    }
  };

  const renderAccountSetupWizard = () => (
    <motion.div 
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{getWizardTitle()}</h2>
        <div className="flex items-center mt-4 mb-8">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <React.Fragment key={index}>
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300", 
                  wizardStep > index 
                    ? "bg-studio-accent text-white" 
                    : wizardStep === index + 1 
                      ? "bg-studio-accent/20 text-studio-accent border border-studio-accent" 
                      : "bg-studio-sand/30 text-studio-charcoal"
                )}
              >
                {index + 1}
              </div>
              {index < totalSteps - 1 && (
                <div 
                  className={cn(
                    "h-0.5 w-12 transition-all duration-300",
                    wizardStep > index + 1 
                      ? "bg-studio-accent" 
                      : "bg-studio-sand/50"
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={wizardStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="min-h-[320px]"
        >
          {wizardStep === 1 && (
            <div className="grid grid-cols-3 gap-4">
              <div onClick={() => setWizardStep(2)} className="bg-white p-5 rounded-xl border border-studio-sand/30 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-studio-accent/50">
                <div className="mb-3 bg-studio-highlight/30 w-12 h-12 flex items-center justify-center rounded-lg">
                  <Download className="h-6 w-6 text-studio-accent" />
                </div>
                <h3 className="text-lg font-medium mb-2">Payment Collection</h3>
                <p className="text-muted-foreground text-sm">Receive payments from clients and services automatically.</p>
              </div>
              <div onClick={() => setWizardStep(2)} className="bg-white p-5 rounded-xl border border-studio-sand/30 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-studio-accent/50">
                <div className="mb-3 bg-studio-highlight/30 w-12 h-12 flex items-center justify-center rounded-lg">
                  <Send className="h-6 w-6 text-studio-accent" />
                </div>
                <h3 className="text-lg font-medium mb-2">Disbursement</h3>
                <p className="text-muted-foreground text-sm">Pay for services and subscriptions without manual approval.</p>
              </div>
              <div onClick={() => setWizardStep(2)} className="bg-white p-5 rounded-xl border border-studio-sand/30 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-studio-accent/50">
                <div className="mb-3 bg-studio-highlight/30 w-12 h-12 flex items-center justify-center rounded-lg">
                  <Zap className="h-6 w-6 text-studio-accent" />
                </div>
                <h3 className="text-lg font-medium mb-2">Full Autonomy</h3>
                <p className="text-muted-foreground text-sm">Complete financial freedom within your defined limits.</p>
              </div>
            </div>
          )}

          {wizardStep === 2 && (
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search agents..."
                  className="w-full p-3 rounded-lg border border-studio-sand/30 mb-4 pl-10"
                />
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              </div>
              
              <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
                {[1, 2, 3, 4].map((index) => (
                  <div 
                    key={index}
                    onClick={() => setWizardStep(3)}
                    className="flex items-center p-3 bg-white rounded-lg border border-studio-sand/30 cursor-pointer hover:border-studio-accent/50 hover:shadow-sm transition-all"
                  >
                    <div className="bg-studio-highlight/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <Bot className="h-5 w-5 text-studio-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Research Assistant {index}</h4>
                      <p className="text-xs text-muted-foreground">Created on {new Date(2023, 0, index * 5).toLocaleDateString()}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {wizardStep === 3 && (
            <div className="grid grid-cols-3 gap-4">
              <div onClick={() => setWizardStep(4)} className="bg-white p-5 rounded-xl border border-studio-sand/30 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-studio-accent/50">
                <div className="mb-3 bg-studio-highlight/30 w-12 h-12 flex items-center justify-center rounded-lg">
                  <Landmark className="h-6 w-6 text-studio-accent" />
                </div>
                <h3 className="text-lg font-medium mb-2">Checking</h3>
                <p className="text-muted-foreground text-sm">Standard account for regular transactions.</p>
              </div>
              <div onClick={() => setWizardStep(4)} className="bg-white p-5 rounded-xl border border-studio-sand/30 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-studio-accent/50">
                <div className="mb-3 bg-studio-highlight/30 w-12 h-12 flex items-center justify-center rounded-lg">
                  <Wallet className="h-6 w-6 text-studio-accent" />
                </div>
                <h3 className="text-lg font-medium mb-2">Savings</h3>
                <p className="text-muted-foreground text-sm">Optimized for saving funds with limited transactions.</p>
              </div>
              <div onClick={() => setWizardStep(4)} className="bg-white p-5 rounded-xl border border-studio-sand/30 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-studio-accent/50">
                <div className="mb-3 bg-studio-highlight/30 w-12 h-12 flex items-center justify-center rounded-lg">
                  <Globe className="h-6 w-6 text-studio-accent" />
                </div>
                <h3 className="text-lg font-medium mb-2">Multi-Currency</h3>
                <p className="text-muted-foreground text-sm">Hold and transact in multiple currencies.</p>
              </div>
            </div>
          )}

          {wizardStep === 4 && (
            <div className="space-y-5">
              <div className="bg-white p-5 rounded-xl border border-studio-sand/30">
                <h3 className="text-lg font-medium mb-3">Initial Deposit</h3>
                <div className="flex items-end gap-4 mb-5">
                  <div className="flex-1">
                    <label className="text-sm text-muted-foreground mb-1 block">Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                      <input
                        type="text"
                        defaultValue="1000.00"
                        className="w-full p-2 rounded-lg border border-studio-sand/30 pl-8"
                      />
                    </div>
                  </div>
                  <Button onClick={() => setWizardStep(5)} variant="outline" className="mb-0.5">Continue</Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-studio-highlight/10 rounded-lg cursor-pointer">
                    <input type="radio" name="fundingSource" id="mainAccount" defaultChecked className="mr-3" />
                    <div className="flex-1">
                      <label htmlFor="mainAccount" className="font-medium cursor-pointer">Transfer from Main Account</label>
                      <p className="text-xs text-muted-foreground">Available balance: $12,459.32</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-white rounded-lg border border-studio-sand/30 cursor-pointer">
                    <input type="radio" name="fundingSource" id="externalSource" className="mr-3" />
                    <div className="flex-1">
                      <label htmlFor="externalSource" className="font-medium cursor-pointer">Connect External Funding Source</label>
                      <p className="text-xs text-muted-foreground">Link your bank account or credit card</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {wizardStep === 5 && (
            <div className="space-y-5">
              <div className="bg-white p-5 rounded-xl border border-studio-sand/30">
                <h3 className="text-lg font-medium mb-4">Transaction Limits</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm text-muted-foreground">Per Transaction Limit</label>
                      <span className="text-sm font-medium">$500</span>
                    </div>
                    <input type="range" min="100" max="10000" defaultValue="500" className="w-full" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm text-muted-foreground">Daily Limit</label>
                      <span className="text-sm font-medium">$2,000</span>
                    </div>
                    <input type="range" min="100" max="20000" defaultValue="2000" className="w-full" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm text-muted-foreground">Monthly Limit</label>
                      <span className="text-sm font-medium">$10,000</span>
                    </div>
                    <input type="range" min="1000" max="50000" defaultValue="10000" className="w-full" />
                  </div>
                </div>
                
                <div className="mt-5 pt-4 border-t border-studio-sand/30">
                  <h4 className="text-sm font-medium mb-3">Approval Requirements</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="exceedLimit" defaultChecked className="mr-2" />
                      <label htmlFor="exceedLimit" className="text-sm">Require approval for transactions exceeding limits</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="newRecipient" defaultChecked className="mr-2" />
                      <label htmlFor="newRecipient" className="text-sm">Require approval for first-time recipients</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="highRisk" defaultChecked className="mr-2" />
                      <label htmlFor="highRisk" className="text-sm">Require approval for high-risk categories</label>
                    </div>
                  </div>
                </div>
                
                <Button onClick={() => setWizardStep(6)} className="w-full mt-5">Continue</Button>
              </div>
            </div>
          )}

          {wizardStep === 6 && (
            <div className="space-y-4">
              <div className="bg-studio-sand/10 p-4 rounded-lg border border-studio-sand/30">
                <div className="flex items-start mb-3">
                  <Shield className="h-5 w-5 text-studio-accent mr-2 mt-0.5" />
                  <h3 className="text-lg font-medium">Compliance Information</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  By creating an Agent Banking account, you acknowledge that you will comply with all applicable financial regulations and that your agent's transactions will be monitored for fraud prevention and regulatory compliance.
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                    <p className="text-sm">Transactions will be monitored and logged for regulatory compliance</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                    <p className="text-sm">You remain responsible for your agent's financial activities</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                    <p className="text-sm">Suspicious activities will be flagged for review</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-5">
                  <input type="checkbox" id="agreeTerms" className="mr-2" />
                  <label htmlFor="agreeTerms" className="text-sm">
                    I have read and agree to the <a href="#" className="text-studio-accent underline">Terms of Service</a> and <a href="#" className="text-studio-accent underline">Agent Banking Agreement</a>
                  </label>
                </div>
                
                <Button onClick={finishWizard} className="w-full">Create Agent Account</Button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={() => wizardStep > 1 ? setWizardStep(wizardStep - 1) : setHasAccount(true)}
        >
          Back
        </Button>
        
        <Button 
          onClick={() => wizardStep < totalSteps ? setWizardStep(wizardStep + 1) : finishWizard()}
          disabled={wizardStep === totalSteps}
        >
          {wizardStep < totalSteps ? "Next" : "Create Account"}
        </Button>
      </div>
    </motion.div>
  );

  const renderEmptyState = () => (
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

  const renderTransactionHistory = () => (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Transaction History</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs h-8">
            <Filter className="h-3 w-3 mr-1" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8">
            <Download className="h-3 w-3 mr-1" /> Export
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-studio-sand/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-studio-sand/20 bg-studio-sand/10">
                <th className="text-left px-4 py-3 text-xs font-medium text-studio-charcoal/70">Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-studio-charcoal/70">Description</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-studio-charcoal/70">Counterparty</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-studio-charcoal/70">Amount</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-studio-charcoal/70">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((transaction) => (
                <tr key={transaction.id} className="border-b border-studio-sand/10 hover:bg-studio-sand/5">
                  <td className="px-4 py-3 text-sm">{formatDate(transaction.date)}</td>
                  <td className="px-4 py-3 text-sm">{transaction.description}</td>
                  <td className="px-4 py-3 text-sm">{transaction.counterparty}</td>
                  <td className={`px-4 py-3 text-sm text-right ${transaction.type === 'incoming' ? 'text-green-600' : ''}`}>
                    {transaction.type === 'incoming' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAccountDashboard = () => (
    <div className="space-y-6">
      {/* Account Summary */}
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
      
      {renderTransactionHistory()}
      
      <div className="grid grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="text-lg font-medium mb-4">Income & Expenditure</h3>
          <div className="aspect-video flex items-center justify-center bg-studio-sand/10 rounded-xl">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="h-10 w-10 mx-auto mb-2 text-studio-accent/50" />
              <p>Income vs. Expenditure Chart</p>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Pending Approvals</h3>
            <Badge className="bg-yellow-500">{2}</Badge>
          </div>
          
          <div className="space-y-3">
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Large Transfer Pending</h4>
                  <p className="text-xs text-muted-foreground mb-2">$2,500.00 to DataVault Pro</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="h-7 text-xs">Approve</Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs">Deny</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">New Recipient</h4>
                  <p className="text-xs text-muted-foreground mb-2">$350.00 to Cloud Hosting LLC</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="h-7 text-xs">Approve</Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs">Deny</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBankingControls = () => (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium mb-5">Permission Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-studio-sand/20">
            <div className="flex items-center">
              <div className="bg-studio-highlight/10 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                <Send className="h-4 w-4 text-studio-accent" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Outgoing Payments</h4>
                <p className="text-xs text-muted-foreground">Allow agent to send payments</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select className="text-sm border border-studio-sand/30 rounded-md px-2 py-1">
                <option>Approval Required</option>
                <option>Autonomous</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-studio-sand/20">
            <div className="flex items-center">
              <div className="bg-studio-highlight/10 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                <Download className="h-4 w-4 text-studio-accent" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Incoming Payments</h4>
                <p className="text-xs text-muted-foreground">Allow agent to receive funds</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select className="text-sm border border-studio-sand/30 rounded-md px-2 py-1">
                <option>Autonomous</option>
                <option>Approval Required</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-studio-sand/20">
            <div className="flex items-center">
              <div className="bg-studio-highlight/10 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                <RefreshCw className="h-4 w-4 text-studio-accent" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Recurring Transactions</h4>
                <p className="text-xs text-muted-foreground">Allow scheduled payments</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select className="text-sm border border-studio-sand/30 rounded-md px-2 py-1">
                <option>Approval Required</option>
                <option>Autonomous</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-studio-sand/20">
            <div className="flex items-center">
              <div className="bg-studio-highlight/10 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                <Link className="h-4 w-4 text-studio-accent" />
              </div>
              <div>
                <h4 className="font-medium text-sm">External Connections</h4>
                <p className="text-xs text-muted-foreground">Allow connecting to third-party services</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select className="text-sm border border-studio-sand/30 rounded-md px-2 py-1">
                <option>Disabled</option>
                <option>Approval Required</option>
                <option>Autonomous</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium mb-4">Alert Configuration</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-md border border-studio-sand/20">
              <div className="flex items-center">
                <BellRing className="h-4 w-4 text-studio-accent mr-3" />
                <span className="text-sm">Large Transactions</span>
              </div>
              <div>
                <input type="checkbox" defaultChecked className="toggle toggle-sm" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-md border border-studio-sand/20">
              <div className="flex items-center">
                <BellRing className="h-4 w-4 text-studio-accent mr-3" />
                <span className="text-sm">New Recipients</span>
              </div>
              <div>
                <input type="checkbox" defaultChecked className="toggle toggle-sm" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-md border border-studio-sand/20">
              <div className="flex items-center">
                <BellRing className="h-4 w-4 text-studio-accent mr-3" />
                <span className="text-sm">Suspicious Activity</span>
              </div>
              <div>
                <input type="checkbox" defaultChecked className="toggle toggle-sm" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-md border border-studio-sand/20">
              <div className="flex items-center">
                <BellRing className="h-4 w-4 text-studio-accent mr-3" />
                <span className="text-sm">Low Balance</span>
              </div>
              <div>
                <input type="checkbox" defaultChecked className="toggle toggle-sm" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <h3 className="text-lg font-medium mb-4">Scheduled Transactions</h3>
          
          <div className="space-y-4">
            <div className="p-3 bg-white rounded-lg border border-studio-sand/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">API Subscription</h4>
                <Badge className="bg-blue-500">Monthly</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">$29.99 to CloudAPI Inc.</p>
                <Button variant="outline" size="sm" className="h-7 text-xs">Edit</Button>
              </div>
            </div>
            
            <div className="p-3 bg-white rounded-lg border border-studio-sand/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">Storage Fees</h4>
                <Badge className="bg-blue-500">Weekly</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">$12.50 to DataStore</p>
                <Button variant="outline" size="sm" className="h-7 text-xs">Edit</Button>
              </div>
            </div>
            
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Scheduled Transaction
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApiIntegration = () => (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium">API Access Keys</h3>
            <p className="text-sm text-muted-foreground">Securely access your agent's banking capabilities</p>
          </div>
          <Button>
            <Key className="h-4 w-4 mr-2" /> Generate New Key
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-studio-sand/20">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium">Live API Key</h4>
                <p className="text-xs text-muted-foreground">Created on Jun 12, 2023</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-7">
                  <RefreshCw className="h-3 w-3 mr-1" /> Rotate
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-red-500 hover:text-red-600">
                  <Trash className="h-3 w-3 mr-1" /> Revoke
                </Button>
              </div>
            </div>
            
            <div className="bg-studio-sand/10 p-2 rounded-md font-mono text-sm flex items-center">
              <Key className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>sk_live_••••••••••••••••••••••••••••••</span>
              <button className="ml-auto text-studio-accent">
                <ClipboardCopy className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-studio-sand/20">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium">Test API Key</h4>
                <p className="text-xs text-muted-foreground">Created on Jun 12, 2023</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-7">
                  <RefreshCw className="h-3 w-3 mr-1" /> Rotate
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-red-500 hover:text-red-600">
                  <Trash className="h-3 w-3 mr-1" /> Revoke
                </Button>
              </div>
            </div>
            
            <div className="bg-studio-sand/10 p-2 rounded-md font-mono text-sm flex items-center">
              <Key className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>sk_test_••••••••••••••••••••••••••••••</span>
              <button className="ml-auto text-studio-accent">
                <ClipboardCopy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium mb-4">Webhook Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Webhook URL</label>
            <div className="flex">
              <input type="text" className="flex-1 rounded-l-md border border-studio-sand/30 p-2" placeholder="https://your-app.com/webhook" />
              <Button className="rounded-l-none">Save</Button>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Events to Trigger Webhook</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <input type="checkbox" id="event-deposit" defaultChecked className="mr-2" />
                <label htmlFor="event-deposit" className="text-sm">Deposits</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="event-withdrawal" defaultChecked className="mr-2" />
                <label htmlFor="event-withdrawal" className="text-sm">Withdrawals</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="event-approval" defaultChecked className="mr-2" />
                <label htmlFor="event-approval" className="text-sm">Approval Requests</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="event-failure" defaultChecked className="mr-2" />
                <label htmlFor="event-failure" className="text-sm">Transaction Failures</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium mb-4">API Code Samples</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Check Balance</h4>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                <ClipboardCopy className="h-3 w-3 mr-1" /> Copy
              </Button>
            </div>
            <pre className="bg-studio-charcoal text-white p-3 rounded-md text-xs overflow-x-auto">
              {`curl -X GET \\
  https://api.payman.io/v1/agent/balance \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
            </pre>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Create Transfer</h4>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                <ClipboardCopy className="h-3 w-3 mr-1" /> Copy
              </Button>
            </div>
            <pre className="bg-studio-charcoal text-white p-3 rounded-md text-xs overflow-x-auto">
              {`curl -X POST \\
  https://api.payman.io/v1/agent/transfer \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 100,
    "currency": "USD",
    "recipient": "rec_12345",
    "description": "API payment"
  }'`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-6">
      <div className="mb-5">
        <h2 className="text-2xl font-bold mb-1">Agent Banking Portal</h2>
        <p className="text-muted-foreground">
          Empower your AI agents with autonomous financial capabilities
        </p>
      </div>
      
      {!hasAccount ? (
        renderAccountSetupWizard()
      ) : (
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="mb-6 bg-white/80 backdrop-blur-md border border-studio-sand/30 rounded-xl p-1 shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-studio-accent data-[state=active]:text-white">
              Account Overview
            </TabsTrigger>
            <TabsTrigger value="controls" className="data-[state=active]:bg-studio-accent data-[state=active]:text-white">
              Banking Controls
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-studio-accent data-[state=active]:text-white">
              Transaction Activity
            </TabsTrigger>
            <TabsTrigger value="integration" className="data-[state=active]:bg-studio-accent data-[state=active]:text-white">
              API Integration
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="outline-none">
            {hasAccount ? renderAccountDashboard() : renderEmptyState()}
          </TabsContent>
          
          <TabsContent value="controls" className="outline-none">
            {renderBankingControls()}
          </TabsContent>
          
          <TabsContent value="activity" className="outline-none">
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
              
              {renderTransactionHistory()}
            </div>
          </TabsContent>
          
          <TabsContent value="integration" className="outline-none">
            {renderApiIntegration()}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

import { Check, Filter, Search, ClipboardCopy, Trash, Bot, ChevronRight, Globe, Badge } from 'lucide-react';

export default AgentBanking;
