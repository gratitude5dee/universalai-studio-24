
import React from "react";
import { Send, Download, RefreshCw, Link, BellRing, Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BankingControls: React.FC = () => {
  return (
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
};

import { Plus } from "lucide-react";

export default BankingControls;
