
export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  rating: string;
  reviews: string;
  provider: string;
  image: string;
  tags: string[];
  capabilities: {
    [key: string]: boolean;
  };
  models: string[];
  integration: string[];
}
