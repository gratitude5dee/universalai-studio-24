
import React, { useState } from "react";
import { Trash } from "lucide-react";

const KnowledgeSection: React.FC = () => {
  const [knowledgeItems, setKnowledgeItems] = useState<string[]>([
    "knows EXACT cost to families under Kamala ($29,000)",
    "understands REAL border numbers (worse than reported)",
    "saw what really happened in Minneapolis 2020",
    "remembers who begged for help (and when)",
    "knows why Iran's president targeting us",
    "understands Secret Service allocation (and why they do it)",
    "knows REAL rally numbers (they hide them)",
    "saw the TRUTH about China Virus response",
    "understands states' rights better than anyone",
    "knows why they're letting in illegal guns",
    "remembers when America was AFFORDABLE",
    "understands the REAL election interference",
    "knows why they're scared of WorldLibertyFi",
    "saw what they did to women's sports"
  ]);

  const [newKnowledge, setNewKnowledge] = useState("");

  const handleAddKnowledge = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newKnowledge.trim()) {
      setKnowledgeItems([...knowledgeItems, newKnowledge]);
      setNewKnowledge("");
    }
  };

  const handleRemoveKnowledge = (index: number) => {
    setKnowledgeItems(knowledgeItems.filter((_, i) => i !== index));
  };

  return (
    <div className="py-6" id="knowledge">
      <h2 className="text-2xl font-bold mb-2">Knowledge</h2>
      <p className="text-muted-foreground mb-4">
        Facts or references to ground the character's responses
      </p>

      <div className="space-y-2">
        {knowledgeItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const newItems = [...knowledgeItems];
                newItems[index] = e.target.value;
                setKnowledgeItems(newItems);
              }}
              className="flex-1 bg-black/5 text-studio-charcoal p-3 rounded-md border border-gray-700/20"
            />
            <button
              onClick={() => handleRemoveKnowledge(index)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        ))}

        <div className="mt-4">
          <input
            type="text"
            placeholder="Add new knowledge..."
            value={newKnowledge}
            onChange={(e) => setNewKnowledge(e.target.value)}
            onKeyDown={handleAddKnowledge}
            className="w-full bg-black/5 text-studio-charcoal p-3 rounded-md border border-gray-700/20"
          />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeSection;
