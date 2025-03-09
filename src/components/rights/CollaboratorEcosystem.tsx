
import { useState } from "react";
import { Collaborator } from "./types";
import CollaboratorMap from "./CollaboratorMap";
import CollaboratorDetails from "./CollaboratorDetails";
import CollaboratorActions from "./CollaboratorActions";

const CollaboratorEcosystem = () => {
  const [showCollaboratorDetails, setShowCollaboratorDetails] = useState<string | null>(null);
  
  const collaborators: Collaborator[] = [
    { 
      id: "you",
      name: "You", 
      role: "Creator",
      contribution: "Original work and concept",
      share: 70,
      color: "#9b87f5",
      details: "Primary rights holder with veto power on major decisions. Responsible for core creation, concept development, and creative direction."
    },
    { 
      id: "alex",
      name: "Alex Rivera", 
      role: "Collaborator",
      contribution: "Visual enhancements",
      share: 15,
      color: "#33C3F0",
      details: "Secondary rights holder contributing visual elements, styling, and design aesthetics. Retains approval rights for visual modifications."
    },
    { 
      id: "sam",
      name: "Sam Taylor", 
      role: "Collaborator",
      contribution: "Narrative support",
      share: 15,
      color: "#F97316",
      details: "Secondary rights holder contributing narrative structure, storytelling elements, and character development. Retains approval rights for story modifications."
    }
  ];
  
  const toggleCollaboratorDetails = (id: string) => {
    if (showCollaboratorDetails === id) {
      setShowCollaboratorDetails(null);
    } else {
      setShowCollaboratorDetails(id);
    }
  };

  return (
    <div className="space-y-3">
      <CollaboratorMap 
        collaborators={collaborators} 
        onToggleDetails={toggleCollaboratorDetails} 
      />
      
      {/* Collaborator details expanded view */}
      {showCollaboratorDetails && (
        <CollaboratorDetails 
          collaborator={collaborators.find(c => c.id === showCollaboratorDetails)!} 
        />
      )}
      
      <CollaboratorActions />
    </div>
  );
};

export default CollaboratorEcosystem;
