
import React from "react";
import { ChevronLeft } from "lucide-react";

interface AgentConfirmationProps {
  name: string;
  modelProvider: string;
  clients: string[];
  onGoBack: () => void;
}

const AgentConfirmation: React.FC<AgentConfirmationProps> = ({
  name = "Trump",
  modelProvider = "OpenAI",
  clients = ["X (Twitter)"],
  onGoBack
}) => {
  return (
    <div className="py-6">
      <button 
        onClick={onGoBack}
        className="flex items-center text-studio-accent mb-6 hover:text-studio-accent/80"
      >
        <ChevronLeft className="h-5 w-5 mr-1" /> Settings
      </button>

      <h1 className="text-4xl font-bold mb-6">Confirm agent details</h1>
      <p className="text-xl text-muted-foreground mb-8">
        You will be deploying an agent with the information below. This is the final step before your agent is deployed.
      </p>

      <div className="bg-black/10 rounded-lg overflow-hidden mb-8">
        <div className="p-4 flex justify-center gap-8 border-b border-gray-800/10">
          <button className="text-white font-medium border-b-2 border-white pb-1">Text</button>
          <button className="text-gray-400 hover:text-white transition-colors">JSON</button>
        </div>

        <div className="p-6">
          <div className="bg-black/20 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 font-medium uppercase tracking-wide text-sm">General</h3>
              <span className="inline-block h-6 w-6">▼</span>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-white font-medium mb-1">Name</h4>
                <p>{name}</p>
              </div>

              <div>
                <h4 className="text-white font-medium mb-1">Avatar</h4>
                <div className="h-12 w-12 bg-green-400 rounded-full flex items-center justify-center">
                  <div className="h-9 w-9 bg-green-300 rounded-full flex items-center justify-center">
                    <span className="text-xl">😎</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-1">Model provider</h4>
                <p>{modelProvider}</p>
              </div>

              <div>
                <h4 className="text-white font-medium mb-1">Clients</h4>
                {clients.map((client, index) => (
                  <p key={index}>{client}</p>
                ))}
              </div>

              <div>
                <h4 className="text-white font-medium mb-1">Social Links</h4>
                <p>X (Twitter): <a href="https://x.com/kljnkj" className="text-yellow-400">https://x.com/kljnkj</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-md font-medium">
        Deploy agent
      </button>
    </div>
  );
};

export default AgentConfirmation;
