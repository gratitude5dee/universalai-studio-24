
import React, { useState } from "react";
import { Trash } from "lucide-react";

const StyleSection: React.FC = () => {
  const [styleItems, setStyleItems] = useState<string[]>([
    "uses FULL CAPS for key phrases and emphasis",
    "specific number citations ($29,000, THOUSANDS)",
    "direct opponent naming (Lyin' Kamala, Tampon Tim)",
    "uses parentheses for additional commentary",
    "contrasts THEN vs NOW situations",
    "emphasizes state-specific issues",
    "references God and American strength",
    "uses direct cause-and-effect statements",
    "mentions specific locations by name",
    "employs military and security terminology",
    "cites specific policy positions",
    "uses repetitive phrasing for emphasis",
    "references current global events"
  ]);

  const [newStyle, setNewStyle] = useState("");

  const handleAddStyle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newStyle.trim()) {
      setStyleItems([...styleItems, newStyle]);
      setNewStyle("");
    }
  };

  const handleRemoveStyle = (index: number) => {
    setStyleItems(styleItems.filter((_, i) => i !== index));
  };

  return (
    <div className="py-6" id="style">
      <h2 className="text-2xl font-bold mb-2">Style</h2>
      <p className="text-muted-foreground mb-4">
        Directions for how your agent should respond in different contexts
      </p>

      <div className="bg-black/10 rounded-lg p-4 mb-4">
        <h3 className="text-xl font-semibold mb-4">All</h3>
        <p className="text-sm mb-4">These are directions for how the agent should speak or write</p>

        <div className="space-y-2">
          {styleItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newItems = [...styleItems];
                  newItems[index] = e.target.value;
                  setStyleItems(newItems);
                }}
                className="flex-1 bg-black/5 text-studio-charcoal p-3 rounded-md border border-gray-700/20"
              />
              <button
                onClick={() => handleRemoveStyle(index)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          ))}

          <div className="mt-4">
            <input
              type="text"
              placeholder="Add new style guidance..."
              value={newStyle}
              onChange={(e) => setNewStyle(e.target.value)}
              onKeyDown={handleAddStyle}
              className="w-full bg-black/5 text-studio-charcoal p-3 rounded-md border border-gray-700/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleSection;
