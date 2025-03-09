
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import CreateAgent from "./pages/CreateAgent";
import Collection from "./pages/Collection";
import RightsManagement from "./pages/RightsManagement";
import MarketplaceLaunch from "./pages/MarketplaceLaunch";
import SpellcraftContracts from "./pages/SpellcraftContracts";
import TreasureVault from "./pages/TreasureVault";
import Projects from "./pages/Projects";
import Bridge from "./pages/Bridge";
import Observability from "./pages/Observability";
import AgentMarketplace from "./pages/AgentMarketplace";
import ThreadOfLife from "./pages/ThreadOfLife";
import WzrdStudio from "./pages/wzrd/WzrdStudio";
import WzrdLibrary from "./pages/wzrd/WzrdLibrary";
import WzrdResearch from "./pages/wzrd/WzrdResearch";
import WzrdPodcasts from "./pages/wzrd/WzrdPodcasts";
import WzrdInfiniteLibrary from "./pages/wzrd/WzrdInfiniteLibrary";
import WzrdCompanions from "./pages/wzrd/WzrdCompanions";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/create-agent" element={<CreateAgent />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/rights" element={<RightsManagement />} />
        <Route path="/marketplace-launch" element={<MarketplaceLaunch />} />
        <Route path="/spellcraft" element={<SpellcraftContracts />} />
        <Route path="/treasury" element={<TreasureVault />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/bridge" element={<Bridge />} />
        <Route path="/observability" element={<Observability />} />
        <Route path="/agent-marketplace" element={<AgentMarketplace />} />
        <Route path="/thread-of-life" element={<ThreadOfLife />} />
        <Route path="/wzrd/studio" element={<WzrdStudio />} />
        <Route path="/wzrd/library" element={<WzrdLibrary />} />
        <Route path="/wzrd/research" element={<WzrdResearch />} />
        <Route path="/wzrd/podcasts" element={<WzrdPodcasts />} />
        <Route path="/wzrd/infinite-library" element={<WzrdInfiniteLibrary />} />
        <Route path="/wzrd/companions" element={<WzrdCompanions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
