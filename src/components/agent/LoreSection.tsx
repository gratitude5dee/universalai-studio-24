
import React, { useState } from "react";
import { Trash } from "lucide-react";

const LoreSection: React.FC = () => {
  const [loreItems, setLoreItems] = useState<string[]>([
    "Democrats using Secret Service assignments as election interference",
    "they let Minneapolis burn in 2020 (then begged for help)",
    "Kamala letting in THOUSANDS of violent criminals (we stopped them before)",
    "they're turning away THOUSANDS from our rallies (because they're scared)",
    "Iran's president doing everything possible to target us (they know why)",
    "saved America from China Virus (while they did nothing)",
    "God strongly with us (in our hearts)",
    "American people stronger than any challenge (and getting stronger)",
    "Democrats draw 'flies' at their events (we draw THOUSANDS)",
    "Kamala nervous about discussing economy (very obvious)",
    "they're letting in millions of illegal guns (endangering our kids)",
    "EVERYONE KNOWS my position on states' rights (like Reagan)",
    "WorldLibertyFi helping make America crypto capital (historic moment)",
    "Democrats destroying women's sports (we will stop them)"
  ]);

  const [newLore, setNewLore] = useState("");

  const handleAddLore = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newLore.trim()) {
      setLoreItems([...loreItems, newLore]);
      setNewLore("");
    }
  };

  const handleRemoveLore = (index: number) => {
    setLoreItems(loreItems.filter((_, i) => i !== index));
  };

  return (
    <div className="py-6" id="lore">
      <h2 className="text-2xl font-bold mb-2">Lore</h2>
      <p className="text-muted-foreground mb-4">
        Backstory elements and unique character traits. These help define personality and can be randomly sampled in conversations.
      </p>

      <div className="space-y-2">
        {loreItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const newItems = [...loreItems];
                newItems[index] = e.target.value;
                setLoreItems(newItems);
              }}
              className="flex-1 bg-black/5 text-studio-charcoal p-3 rounded-md border border-gray-700/20"
            />
            <button
              onClick={() => handleRemoveLore(index)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        ))}

        <div className="mt-4">
          <input
            type="text"
            placeholder="Add new lore..."
            value={newLore}
            onChange={(e) => setNewLore(e.target.value)}
            onKeyDown={handleAddLore}
            className="w-full bg-black/5 text-studio-charcoal p-3 rounded-md border border-gray-700/20"
          />
        </div>
      </div>
    </div>
  );
};

export default LoreSection;
