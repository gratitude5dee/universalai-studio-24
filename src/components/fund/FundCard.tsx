
"use client";

import React, { useState, useEffect } from "react";
import { FundCard as CoinbaseFundCard } from "@coinbase/onchainkit/fund";
import { useAccount } from "wagmi";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FundCardProps {
  assetSymbol?: string;
  country?: string;
  currency?: string;
  headerText?: string;
  buttonText?: string;
  presetAmountInputs?: string[];
  className?: string;
}

export function FundCard({
  assetSymbol = "ETH",
  country = "US",
  currency = "USD",
  headerText = "Fund Your Wallet",
  buttonText = "Purchase",
  presetAmountInputs = ["10", "20", "50"],
  className = "",
}: FundCardProps) {
  const { address, isConnected } = useAccount();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // When component mounts, check if wallet is connected
    setIsReady(true);

    // Set up event listener for successful funding
    // This is a simulated approach - in practice, you'd need a webhook or polling
    const timer = setTimeout(() => {
      // Simulate successful transaction after 5 seconds (for demo purposes)
      // In production, you'd use Coinbase's webhook notifications
      recordTransaction();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const recordTransaction = async () => {
    if (!address) return;
    
    try {
      // This is just for demo purposes to show how to record a transaction
      // In a real application, you'd get this data from Coinbase's webhook
      const demoAmount = presetAmountInputs[1] || "20";
      const transactionId = `tx_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      
      const { error } = await supabase
        .from("fund_transactions")
        .insert({
          user_id: address, // Using address as user ID for now
          amount: parseFloat(demoAmount),
          asset_symbol: assetSymbol,
          transaction_id: transactionId,
          status: "completed",
          payment_method: "fundcard",
        });
        
      if (error) {
        console.error("Error recording transaction:", error);
      } else {
        console.log("Transaction recorded successfully");
      }
    } catch (error) {
      console.error("Error recording transaction:", error);
    }
  };

  if (!isReady) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50 text-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="p-4 border rounded-lg bg-yellow-50 text-yellow-700 text-center">
        Please connect your wallet to use the Fund Card
      </div>
    );
  }

  return (
    <div className={className}>
      <CoinbaseFundCard
        assetSymbol={assetSymbol}
        country={country}
        currency={currency}
        headerText={headerText}
        buttonText={buttonText}
        presetAmountInputs={presetAmountInputs as any}
      />
    </div>
  );
}

export default FundCard;
