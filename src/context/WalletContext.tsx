import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@crossmint/client-sdk-react-ui';

interface WalletContextType {
  address: string;
  balance: number;
  isLoading: boolean;
  fetchBalance: () => Promise<void>;
}

const defaultContext: WalletContextType = {
  address: '',
  balance: 0,
  isLoading: false,
  fetchBalance: async () => {},
};

const WalletContext = createContext<WalletContextType>(defaultContext);

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();
  
  const fetchWallet = async () => {
    if (!user) return;
    
    try {
      const response = await fetch('/api/create-wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch wallet');
      }
      
      const { address: walletAddress } = await response.json();
      setAddress(walletAddress);
      
    } catch (error) {
      console.error('Error fetching wallet:', error);
    }
  };
  
  const fetchBalance = async () => {
    if (!address) return;
    
    setIsLoading(true);
    try {
      // For demonstration purposes - in a real app you would fetch from an endpoint
      // This is a placeholder and would need to be replaced with actual balance fetching logic
      // For Crossmint, you would typically fetch this from their API
      setBalance(0.5); // Example balance
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (user) {
      fetchWallet();
    }
  }, [user]);
  
  useEffect(() => {
    if (address) {
      fetchBalance();
    }
  }, [address]);
  
  return (
    <WalletContext.Provider value={{ address, balance, isLoading, fetchBalance }}>
      {children}
    </WalletContext.Provider>
  );
};
