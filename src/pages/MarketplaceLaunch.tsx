
import { motion } from "framer-motion";
import MarketplaceLaunchComponent from "@/components/marketplace/MarketplaceLaunch";
import { Globe } from "lucide-react";
import DashboardLayout from "@/layouts/dashboard-layout";

const MarketplaceLaunchPage = () => {
  return (
    <DashboardLayout>
      <div className="container py-8 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-studio-accent/20 p-2 rounded-full">
              <Globe className="h-6 w-6 text-studio-accent" />
            </div>
            <h1 className="text-2xl font-bold">Marketplace Launch</h1>
          </div>
          <p className="text-studio-clay max-w-2xl">
            Transform your creation's debut into a celebratory event. Follow the steps to prepare, launch, and celebrate your work's entrance into the marketplace.
          </p>
        </motion.div>

        <MarketplaceLaunchComponent />
      </div>
    </DashboardLayout>
  );
};

export default MarketplaceLaunchPage;
