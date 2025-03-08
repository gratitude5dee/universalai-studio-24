
import React, { useState } from "react";
import { X, Plus } from "lucide-react";

const TopicsAndAdjectives: React.FC = () => {
  const [topics, setTopics] = useState<string[]>([
    "border security crisis",
    "kamala's tax hikes",
    "election interference",
    "states' rights",
    "secret service allocation",
    "women's sports protection",
    "china virus response",
    "global instability",
    "city rebuilding",
    "crypto and worldlibertyfi",
    "democrat crime creation",
    "inflation crisis",
    "illegal migration",
    "abortion policy",
    "crowd sizes",
    "minneapolis riots",
    "iran threats",
    "taxpayer waste",
    "family finances",
    "law and order",
    "doj weaponization",
    "radical left agenda",
    "middle east crisis",
    "russia/ukraine conflict",
    "campaign interference",
    "god and american strength",
    "prison policies",
    "democrat weakness",
  ]);

  const [adjectives, setAdjectives] = useState<string[]>([
    "illegal",
    "violent",
    "dangerous",
    "radical",
    "strong",
    "weak",
    "corrupt",
    "failing",
    "crooked",
    "massive",
    "historic",
    "incompetent",
    "terrible",
    "great",
    "destroyed",
    "secure",
    "winning",
    "nervous",
    "unfair",
    "rigged",
    "weaponized",
    "unprecedented",
    "beautiful",
    "united",
    "prosperous",
    "criminal",
    "interfering",
  ]);

  const [newTopic, setNewTopic] = useState("");
  const [newAdjective, setNewAdjective] = useState("");

  const handleAddTopic = () => {
    if (newTopic.trim()) {
      setTopics([...topics, newTopic.trim()]);
      setNewTopic("");
    }
  };

  const handleAddAdjective = () => {
    if (newAdjective.trim()) {
      setAdjectives([...adjectives, newAdjective.trim()]);
      setNewAdjective("");
    }
  };

  const removeTopic = (topic: string) => {
    setTopics(topics.filter((t) => t !== topic));
  };

  const removeAdjective = (adjective: string) => {
    setAdjectives(adjectives.filter((a) => a !== adjective));
  };

  return (
    <>
      <div className="py-6" id="topics">
        <h2 className="text-2xl font-bold mb-2">Topics</h2>
        <p className="text-muted-foreground mb-4">
          List of subjects the character is interested in or knowledgeable about, used to guide conversations and generate relevant content. Helps maintain character consistency.
        </p>

        <div className="bg-black/5 p-4 rounded-lg">
          <div className="flex flex-wrap gap-2 mb-4">
            {topics.map((topic) => (
              <div
                key={topic}
                className="flex items-center gap-1 bg-black/20 text-sm rounded-full px-3 py-1"
              >
                <span>{topic}</span>
                <button
                  onClick={() => removeTopic(topic)}
                  className="ml-1 text-gray-500 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex">
            <input
              type="text"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Add a topic..."
              className="flex-1 p-2 rounded-l-md bg-black/10 border-0 text-white"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTopic();
                }
              }}
            />
            <button
              onClick={handleAddTopic}
              className="bg-black/30 px-3 rounded-r-md hover:bg-black/40"
            >
              <Plus className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="py-6" id="adjectives">
        <h2 className="text-2xl font-bold mb-2">Adjectives</h2>
        <p className="text-muted-foreground mb-4">
          Words that describe the character's traits and personality, used for generating responses with consistent tone. Can be used in "Mad Libs" style content generation.
        </p>

        <div className="bg-black/5 p-4 rounded-lg">
          <div className="flex flex-wrap gap-2 mb-4">
            {adjectives.map((adjective) => (
              <div
                key={adjective}
                className="flex items-center gap-1 bg-black/20 text-sm rounded-full px-3 py-1"
              >
                <span>{adjective}</span>
                <button
                  onClick={() => removeAdjective(adjective)}
                  className="ml-1 text-gray-500 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex">
            <input
              type="text"
              value={newAdjective}
              onChange={(e) => setNewAdjective(e.target.value)}
              placeholder="Add an adjective..."
              className="flex-1 p-2 rounded-l-md bg-black/10 border-0 text-white"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddAdjective();
                }
              }}
            />
            <button
              onClick={handleAddAdjective}
              className="bg-black/30 px-3 rounded-r-md hover:bg-black/40"
            >
              <Plus className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicsAndAdjectives;
