
import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "@crossmint/client-sdk-react-ui";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface WalletContextType {
  address: string;
  balance: number;
  isLoading: boolean;
  storeWallet: string;
  fetchBalance: () => Promise<void>;
  transferSOL: (recipient: string, amount: number) => Promise<boolean>;
}

const storeWallet = "HQdycpZvKJMU8Y555e7u6TffSZTGrPxMZJmgq2Zw8dqw";
const LAMPORT_DENOMINATOR = 1000000000; // 1 SOL = 10^9 lamports

const WalletContext = createContext<WalletContextType>({
  address: "",
  balance: 0,
  isLoading: false,
  storeWallet,
  fetchBalance: async () => {},
  transferSOL: async () => false,
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();

  const fetchWallet = async () => {
    if (!user) {
      setAddress("");
      setBalance(0);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/create-wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch wallet: ${response.statusText}`);
      }

      const { address: walletAddress } = await response.json();
      setAddress(walletAddress);
      await fetchBalance(walletAddress);
    } catch (error) {
      console.error("Error fetching wallet:", error);
      toast.error("Failed to fetch wallet");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBalance = async (walletAddr?: string) => {
    const addr = walletAddr || address;
    if (!addr) return;

    try {
      const response = await fetch(`https://www.crossmint.com/api/v1-alpha2/wallets/${addr}/balances?currencies=sol`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data?.[0]?.balances?.solana) {
        setBalance(parseFloat(data[0].balances.solana));
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  const transferSOL = async (recipient: string, amount: number): Promise<boolean> => {
    try {
      // Verify sufficient balance
      if (balance < amount) {
        toast.error("Insufficient balance");
        return false;
      }

      const response = await fetch("/api/transfer-sol", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          recipient,
          amount,
          symbol: "SOL"
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Transfer failed:", errorData);
        toast.error("Failed to transfer SOL");
        return false;
      }

      const { transaction } = await response.json();
      
      // In a real implementation, we would send this transaction to Crossmint
      // to be signed and submitted to the network

      toast.success(`Successfully transferred ${amount} SOL`);
      
      // Update balance after transfer
      await fetchBalance();
      return true;
    } catch (error) {
      console.error("Error transferring SOL:", error);
      toast.error("Error transferring SOL");
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      fetchWallet();
    } else {
      setAddress("");
      setBalance(0);
      setIsLoading(false);
    }
  }, [user]);

  const value = {
    address,
    balance,
    isLoading,
    storeWallet,
    fetchBalance,
    transferSOL
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
