
import React, { useState } from "react";
import { CircleDollarSign, Settings, SquareStack } from "lucide-react";
import { motion } from "framer-motion";
import { FundButton } from "@/components/fund/FundButton";
import { FundCard } from "@/components/fund/FundCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Fund = () => {
  const [buttonOpenIn, setButtonOpenIn] = useState<"popup" | "tab">("popup");
  const [buttonHideIcon, setButtonHideIcon] = useState(false);
  const [buttonHideText, setButtonHideText] = useState(false);
  const [buttonText, setButtonText] = useState("Fund Project");
  const [buttonAmount, setButtonAmount] = useState(20);
  
  const [cardAsset, setCardAsset] = useState("ETH");
  const [cardHeaderText, setCardHeaderText] = useState("Purchase Ethereum");
  const [cardButtonText, setCardButtonText] = useState("Purchase");
  const [cardPresetAmounts, setCardPresetAmounts] = useState<string[]>(["10", "20", "50"]);

  return (
    <div className="space-y-8">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-studio-sand/20 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-yellow-50 p-3 rounded-xl">
            <CircleDollarSign className="h-6 w-6 text-yellow-600" />
          </div>
          <h2 className="text-xl font-bold text-studio-charcoal">Coinbase Fund</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Enable users to fund your project with cryptocurrency using pre-built components. The Fund Button and Fund Card provide simple, elegant solutions for crypto funding.
        </p>
        
        <Tabs defaultValue="button" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="button">Fund Button</TabsTrigger>
            <TabsTrigger value="card">Fund Card</TabsTrigger>
          </TabsList>
          
          <TabsContent value="button" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Configuration
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount (USD)
                    </label>
                    <input
                      type="number"
                      value={buttonAmount}
                      onChange={(e) => setButtonAmount(parseInt(e.target.value))}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="hideIcon"
                      checked={buttonHideIcon}
                      onChange={() => setButtonHideIcon(!buttonHideIcon)}
                    />
                    <label htmlFor="hideIcon" className="text-sm text-gray-700">
                      Hide Icon
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="hideText"
                      checked={buttonHideText}
                      onChange={() => setButtonHideText(!buttonHideText)}
                    />
                    <label htmlFor="hideText" className="text-sm text-gray-700">
                      Hide Text
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Open In
                    </label>
                    <select
                      value={buttonOpenIn}
                      onChange={(e) => setButtonOpenIn(e.target.value as "popup" | "tab")}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="popup">Popup</option>
                      <option value="tab">New Tab</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <SquareStack className="h-4 w-4" />
                  Preview
                </h3>
                
                <div className="flex items-center justify-center h-[200px] bg-gray-50 rounded-lg border border-gray-200">
                  <FundButton
                    customText={buttonText}
                    hideIcon={buttonHideIcon}
                    hideText={buttonHideText}
                    openIn={buttonOpenIn}
                    presetAmount={buttonAmount}
                  />
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
                  <p>
                    <strong>How it works:</strong> The Fund Button opens a popup or new tab with the Coinbase onramp flow, pre-filled with your wallet address and configured settings.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-semibold mb-3">Implementation</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`import { FundButton } from "@coinbase/onchainkit/fund";

// Basic usage
<FundButton />

// With customization
<FundButton
  text="${buttonText}"
  hideIcon={${buttonHideIcon}}
  hideText={${buttonHideText}}
  openIn="${buttonOpenIn}"
/>`}
              </pre>
            </div>
          </TabsContent>
          
          <TabsContent value="card" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Configuration
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Asset
                    </label>
                    <select
                      value={cardAsset}
                      onChange={(e) => setCardAsset(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="ETH">ETH</option>
                      <option value="USDC">USDC</option>
                      <option value="BTC">BTC</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Header Text
                    </label>
                    <input
                      type="text"
                      value={cardHeaderText}
                      onChange={(e) => setCardHeaderText(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={cardButtonText}
                      onChange={(e) => setCardButtonText(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preset Amounts (comma separated)
                    </label>
                    <input
                      type="text"
                      value={cardPresetAmounts.join(", ")}
                      onChange={(e) => {
                        const amounts = e.target.value.split(",").map(a => a.trim());
                        setCardPresetAmounts(amounts);
                      }}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <SquareStack className="h-4 w-4" />
                  Preview
                </h3>
                
                <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-lg border border-gray-200 overflow-auto">
                  <FundCard
                    assetSymbol={cardAsset}
                    headerText={cardHeaderText}
                    buttonText={cardButtonText}
                    presetAmountInputs={cardPresetAmounts}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-semibold mb-3">Implementation</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`import { FundCard } from "@coinbase/onchainkit/fund";

// Basic usage
<FundCard 
  assetSymbol="${cardAsset}"
  country="US"
  currency="USD"
  headerText="${cardHeaderText}"
  buttonText="${cardButtonText}"
  presetAmountInputs={["${cardPresetAmounts.join('", "')}"]}
/>`}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Fund;
