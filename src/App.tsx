
import { Buffer } from 'buffer';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AnimatePresence } from "framer-motion";
import { CrossmintProvider, CrossmintAuthProvider } from "@crossmint/client-sdk-react-ui";
import { WalletProvider } from "@/context/WalletContext";
import { ProtectedRoute } from "@/components/ui/ProtectedRoute";

// Import all page components
import Home from "./pages/Index";
import Gallery from "./pages/Gallery";
import CreateAgent from "./pages/CreateAgent";
import Collection from "./pages/Collection";
import AgentMarketplace from "./pages/AgentMarketplace";
import TreasureVault from "./pages/TreasureVault";
import RightsManagement from "./pages/RightsManagement";
import Bridge from "./pages/Bridge";
import Analytics from "./pages/Analytics";
import MarketplaceLaunch from "./pages/MarketplaceLaunch";
import Observability from "./pages/Observability";
import ThreadOfLife from "./pages/ThreadOfLife";
import Distribution from "./pages/distribution/Distribution";
import WzrdStudio from "./pages/wzrd/WzrdStudio";
import WzrdLibrary from "./pages/wzrd/WzrdLibrary";
import WzrdResearch from "./pages/wzrd/WzrdResearch";
import WzrdPodcasts from "./pages/wzrd/WzrdPodcasts";
import WzrdInfiniteLibrary from "./pages/wzrd/WzrdInfiniteLibrary";
import WzrdCompanions from "./pages/wzrd/WzrdCompanions";

window.Buffer = Buffer;

const queryClient = new QueryClient();

// Get Crossmint API key or use a default placeholder if not available
// This prevents the app from crashing when the key is not set
const getCrossmintApiKey = () => {
  const key = import.meta.env.VITE_CROSSMINT_CLIENT_KEY || "";
  // Return a placeholder key if empty to prevent SDK errors
  // The placeholder follows the expected format (starts with "ck_") but won't work for actual auth
  return key || "ck_placeholder_key_for_development";
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CrossmintProvider apiKey={getCrossmintApiKey()}>
        <CrossmintAuthProvider loginMethods={["email", "farcaster"]}>
          <WalletProvider>
            <BrowserRouter>
              <TooltipProvider>
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Index />} />

                    {/* Dashboard and protected routes */}
                    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
                    <Route path="/create-agent" element={<ProtectedRoute><CreateAgent /></ProtectedRoute>} />
                    <Route path="/collection" element={<ProtectedRoute><Collection /></ProtectedRoute>} />
                    <Route path="/agent-marketplace" element={<ProtectedRoute><AgentMarketplace /></ProtectedRoute>} />
                    <Route path="/treasury" element={<ProtectedRoute><TreasureVault /></ProtectedRoute>} />
                    <Route path="/rights" element={<ProtectedRoute><RightsManagement /></ProtectedRoute>} />
                    <Route path="/bridge" element={<ProtectedRoute><Bridge /></ProtectedRoute>} />
                    <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                    <Route path="/marketplace-launch" element={<ProtectedRoute><MarketplaceLaunch /></ProtectedRoute>} />
                    <Route path="/observability" element={<ProtectedRoute><Observability /></ProtectedRoute>} />
                    <Route path="/thread-of-life" element={<ProtectedRoute><ThreadOfLife /></ProtectedRoute>} />
                    <Route path="/distribution/*" element={<ProtectedRoute><Distribution /></ProtectedRoute>} />
                    
                    {/* WZRD routes */}
                    <Route path="/wzrd/studio" element={<WzrdStudio />} />
                    <Route path="/wzrd/library" element={<ProtectedRoute><WzrdLibrary /></ProtectedRoute>} />
                    <Route path="/wzrd/research" element={<ProtectedRoute><WzrdResearch /></ProtectedRoute>} />
                    <Route path="/wzrd/podcasts" element={<ProtectedRoute><WzrdPodcasts /></ProtectedRoute>} />
                    <Route path="/wzrd/infinite-library" element={<ProtectedRoute><WzrdInfiniteLibrary /></ProtectedRoute>} />
                    <Route path="/wzrd/companions" element={<ProtectedRoute><WzrdCompanions /></ProtectedRoute>} />
                    
                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AnimatePresence>
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </BrowserRouter>
          </WalletProvider>
        </CrossmintAuthProvider>
      </CrossmintProvider>
    </QueryClientProvider>
  );
}

export default App;
