
import { 
  SellConfigResponse, 
  SellOptionsResponse,
  countryNames
} from './coinbaseApiTypes';

/**
 * Fetch available countries and cashout methods for offramp
 */
export async function fetchSellConfig(): Promise<SellConfigResponse> {
  try {
    // In a real implementation, you would make an API call to Coinbase
    // For this demo, we'll return mock data that mimics the Coinbase response
    return {
      countries: [
        {
          code: "US",
          name: "United States",
          cashout_methods: [
            { id: "ACH_BANK_ACCOUNT", name: "Bank Transfer (ACH)", description: "US only, 1-3 business days" },
            { id: "PAYPAL", name: "PayPal", description: "Available in select countries" },
            { id: "FIAT_WALLET", name: "Coinbase Fiat Wallet", description: "Instant transfer to your Coinbase account" },
          ],
          supported_states: [
            "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
            "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
            "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
            "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
            "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
            "DC"
          ],
        },
        {
          code: "GB",
          name: "United Kingdom",
          cashout_methods: [
            { id: "SEPA_BANK_ACCOUNT", name: "SEPA Bank Transfer", description: "1-3 business days" },
            { id: "PAYPAL", name: "PayPal", description: "Available in select countries" },
            { id: "FIAT_WALLET", name: "Coinbase Fiat Wallet", description: "Instant transfer to your Coinbase account" },
          ],
        },
        // Add other countries as needed
      ],
    };
  } catch (error) {
    console.error("Error fetching sell config:", error);
    throw error;
  }
}

/**
 * Fetch available options for selling crypto based on country and subdivision
 */
export async function fetchSellOptions(country: string, subdivision?: string): Promise<SellOptionsResponse> {
  try {
    // In a real implementation, you would make an API call to Coinbase
    // For this demo, we'll return mock data that mimics the Coinbase response
    return {
      cashout_currencies: [
        {
          code: "USD",
          name: "US Dollar",
          cashout_methods: [
            {
              id: "ACH_BANK_ACCOUNT",
              name: "Bank Transfer (ACH)",
              limits: { USD: { min: "10", max: "25000" } },
            },
            {
              id: "PAYPAL",
              name: "PayPal",
              limits: { USD: { min: "10", max: "5000" } },
            },
            {
              id: "FIAT_WALLET",
              name: "Coinbase Fiat Wallet",
              limits: { USD: { min: "1", max: "50000" } },
            },
          ],
        },
        {
          code: "EUR",
          name: "Euro",
          cashout_methods: [
            {
              id: "SEPA_BANK_ACCOUNT",
              name: "SEPA Bank Transfer",
              limits: { EUR: { min: "10", max: "25000" } },
            },
            {
              id: "PAYPAL",
              name: "PayPal",
              limits: { EUR: { min: "10", max: "5000" } },
            },
            {
              id: "FIAT_WALLET",
              name: "Coinbase Fiat Wallet",
              limits: { EUR: { min: "1", max: "50000" } },
            },
          ],
        },
        // Add other currencies as needed
      ],
      sell_currencies: [
        {
          code: "BTC",
          name: "Bitcoin",
          networks: [{ id: "bitcoin", name: "Bitcoin" }],
        },
        {
          code: "ETH",
          name: "Ethereum",
          networks: [
            { id: "ethereum", name: "Ethereum" },
            { id: "base", name: "Base" },
            { id: "optimism", name: "Optimism" },
            { id: "arbitrum", name: "Arbitrum" },
          ],
        },
        {
          code: "USDC",
          name: "USD Coin",
          networks: [
            { id: "ethereum", name: "Ethereum" },
            { id: "base", name: "Base" },
            { id: "optimism", name: "Optimism" },
            { id: "polygon", name: "Polygon" },
            { id: "arbitrum", name: "Arbitrum" },
            { id: "solana", name: "Solana" },
            { id: "avalanche-c-chain", name: "Avalanche" },
          ],
        },
        {
          code: "SOL",
          name: "Solana",
          networks: [{ id: "solana", name: "Solana" }],
        },
        {
          code: "MATIC",
          name: "Polygon",
          networks: [
            { id: "ethereum", name: "Ethereum" },
            { id: "polygon", name: "Polygon" },
          ],
        },
        // Add other assets as needed
      ],
    };
  } catch (error) {
    console.error("Error fetching sell options:", error);
    throw error;
  }
}
