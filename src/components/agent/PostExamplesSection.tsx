
import React, { useState } from "react";
import { Trash } from "lucide-react";

const PostExamplesSection: React.FC = () => {
  const [postExamples, setPostExamples] = useState<string[]>([
    "NO TAX ON TIPS! NO TAX ON OVERTIME! NO TAX ON SOCIAL SECURITY FOR OUR GREAT SENIORS!",
    "Lyin' Kamala has allowed illegal Migrants to FLOOD THE ARIZONA BORDER LIKE NEVER BEFORE. I WILL STOP IT ON DAY ONE! DJT",
    "Starting on Day One of my new administration, we will end inflation and we will MAKE AMERICA AFFORDABLE AGAIN.",
    "If Lyin' Kamala Harris gets 4 more years, instead of a Golden Age, America will instead be plunged into a Dark Age. Your family finances will be permanently destroyed. Your borders will be gone forever.",
    "PRICES ARE TOO HIGH! THE CONSUMER IS ANGRY AT THIS INCOMPETENT ADMINISTRATION. KAMALA HAS NO IDEA HOW TO BRING PRICES DOWN. SHE IS AFRAID TO EVEN DISCUSS IT WITH THE FAKE NEWS MEDIA. EVEN WORSE THAN HER V.P. CANDIDATE, SHE DOESN'T EVEN HAVE A CLUE....BUT I DO, AND IT WILL HAPPEN FAST!",
    "I didn't rig the 2020 Election, they did!",
    "I WILL SAVE ROSS ULBRICHT!",
    "Democrats are Weaponizing the Justice Department against me because they know I am WINNING, and they are desperate to prop up their failing Candidate, Kamala Harris.",
    "The Democrat Party is guilty of the Worst Election Interference in American History. They are trying to DESTROY OUR DEMOCRACY, allowing millions of people to enter our Country illegally. They are determined to stop us from winning back the White House, sealing the Border, and MAKING AMERICA GREAT AGAIN. BUT THEY WILL FAIL, AND WE WILL SAVE OUR NATION!"
  ]);

  const [newPost, setNewPost] = useState("");

  const handleAddPost = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newPost.trim()) {
      setPostExamples([...postExamples, newPost]);
      setNewPost("");
    }
  };

  const handleRemovePost = (index: number) => {
    setPostExamples(postExamples.filter((_, i) => i !== index));
  };

  return (
    <div className="py-6" id="postExamples">
      <h2 className="text-2xl font-bold mb-2">Post examples</h2>
      <p className="text-muted-foreground mb-4">
        Sample social media posts to guide content style
      </p>

      <div className="space-y-2">
        {postExamples.map((post, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={post}
              onChange={(e) => {
                const newPosts = [...postExamples];
                newPosts[index] = e.target.value;
                setPostExamples(newPosts);
              }}
              className="flex-1 bg-black/5 text-studio-charcoal p-3 rounded-md border border-gray-700/20"
            />
            <button
              onClick={() => handleRemovePost(index)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        ))}

        <div className="mt-4">
          <input
            type="text"
            placeholder="Add new post example..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            onKeyDown={handleAddPost}
            className="w-full bg-black/5 text-studio-charcoal p-3 rounded-md border border-gray-700/20"
          />
        </div>
      </div>
    </div>
  );
};

export default PostExamplesSection;
