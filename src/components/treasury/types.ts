
export interface Treasure {
  id: string;
  name: string;
  type: "coin" | "gem" | "artifact";
  value: number;
  description: string;
  color: string;
  lore: string;
  supply: string;
  growth: number;
}

export interface TreasureItemProps {
  treasure: Treasure;
  onClick: (treasure: Treasure) => void;
  isSelected?: boolean;
}

export interface TreasureDetailsProps {
  selectedTreasure: Treasure | null;
}

export interface TreasureCollectionProps {
  treasures?: Treasure[];
}
