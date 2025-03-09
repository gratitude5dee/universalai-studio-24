
import { useState } from "react";
import { useIpAsset } from "@story-protocol/react-sdk";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Shield, ArrowRight } from "lucide-react";
import { Address } from "viem";

export const IPRegistrationForm = () => {
  const { register, loading: registeringIp } = useIpAsset();
  const [tokenId, setTokenId] = useState<string>("");
  const [nftContract, setNftContract] = useState<string>("0x73fcb515cee99e4991465ef586cfe2b072ebb512");
  const [txHash, setTxHash] = useState<string>("");
  const [ipId, setIpId] = useState<string>("");

  const handleRegisterIp = async () => {
    if (!tokenId || !nftContract) {
      toast.error("Please enter both contract address and token ID");
      return;
    }
    
    try {
      const response = await register({
        nftContract: nftContract as Address,
        tokenId: tokenId,
      });
      
      if (response?.txHash) {
        toast.success("IP Registered Successfully");
        setTxHash(response.txHash);
        if (response.ipId) {
          setIpId(response.ipId);
        }
      }
    } catch (error: any) {
      console.error("Error during IP registration:", error.message);
      toast.error("Failed to register IP: " + (error.message || "Unknown error"));
    }
  };

  return (
    <div className="glass-card p-6 mb-6">
      <h2 className="text-xl font-medium flex items-center gap-2 mb-4">
        <Shield className="text-[#9b87f5]" size={20} />
        Register IP Asset
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nft-contract">NFT Contract Address</Label>
            <Input
              id="nft-contract"
              placeholder="0x..."
              value={nftContract}
              onChange={(e) => setNftContract(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="token-id">Token ID</Label>
            <Input
              id="token-id"
              placeholder="Enter the NFT token ID"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
            />
          </div>
        </div>
        
        <Button 
          onClick={handleRegisterIp} 
          disabled={registeringIp || !tokenId || !nftContract}
          className="bg-[#9b87f5] hover:bg-[#8A78DF]"
        >
          {registeringIp ? "Registering..." : "Register IP Asset"}
        </Button>
        
        {(txHash || ipId) && (
          <div className="mt-4 p-4 bg-[#F1F0FB] rounded-lg space-y-2">
            <h3 className="font-medium">Registration Details</h3>
            {txHash && (
              <div>
                <span className="text-sm font-medium">Transaction Hash:</span>
                <p className="text-sm font-mono break-all">{txHash}</p>
              </div>
            )}
            {ipId && (
              <div>
                <span className="text-sm font-medium">Registered IP ID:</span>
                <p className="text-sm font-mono break-all">{ipId}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
