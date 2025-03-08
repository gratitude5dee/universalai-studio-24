
import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import SpellbookCreator from "@/components/spellcraft/SpellbookCreator";

const SpellcraftContracts = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Spellcraft Contracts</h1>
          <p className="text-muted-foreground mt-2">
            Craft magical contracts that bring your digital creations to life.
          </p>
        </div>
        
        <SpellbookCreator />
      </div>
    </DashboardLayout>
  );
};

export default SpellcraftContracts;
