
import React, { useState } from "react";
import { Trash } from "lucide-react";

interface MessageExample {
  id: string;
  user: string;
  response: string;
}

const MessageExamplesSection: React.FC = () => {
  const [examples, setExamples] = useState<MessageExample[]>([
    {
      id: "1",
      user: "What's your stance on abortion?",
      response: "EVERYONE KNOWS I WOULD NOT SUPPORT A FEDERAL ABORTION BAN, UNDER ANY CIRCUMSTANCES, AND WOULD, IN FACT, VETO IT, BECAUSE IT IS UP TO THE STATES TO DECIDE BASED ON THE WILL OF THEIR VOTERS (THE WILL OF THE PEOPLE!). LIKE RONALD REAGAN BEFORE ME, I FULLY SUPPORT THE THREE EXCEPTIONS FOR RAPE, INCEST, AND THE LIFE OF THE MOTHER. I DO NOT SUPPORT THE DEMOCRATS RADICAL POSITION OF LATE TERM ABORTION LIKE, AS AN EXAMPLE, IN THE 7TH, 8TH, OR 9TH MONTH OR, IN CASE THERE IS ANY QUESTION, THE POSSIBILITY OF EXECUTION OF THE BABY AFTER BIRTH. THANK YOU FOR YOUR ATTENTION TO THIS MATTER!"
    },
    {
      id: "2",
      user: "",
      response: ""
    }
  ]);

  const addExample = () => {
    const newId = (examples.length + 1).toString();
    setExamples([...examples, { id: newId, user: "", response: "" }]);
  };

  const removeExample = (id: string) => {
    setExamples(examples.filter(example => example.id !== id));
  };

  const updateExample = (id: string, field: 'user' | 'response', value: string) => {
    setExamples(examples.map(example => 
      example.id === id ? { ...example, [field]: value } : example
    ));
  };

  return (
    <div className="py-6" id="messageExamples">
      <h2 className="text-2xl font-bold mb-2">Message examples</h2>
      <p className="text-muted-foreground mb-4">
        Sample conversations for establishing interaction patterns. Helps establish the character's conversational style.
      </p>

      <div className="space-y-6">
        {examples.map((example) => (
          <div key={example.id} className="bg-black/10 rounded-lg p-4 relative">
            <div className="absolute right-2 top-2">
              <button 
                onClick={() => removeExample(example.id)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
            
            <h3 className="font-medium mb-4">Example #{example.id}</h3>
            
            <div className="space-y-4">
              <div>
                <div className="bg-black/20 rounded-lg p-4 mb-2">
                  <p className="text-white text-sm mb-2">User</p>
                  <textarea
                    value={example.user}
                    onChange={(e) => updateExample(example.id, 'user', e.target.value)}
                    className="w-full bg-black/30 text-white p-3 rounded-md"
                    rows={2}
                    placeholder="Enter user message..."
                  />
                </div>
              </div>

              <div>
                <div className="bg-black/20 rounded-lg p-4 mb-2 ml-auto mr-0 max-w-2xl">
                  <p className="text-white text-sm mb-2">Trump</p>
                  <textarea
                    value={example.response}
                    onChange={(e) => updateExample(example.id, 'response', e.target.value)}
                    className="w-full bg-black/30 text-white p-3 rounded-md"
                    rows={6}
                    placeholder="Enter agent response..."
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={addExample}
          className="flex items-center justify-center text-sm text-studio-accent hover:text-studio-accent/80 mt-4"
        >
          + Add more
        </button>
      </div>
    </div>
  );
};

export default MessageExamplesSection;
