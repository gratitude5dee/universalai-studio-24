import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Content } from "@/components/ui/content";
import Gallery from "@/components/ui/gallery";

const AssetLibrary = () => {
  const recentCreations = [
    {
      id: "1",
      title: "Nebula Wanderer",
      image: "https://images.unsplash.com/photo-1603344204980-4edb0ea63148?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlnaXRhbCUyMGFydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      likes: 254,
      views: 1872,
      comments: 32,
    },
    {
      id: "2",
      title: "Crystal Consciousness",
      image: "https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlnaXRhbCUyMGFydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      likes: 189,
      views: 1254,
      comments: 24,
    },
    {
      id: "3",
      title: "Astral Projection",
      image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      likes: 321,
      views: 2341,
      comments: 42,
    },
    {
      id: "4",
      title: "Dimensional Shift",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      likes: 276,
      views: 1987,
      comments: 36,
    },
  ];

  const featuredCollections = [
    {
      id: "5",
      title: "Ethereal Dreams",
      image: "https://images.unsplash.com/photo-1659792223397-2a108debb69a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      likes: 423,
      views: 3241,
      comments: 54,
    },
    {
      id: "6",
      title: "Quantum Reflections",
      image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      likes: 365,
      views: 2876,
      comments: 48,
    },
    {
      id: "7",
      title: "Neural Canvas",
      image: "https://images.unsplash.com/photo-1483232539664-d89822fb5d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      likes: 312,
      views: 2143,
      comments: 37,
    },
    {
      id: "8",
      title: "Cybernetic Awakening",
      image: "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      likes: 287,
      views: 1932,
      comments: 29,
    },
  ];

  const popularItems = [
    {
      id: "9",
      title: "Cosmic Gateway",
      image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      likes: 543,
      views: 4321,
      comments: 76,
    },
    {
      id: "10",
      title: "Synthetic Intelligence",
      image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      likes: 487,
      views: 3876,
      comments: 62,
    },
    {
      id: "11",
      title: "Digital Serenity",
      image: "https://images.unsplash.com/photo-1506792006437-256b665541e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      likes: 412,
      views: 3241,
      comments: 53,
    },
    {
      id: "12",
      title: "Holographic Visions",
      image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGRpZ2l0YWwlMjBhcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      likes: 378,
      views: 2987,
      comments: 47,
    },
  ];

  return (
    <DashboardLayout>
      <Content title="Asset Library" subtitle="Browse and explore your creative assets">
        <div className="space-y-10">
          <Gallery items={recentCreations} title="Recent Creations" maxDisplay={4} />
          <Gallery items={featuredCollections} title="Featured Collections" maxDisplay={4} />
          <Gallery items={popularItems} title="Popular Assets" maxDisplay={4} />
        </div>
      </Content>
    </DashboardLayout>
  );
};

export default AssetLibrary;
