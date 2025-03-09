
import React, { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CopyIcon, RefreshCw, Wallet } from "lucide-react";

export const WalletInfo = () => {
  const { address, balance, isLoading, fetchBalance, transferSOL } = useWallet();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  };

  const handleTransfer = async () => {
    if (!recipient || !amount) {
      toast.error("Please provide recipient address and amount");
      return;
    }

    try {
      setIsTransferring(true);
      const success = await transferSOL(recipient, parseFloat(amount));
      if (success) {
        setIsDialogOpen(false);
        setRecipient("");
        setAmount("");
      }
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <div className="flex items-center">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-lg border border-white/20"
          >
            <Wallet className="h-4 w-4" />
            <span className="font-medium">{isLoading ? "..." : `${balance.toFixed(4)} SOL`}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Wallet Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Wallet Address</Label>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-muted rounded flex-1 text-sm overflow-hidden text-ellipsis">
                  {address}
                </div>
                <Button variant="outline" size="icon" onClick={handleCopyAddress}>
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center justify-between">
                <Label>Balance</Label>
                <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => fetchBalance()}>
                  <RefreshCw className="h-3 w-3 mr-2" />
                  Refresh
                </Button>
              </div>
              <div className="p-2 bg-muted rounded">
                {isLoading ? "Loading..." : `${balance.toFixed(8)} SOL`}
              </div>
            </div>
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Transfer SOL</h4>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="recipient">Recipient Address</Label>
                  <Input
                    id="recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Enter Solana address"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="amount">Amount (SOL)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.000001"
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={handleTransfer}
                  disabled={isTransferring || !recipient || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance}
                >
                  {isTransferring ? "Processing..." : "Transfer"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
