
// API types for Coinbase services

export interface Country {
  code: string;
  name: string;
  cashout_methods: CashoutMethod[];
  supported_states?: string[];
}

export interface CashoutMethod {
  id: string;
  name: string;
  description?: string;
}

export interface CurrencyLimit {
  min: string;
  max: string;
}

export interface CashoutMethodOption {
  id: string;
  name: string;
  limits: Record<string, CurrencyLimit>;
}

export interface FiatCurrency {
  code: string;
  name: string;
  cashout_methods: CashoutMethodOption[];
}

export interface CryptoNetwork {
  id: string;
  name: string;
}

export interface CryptoAsset {
  code: string;
  name: string;
  networks: CryptoNetwork[];
}

export interface SellConfigResponse {
  countries: Country[];
}

export interface SellOptionsResponse {
  cashout_currencies: FiatCurrency[];
  sell_currencies: CryptoAsset[];
}

// Asset-network compatibility mapping
export const assetNetworkMap: Record<string, string[]> = {
  ETH: ["ethereum", "base", "optimism", "arbitrum", "polygon"],
  USDC: [
    "ethereum",
    "base",
    "optimism",
    "arbitrum",
    "polygon",
    "solana",
    "avalanche-c-chain",
    "unichain",
    "aptos",
    "bnb-chain",
  ],
  BTC: ["bitcoin"],
  SOL: ["solana"],
  MATIC: ["polygon", "ethereum"],
  AVAX: ["avalanche-c-chain"],
  LINK: ["ethereum", "base", "arbitrum"],
  UNI: ["ethereum", "polygon"],
  DOGE: ["dogecoin"],
  SHIB: ["ethereum"],
  XRP: ["ripple"],
  LTC: ["litecoin"],
  BCH: ["bitcoin-cash"],
};

// Common country data
export const countryNames: Record<string, string> = {
  US: "United States",
  GB: "United Kingdom",
  CA: "Canada",
  DE: "Germany",
  FR: "France",
  ES: "Spain",
  IT: "Italy",
  AU: "Australia",
  JP: "Japan",
  NL: "Netherlands",
  CH: "Switzerland",
  SE: "Sweden",
  NO: "Norway",
  DK: "Denmark",
  FI: "Finland",
  IE: "Ireland",
  AT: "Austria",
  BE: "Belgium",
  PT: "Portugal",
  GR: "Greece",
  NZ: "New Zealand",
  SG: "Singapore",
  HK: "Hong Kong",
  AE: "United Arab Emirates",
  BR: "Brazil",
  MX: "Mexico",
};
