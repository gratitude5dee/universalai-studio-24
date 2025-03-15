
import { OnrampConfigCountry } from '@coinbase/onchainkit';
import { supabase } from "@/integrations/supabase/client";

// Base URLs for Coinbase services
const ONRAMP_BASE_URL = "https://pay.coinbase.com/buy/select-asset";
const OFFRAMP_BASE_URL = "https://pay.coinbase.com/v3/sell/input";

// Coinbase Developer Platform Project ID
// This should be replaced with an environment variable in production
const CDP_PROJECT_ID = 'a353ad87-5af2-4bc7-af5b-884e6aabf088';

interface OnrampParams {
  asset: string;
  amount: string;
  network: string;
  paymentMethod: string;
  paymentCurrency?: string;
  address: string;
  redirectUrl: string;
  enableGuestCheckout?: boolean;
}

interface OfframpParams {
  asset: string;
  amount: string;
  network: string;
  cashoutMethod: string;
  address: string;
  redirectUrl: string;
}

/**
 * Generates a Coinbase Onramp URL with the provided parameters
 */
export function generateOnrampURL(params: OnrampParams): string {
  const {
    asset,
    amount,
    network,
    paymentMethod,
    paymentCurrency,
    address,
    redirectUrl,
    enableGuestCheckout,
  } = params;

  // Parse amount to a number for presetFiatAmount
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    throw new Error("Invalid amount provided");
  }

  // Build query parameters
  const queryParams = new URLSearchParams();

  // Required parameters
  queryParams.append("appId", CDP_PROJECT_ID);

  // Format addresses as a JSON string: {"address":["network"]}
  const addressesObj: Record<string, string[]> = {};
  addressesObj[address || "0x0000000000000000000000000000000000000000"] = [network];
  queryParams.append("addresses", JSON.stringify(addressesObj));

  // Optional parameters
  if (asset) {
    queryParams.append("assets", JSON.stringify([asset]));
    queryParams.append("defaultAsset", asset);
  }

  if (network) queryParams.append("defaultNetwork", network);

  // Format payment method properly
  if (paymentMethod) {
    // Convert to uppercase for consistency with API expectations
    const formattedPaymentMethod = paymentMethod.toUpperCase();
    queryParams.append("defaultPaymentMethod", formattedPaymentMethod);
  }

  // Add fiat amount and currency
  if (numericAmount > 0) {
    queryParams.append("presetFiatAmount", numericAmount.toString());
  }

  if (paymentCurrency) {
    queryParams.append("fiatCurrency", paymentCurrency);
  }

  // Add partner user ID (limited to 49 chars)
  queryParams.append("partnerUserId", address.substring(0, 49));

  // Add redirect URL
  if (redirectUrl) {
    queryParams.append("redirectUrl", redirectUrl);
  }

  // Add guest checkout parameter if provided
  if (enableGuestCheckout !== undefined) {
    queryParams.append("enableGuestCheckout", enableGuestCheckout.toString());
  }

  // Return the complete URL
  return `${ONRAMP_BASE_URL}?${queryParams.toString()}`;
}

/**
 * Generates a Coinbase Offramp URL with the provided parameters
 */
export function generateOfframpURL(params: OfframpParams): string {
  try {
    const { asset, amount, network, cashoutMethod, address, redirectUrl } = params;

    // Create query parameters
    const queryParams = new URLSearchParams();

    // Add required parameters
    queryParams.append("appId", CDP_PROJECT_ID);

    // Add partner user ID (must be unique and less than 50 chars)
    const userId = address ? address.substring(0, 49) : "anonymous-" + Date.now();
    queryParams.append("partnerUserId", userId);

    // Add addresses parameter - this is the most critical part
    // Format: {"address":["network1","network2"]}
    const addressesObj: Record<string, string[]> = {};
    const validAddress = address || "0x4315d134aCd3221a02dD380ADE3aF39Ce219037c";
    addressesObj[validAddress] = [network || "ethereum"];
    queryParams.append("addresses", JSON.stringify(addressesObj));

    // Add assets parameter
    queryParams.append("assets", JSON.stringify([asset]));

    // Add optional parameters if provided
    if (asset) queryParams.append("defaultAsset", asset);
    if (network) queryParams.append("defaultNetwork", network);
    if (cashoutMethod) queryParams.append("defaultCashoutMethod", cashoutMethod);

    // Add amount parameter to pre-fill the amount field
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      queryParams.append("presetFiatAmount", numericAmount.toString());
    }

    // Add redirect URL
    queryParams.append("redirectUrl", redirectUrl || window.location.origin + "/offramp");

    // Return the complete URL
    return `${OFFRAMP_BASE_URL}?${queryParams.toString()}`;
  } catch (error) {
    console.error("Error generating offramp URL:", error);
    throw error;
  }
}

/**
 * Records a new transaction in the database
 */
export async function recordTransaction(
  userId: string,
  transactionId: string,
  assetSymbol: string,
  network: string,
  amount: number,
  paymentMethod: string,
  transactionType: "onramp" | "offramp",
  transactionData?: any
) {
  try {
    const { data, error } = await supabase
      .from('crypto_transactions')
      .insert({
        user_id: userId,
        transaction_id: transactionId,
        asset_symbol: assetSymbol,
        network: network,
        amount: amount,
        payment_method: paymentMethod,
        status: 'pending',
        transaction_data: transactionData || {},
      });

    if (error) {
      console.error(`Error recording ${transactionType} transaction:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error in recordTransaction for ${transactionType}:`, error);
    throw error;
  }
}

/**
 * Updates a transaction status in the database
 */
export async function updateTransactionStatus(
  transactionId: string,
  status: "pending" | "completed" | "failed",
  transactionData?: any
) {
  try {
    const updateData: any = { status };
    
    if (transactionData) {
      updateData.transaction_data = transactionData;
    }
    
    const { data, error } = await supabase
      .from('crypto_transactions')
      .update(updateData)
      .eq('transaction_id', transactionId);

    if (error) {
      console.error("Error updating transaction status:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in updateTransactionStatus:", error);
    throw error;
  }
}

/**
 * Gets transaction history for a user
 */
export async function getTransactionHistory(userId: string) {
  try {
    const { data, error } = await supabase
      .from('crypto_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching transaction history:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error in getTransactionHistory:", error);
    return [];
  }
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format crypto amount for display with appropriate decimal places
 */
export function formatCryptoAmount(amount: number, symbol: string) {
  // Different crypto assets have different common decimal place displays
  const decimalPlaces = {
    'BTC': 8,
    'ETH': 6,
    'USDC': 2,
    'USDT': 2,
    'MATIC': 4,
    'SOL': 4,
    'AVAX': 4,
    'LINK': 4,
    'UNI': 4,
    'DOGE': 2,
    'SHIB': 0,  // Often displayed as whole numbers
  };

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: (symbol in decimalPlaces) ? decimalPlaces[symbol as keyof typeof decimalPlaces] : 6,
  }).format(amount);
}

/**
 * Format date for display
 */
export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get color class based on transaction status
 */
export function getStatusColor(status: string) {
  switch(status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
