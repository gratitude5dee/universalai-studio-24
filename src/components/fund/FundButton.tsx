
"use client";

import React, { useState, useEffect } from "react";
import { FundButton as CoinbaseFundButton, getOnrampBuyUrl } from "@coinbase/onchainkit/fund";
import { useAccount } from "wagmi";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FundButtonProps {
  customText?: string;
  hideIcon?: boolean;
  hideText?: boolean;
  openIn?: "popup" | "tab";
  presetAmount?: number;
  className?: string;
}

export function FundButton({
  customText,
  hideIcon = false,
  hideText = false,
  openIn = "popup",
  presetAmount = 20,
  className = "",
}: FundButtonProps) {
  const { address, isConnected } = useAccount();
  const [cdpProjectId, setCdpProjectId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // For demo purposes, use a placeholder CDP Project ID
    // In production, you would fetch this from your environment variables or API
    setCdpProjectId(process.env.NEXT_PUBLIC_CDP_PROJECT_ID || "a353ad87-5af2-4bc7-af5b-884e6aabf088");
    setIsLoading(false);
  }, []);

  const getFundingUrl = () => {
    if (!address || !cdpProjectId) {
      console.log("Cannot generate funding URL:", {
        address: !!address,
        cdpProjectId: !!cdpProjectId,
      });
      return undefined;
    }

    try {
      console.log("Generating funding URL with CDP Project ID");
      
      // Generate a dynamic onramp URL for this specific user
      const url = getOnrampBuyUrl({
        projectId: cdpProjectId,
        addresses: { [address]: ["base"] },
        assets: ["ETH", "USDC"],
        presetFiatAmount: presetAmount,
        fiatCurrency: "USD",
      });

      // Record transaction intent in Supabase
      recordTransactionIntent(presetAmount, "ETH");
      
      console.log("Generated funding URL successfully");
      return url;
    } catch (err) {
      console.error("Error generating funding URL:", err);
      toast.error("Failed to generate funding URL");
      return undefined;
    }
  };

  const recordTransactionIntent = async (amount: number, asset: string) => {
    if (!address) return;
    
    try {
      const transactionId = `intent_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      
      const { error } = await supabase
        .from("fund_transactions")
        .insert({
          user_id: address, // Using address as user ID for now
          amount,
          asset_symbol: asset,
          transaction_id: transactionId,
          status: "initiated",
          payment_method: "onramp",
        });
        
      if (error) {
        console.error("Error recording transaction intent:", error);
      }
    } catch (error) {
      console.error("Error recording transaction:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50 text-center">
        <p className="text-gray-500">Loading configuration...</p>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="p-4 border rounded-lg bg-yellow-50 text-yellow-700 text-center">
        Please connect your wallet to use the Fund Button
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-lg ${className}`}>
      <CoinbaseFundButton 
        text={customText}
        hideIcon={hideIcon}
        hideText={hideText}
        openIn={openIn}
        fundingUrl={getFundingUrl()}
      />
    </div>
  );
}

export default FundButton;
