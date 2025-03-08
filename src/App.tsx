
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
