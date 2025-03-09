
import { Agent } from "./types";

export const agents: Agent[] = [
  {
    id: "1",
    name: "CreativeGenius",
    description: "AI creative assistant that helps generate ideas, draft content, and refine your creative work across multiple mediums.",
    category: "creative",
    price: "Freemium",
    rating: "4",
    reviews: "1.2k",
    provider: "5th Universal",
    image: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?q=80&w=300&h=200&auto=format",
    tags: ["Content Creation", "Ideation", "Multi-Modal", "Collaboration"],
    capabilities: {
      "Text Generation": true,
      "Image Creation": true,
      "Code Generation": false,
      "Data Analysis": false,
      "Multi-Modal": true
    },
    models: ["GPT-4o"],
    integration: ["API Access", "Webhook Support"]
  },
  {
    id: "2",
    name: "CodeCrafter",
    description: "Specialized AI coding assistant that helps write, debug, and explain code across multiple programming languages.",
    category: "code",
    price: "Paid",
    rating: "5",
    reviews: "3.4k",
    provider: "CodeLabs",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=300&h=200&auto=format",
    tags: ["Coding", "Debugging", "Documentation", "Technical"],
    capabilities: {
      "Text Generation": true,
      "Image Creation": false,
      "Code Generation": true,
      "Data Analysis": true,
      "Multi-Modal": false
    },
    models: ["Claude 3"],
    integration: ["API Access", "SDK Libraries", "CLI Tools"]
  },
  {
    id: "3",
    name: "ArtisticVision",
    description: "AI art generator capable of creating unique visual artwork in various styles based on text descriptions.",
    category: "art",
    price: "Paid",
    rating: "4",
    reviews: "956",
    provider: "ArtisticLabs",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=300&h=200&auto=format",
    tags: ["Image Generation", "Art", "Design", "Visual"],
    capabilities: {
      "Text Generation": false,
      "Image Creation": true,
      "Code Generation": false,
      "Data Analysis": false,
      "Multi-Modal": true
    },
    models: ["Gemini Pro"],
    integration: ["API Access", "Webhook Support"]
  },
  {
    id: "4",
    name: "ResearchSage",
    description: "Powerful research assistant that finds, summarizes, and analyzes information from various sources.",
    category: "research",
    price: "Free",
    rating: "3",
    reviews: "742",
    provider: "KnowledgeAI",
    image: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=300&h=200&auto=format",
    tags: ["Research", "Summarization", "Analysis", "Knowledge"],
    capabilities: {
      "Text Generation": true,
      "Image Creation": false,
      "Code Generation": false,
      "Data Analysis": true,
      "Multi-Modal": false
    },
    models: ["Mistral"],
    integration: ["API Access"]
  },
  {
    id: "5",
    name: "ConversationPal",
    description: "Natural and engaging AI conversational agent that can discuss various topics and provide companionship.",
    category: "conversation",
    price: "Freemium",
    rating: "4",
    reviews: "2.1k",
    provider: "ChatTech",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=300&h=200&auto=format",
    tags: ["Conversation", "Chat", "Social", "Support"],
    capabilities: {
      "Text Generation": true,
      "Image Creation": false,
      "Code Generation": false,
      "Data Analysis": false,
      "Multi-Modal": false
    },
    models: ["GPT-4o"],
    integration: ["API Access", "Webhook Support", "SDK Libraries"]
  },
  {
    id: "6",
    name: "StoryWeaver",
    description: "AI storytelling assistant that helps create compelling narratives, characters, and plot developments.",
    category: "creative",
    price: "Free",
    rating: "4",
    reviews: "1.5k",
    provider: "NarrativeAI",
    image: "https://images.unsplash.com/photo-1532153955177-f59af40d6472?q=80&w=300&h=200&auto=format",
    tags: ["Writing", "Storytelling", "Fiction", "Creative"],
    capabilities: {
      "Text Generation": true,
      "Image Creation": false,
      "Code Generation": false,
      "Data Analysis": false,
      "Multi-Modal": false
    },
    models: ["Claude 3"],
    integration: ["API Access"]
  },
  {
    id: "7",
    name: "DataVizard",
    description: "AI data visualization specialist that transforms complex data into insightful charts, graphs, and visual representations.",
    category: "research",
    price: "Paid",
    rating: "5",
    reviews: "876",
    provider: "DataTech",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&h=200&auto=format",
    tags: ["Data Visualization", "Analytics", "Business", "Reports"],
    capabilities: {
      "Text Generation": true,
      "Image Creation": true,
      "Code Generation": true,
      "Data Analysis": true,
      "Multi-Modal": true
    },
    models: ["Gemini Pro"],
    integration: ["API Access", "Webhook Support", "SDK Libraries", "CLI Tools"]
  },
  {
    id: "8",
    name: "MusicMuse",
    description: "AI music composer that creates original compositions in various styles and can adapt to specific moods or requirements.",
    category: "creative",
    price: "Freemium",
    rating: "3",
    reviews: "634",
    provider: "HarmonyAI",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=300&h=200&auto=format",
    tags: ["Music", "Composition", "Audio", "Creative"],
    capabilities: {
      "Text Generation": false,
      "Image Creation": false,
      "Code Generation": false,
      "Data Analysis": false,
      "Multi-Modal": true
    },
    models: ["Mistral"],
    integration: ["API Access", "SDK Libraries"]
  },
  {
    id: "9",
    name: "DesignPartner",
    description: "AI design assistant that helps create professional-quality graphics, layouts, and visual assets for various projects.",
    category: "art",
    price: "Paid",
    rating: "4",
    reviews: "1.3k",
    provider: "DesignLabs",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=300&h=200&auto=format",
    tags: ["Design", "Graphics", "UI/UX", "Visual"],
    capabilities: {
      "Text Generation": false,
      "Image Creation": true,
      "Code Generation": false,
      "Data Analysis": false,
      "Multi-Modal": true
    },
    models: ["GPT-4o"],
    integration: ["API Access", "Webhook Support", "SDK Libraries"]
  }
];
