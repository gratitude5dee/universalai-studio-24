import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { generateOfframpURL } from "@/utils/coinbaseUtils";
import { 
  fetchSellConfig, 
  fetchSellOptions,
} from "@/utils/coinbaseApiService";
import { 
  Country, 
  CryptoAsset, 
  FiatCurrency, 
  CashoutMethodOption,
  assetNetworkMap,
  countryNames,
} from "@/utils/coinbaseApiTypes";
import { useSearchParams } from "next/navigation";
import OfframpNotification from "./OfframpNotification";
import OfframpInstructionsModal from "./OfframpInstructionsModal";

export default function OfframpFeature() {
  const { address, isConnected } = useAccount();
  const [selectedAsset, setSelectedAsset] = useState("USDC");
  const [amount, setAmount] = useState("10");
  const [selectedNetwork, setSelectedNetwork] = useState("base");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedSubdivision, setSelectedSubdivision] = useState("");
  const [availableAssets, setAvailableAssets] = useState<CryptoAsset[]>([]);
  const [availableNetworks, setAvailableNetworks] = useState<{id: string, name: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCashoutCurrency, setSelectedCashoutCurrency] = useState("USD");
  const [selectedCashoutMethod, setSelectedCashoutMethod] = useState("");
  const [cashoutMethods, setCashoutMethods] = useState<CashoutMethodOption[]>([]);
  const [cashoutCurrencies, setCashoutCurrencies] = useState<FiatCurrency[]>([]);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  // Define supported networks
  const networks = [
    { id: "ethereum", name: "Ethereum" },
    { id: "base", name: "Base" },
    { id: "optimism", name: "Optimism" },
    { id: "polygon", name: "Polygon" },
    { id: "arbitrum", name: "Arbitrum" },
    { id: "avalanche-c-chain", name: "Avalanche" },
    { id: "solana", name: "Solana" },
    { id: "bitcoin", name: "Bitcoin" },
    { id: "ripple", name: "XRP Ledger" },
    { id: "dogecoin", name: "Dogecoin" },
    { id: "litecoin", name: "Litecoin" },
    { id: "bitcoin-cash", name: "Bitcoin Cash" },
  ].sort((a, b) => a.name.localeCompare(b.name));

  // US States list
  const US_STATES = [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" },
    { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" },
    { code: "DE", name: "Delaware" },
    { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" },
    { code: "HI", name: "Hawaii" },
    { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" },
    { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" },
    { code: "KY", name: "Kentucky" },
    { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" },
    { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" },
    { code: "MN", name: "Minnesota" },
    { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" },
    { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" },
    { code: "NV", name: "Nevada" },
    { code: "NH", name: "New Hampshire" },
    { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" },
    { code: "NY", name: "New York" },
    { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" },
    { code: "OH", name: "Ohio" },
    { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" },
    { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" },
    { code: "SD", name: "South Dakota" },
    { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" },
    { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" },
    { code: "WA", name: "Washington" },
    { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" },
    { code: "WY", name: "Wyoming" },
    { code: "DC", name: "District of Columbia" },
  ];

  // Check for status in URL
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  // Show notification if returning from Coinbase with a status
  useEffect(() => {
    if (status) {
      setShowNotification(true);
    }
  }, [status]);

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const config = await fetchSellConfig();
        if (config && config.countries) {
          // Set subdivisions for US
          const usCountry = config.countries.find((c) => c.code === "US");
          if (usCountry && usCountry.supported_states) {
            setSelectedSubdivision(usCountry.supported_states[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch assets and networks when country or subdivision changes
  useEffect(() => {
    if (!selectedCountry) return;
    fetchAssets();
  }, [selectedCountry, selectedSubdivision]);

  // Fetch assets and networks from API
  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const options = await fetchSellOptions(
        selectedCountry,
        selectedSubdivision
      );

      // Set available assets from API response
      if (options.sell_currencies && options.sell_currencies.length > 0) {
        setAvailableAssets(options.sell_currencies);

        // Check if USDC is available in the response
        const usdcAsset = options.sell_currencies.find(
          (a) => a.code === "USDC"
        );

        // Only update the selected asset if USDC is not available
        if (!usdcAsset) {
          const initialAsset = options.sell_currencies[0].code;
          setSelectedAsset(initialAsset);

          // Find networks for the selected asset from API response
          const assetNetworksFromApi =
            options.sell_currencies.find((a) => a.code === initialAsset)
              ?.networks || [];

          // Merge API networks with our predefined networks to ensure we have all needed networks
          const mergedNetworks = networks.filter((network) =>
            assetNetworkMap[initialAsset]?.includes(network.id)
          );

          setAvailableNetworks(mergedNetworks);

          // Set initial network that's compatible with the asset
          if (
            assetNetworkMap[initialAsset] &&
            assetNetworkMap[initialAsset].length > 0
          ) {
            setSelectedNetwork(assetNetworkMap[initialAsset][0]);
          } else if (mergedNetworks.length > 0) {
            setSelectedNetwork(mergedNetworks[0].id);
          }
        } else {
          // USDC is available, ensure we have the correct networks for it
          const mergedNetworks = networks.filter((network) =>
            assetNetworkMap["USDC"]?.includes(network.id)
          );

          setAvailableNetworks(mergedNetworks);

          // Keep Base as the selected network if it's compatible with USDC
          if (!assetNetworkMap["USDC"]?.includes("base")) {
            // If Base is not compatible with USDC, select the first compatible network
            setSelectedNetwork(assetNetworkMap["USDC"][0]);
          }
        }
      }

      // Set available cashout methods from API response
      if (options.cashout_currencies && options.cashout_currencies.length > 0) {
        setCashoutCurrencies(options.cashout_currencies);

        // Prefer USD as the cashout currency
        const usdCurrency =
          options.cashout_currencies.find((c) => c.code === "USD") ||
          options.cashout_currencies[0];
        setSelectedCashoutCurrency(usdCurrency.code);

        // Set available cashout methods for the selected currency
        if (
          usdCurrency.cashout_methods &&
          usdCurrency.cashout_methods.length > 0
        ) {
          setCashoutMethods(usdCurrency.cashout_methods);

          // Prefer ACH_BANK_ACCOUNT as the cashout method for USD
          const achMethod = usdCurrency.cashout_methods.find(
            (m) => m.id === "ACH_BANK_ACCOUNT"
          );
          setSelectedCashoutMethod(
            achMethod ? achMethod.id : usdCurrency.cashout_methods[0].id
          );
        }
      }
    } catch (error) {
      console.error("Error fetching sell options:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize network based on selected asset
  useEffect(() => {
    // Ensure the selected network is compatible with the selected asset
    if (assetNetworkMap[selectedAsset]) {
      const compatibleNetworks = assetNetworkMap[selectedAsset];
      if (!compatibleNetworks.includes(selectedNetwork)) {
        setSelectedNetwork(compatibleNetworks[0]); // Set to first compatible network
      }
    }
  }, [selectedAsset, selectedNetwork]);

  // Handle asset change
  const handleAssetChange = (assetCode: string) => {
    setSelectedAsset(assetCode);

    // Update network based on the selected asset
    if (assetNetworkMap[assetCode]) {
      const compatibleNetworks = assetNetworkMap[assetCode];

      // Filter our predefined networks to only include those compatible with the asset
      const filteredNetworks = networks.filter((network) =>
        compatibleNetworks.includes(network.id)
      );

      setAvailableNetworks(filteredNetworks);

      // If current network is not compatible with the new asset, update it
      if (!compatibleNetworks.includes(selectedNetwork)) {
        setSelectedNetwork(compatibleNetworks[0]);
      }
    }
  };

  // Handle offramp
  const handleOfframp = () => {
    // Clear any previous error
    setErrorMessage(null);

    // Validate wallet connection
    if (!isConnected) {
      setErrorMessage("Please connect your wallet first");
      return;
    }

    // Validate amount
    if (!amount || parseFloat(amount) <= 0) {
      setErrorMessage("Please enter a valid amount");
      return;
    }

    // Start loading
    setIsLoading(true);

    try {
      // Generate offramp URL
      const url = generateOfframpURL({
        asset: selectedAsset,
        amount: amount,
        network: selectedNetwork,
        cashoutMethod: selectedCashoutMethod,
        address: address || "0x0000000000000000000000000000000000000000",
        redirectUrl: window.location.origin + "/offramp",
      });

      // Show instructions modal
      setShowInstructionsModal(true);
      setGeneratedUrl(url);
    } catch (error) {
      console.error("Error generating offramp URL:", error);
      setErrorMessage("Failed to generate offramp URL");
    } finally {
      setIsLoading(false);
    }
  };

  // Start offramp process
  const startOfframp = () => {
    if (generatedUrl) {
      window.open(generatedUrl, "_blank");
      setShowInstructionsModal(false);
    }
  };

  // Get the selected asset name for display
  const getSelectedAssetName = () => {
    const asset = availableAssets.find((a) => a.code === selectedAsset);
    return asset ? asset.name : selectedAsset;
  };

  // Get the selected network name for display
  const getSelectedNetworkName = () => {
    const network = availableNetworks.find((n) => n.id === selectedNetwork);
    return network ? network.name : selectedNetwork;
  };

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Configuration Box */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-bold mb-6 text-gray-800">
                Configure Your Offramp
              </h3>

              {/* Connect Wallet Button */}
              {!isConnected && (
                <div className="mb-6">
                  <button
                    onClick={() =>
                      document.getElementById("connect-wallet-button")?.click()
                    }
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg"
                  >
                    Connect Wallet
                  </button>
                </div>
              )}

              {/* Country Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  Country
                </label>
                <div className="relative">
                  <select
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      // Reset subdivision when country changes
                      setSelectedSubdivision("");
                    }}
                    className="block w-full bg-white border border-gray-300 rounded-lg py-3 px-4 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                  >
                    {Object.entries(countryNames).map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* State Selection - Only show for US */}
              {selectedCountry === "US" && (
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">
                    State
                  </label>
                  <div className="relative">
                    <select
                      value={selectedSubdivision}
                      onChange={(e) => setSelectedSubdivision(e.target.value)}
                      className="block w-full bg-white border border-gray-300 rounded-lg py-3 px-4 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                    >
                      {US_STATES.map((state) => (
                        <option key={state.code} value={state.code}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Asset Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  Asset
                </label>
                <div className="relative">
                  <select
                    value={selectedAsset}
                    onChange={(e) => handleAssetChange(e.target.value)}
                    className="block w-full bg-white border border-gray-300 rounded-lg py-3 px-4 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                  >
                    {availableAssets.map((asset) => (
                      <option key={asset.code} value={asset.code}>
                        {asset.name} ({asset.code})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Network Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  Network
                </label>
                <div className="relative">
                  <select
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value)}
                    className="block w-full bg-white border border-gray-300 rounded-lg py-3 px-4 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                  >
                    {/* Filter networks based on selected asset */}
                    {networks
                      .filter(
                        (network) =>
                          !assetNetworkMap[selectedAsset] ||
                          assetNetworkMap[selectedAsset].includes(network.id)
                      )
                      .map((network) => (
                        <option key={network.id} value={network.id}>
                          {network.name}
                        </option>
                      ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                {assetNetworkMap[selectedAsset] && (
                  <p className="text-sm text-gray-500 mt-2">
                    {selectedAsset} is available on{" "}
                    {assetNetworkMap[selectedAsset].length} network
                    {assetNetworkMap[selectedAsset].length > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  Amount
                </label>
                <div className="flex space-x-2 mb-2">
                  <button
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-gray-800"
                    onClick={() => setAmount("10")}
                  >
                    $10
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-gray-800"
                    onClick={() => setAmount("25")}
                  >
                    $25
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-gray-800"
                    onClick={() => setAmount("50")}
                  >
                    $50
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    $
                  </span>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full bg-white border border-gray-300 rounded-lg py-3 pl-8 pr-4 text-gray-800"
                  />
                </div>
              </div>

              {/* Cashout Method */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  Cashout Method
                </label>
                <div className="relative">
                  <select
                    value={selectedCashoutMethod}
                    onChange={(e) => setSelectedCashoutMethod(e.target.value)}
                    className="block w-full bg-white border border-gray-300 rounded-lg py-3 px-4 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                  >
                    {cashoutMethods.map((method) => (
                      <option key={method.id} value={method.id}>
                        {method.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleOfframp}
                disabled={isLoading || !isConnected}
                className={`w-full py-3 px-4 rounded-lg font-medium ${
                  isLoading || !isConnected
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {isLoading ? "Loading..." : "Sell Crypto"}
              </button>

              {/* Error Message */}
              {errorMessage && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* Preview Box */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Preview</h3>

              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">You'll receive</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ${parseFloat(amount || "0").toFixed(2)}
                  </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Selling</p>
                  <p className="font-medium text-gray-800">
                    {getSelectedAssetName()} ({selectedAsset})
                  </p>
                  <p className="text-sm text-gray-500">
                    on {getSelectedNetworkName()}
                  </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Cashout Method</p>
                  <p className="font-medium text-gray-800">
                    {cashoutMethods.find(
                      (m) => m.id === selectedCashoutMethod
                    )?.name || selectedCashoutMethod}
                  </p>
                </div>

                {isConnected && address && (
                  <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1">
                      Connected Wallet
                    </p>
                    <p className="font-medium text-gray-800">
                      {address
                        ? `${address.substring(0, 6)}...${address.substring(
                            address.length - 4
                          )}`
                        : "Not connected"}
                    </p>
                  </div>
                )}

                <button
                  onClick={handleOfframp}
                  disabled={isLoading || !isConnected}
                  className={`w-full py-3 px-4 rounded-lg font-medium mt-6 ${
                    isLoading || !isConnected
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  {isLoading ? "Loading..." : "Sell Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions Modal */}
      {showInstructionsModal && (
        <OfframpInstructionsModal
          onClose={() => setShowInstructionsModal(false)}
          asset={selectedAsset}
          network={getSelectedNetworkName()}
        />
      )}

      {/* Notification */}
      {showNotification && (
        <OfframpNotification
          onClose={() => setShowNotification(false)}
          status={status || "default"}
        />
      )}
    </div>
  );
}
