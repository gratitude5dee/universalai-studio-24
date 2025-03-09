
export type BridgeDirection = "digital-to-physical" | "physical-to-digital";

export interface BridgeAsset {
  id: string;
  name: string;
  type: "product" | "ticket" | "certificate" | "document";
  status: "pending" | "bridging" | "completed" | "failed";
  createdAt: string;
  direction: BridgeDirection;
  verificationCode?: string;
  icon?: string;
}

export interface VerificationMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType;
  securityLevel: "low" | "medium" | "high";
}

export interface PhysicalProduct {
  id: string;
  name: string;
  description: string;
  status: "verified" | "unverified" | "pending";
  digitalAssetId: string;
  verificationMethods: string[];
}

export interface EventTicket {
  id: string;
  eventName: string;
  eventDate: string;
  ticketType: string;
  owner: string;
  status: "issued" | "validated" | "expired";
  validationCode: string;
}
