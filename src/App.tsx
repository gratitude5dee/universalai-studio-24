
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Analytics from "./pages/Analytics";
import CreateAgent from "./pages/CreateAgent";
import Collection from "./pages/Collection";
import RightsManagement from "./pages/RightsManagement";
import MarketplaceLaunch from "./pages/MarketplaceLaunch";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/create-agent" element={<CreateAgent />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/rights" element={<RightsManagement />} />
          <Route path="/marketplace-launch" element={<MarketplaceLaunch />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
