
import React, { ReactNode } from 'react';
import { StoryConfig, StoryProvider, SupportedChainIds } from '@story-protocol/react-sdk';

interface StoryProtocolProviderProps {
  children: ReactNode;
}

export const StoryProtocolProvider = ({ children }: StoryProtocolProviderProps) => {
  // Setup the configuration for Story Protocol
  const config: StoryConfig = {
    // During development, connect to the Sepolia testnet
    chainId: SupportedChainIds.SEPOLIA, // Use the enum value instead of the numeric ID
    // Configure the RPC URL for Sepolia
    rpcUrl: 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  };

  return (
    <StoryProvider config={config}>
      {children}
    </StoryProvider>
  );
};
