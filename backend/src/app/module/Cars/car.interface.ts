export interface ICar {
  make: string;
  model: string;
  type: string;
  year: number;
  category: string;
  features: string[];
  specifications: {
    mileage: string;
    topSpeed?: string;
    acceleration?: string;
    engine?: string;
    horsepower?: string;
    transmission: string;
    capacity: string;
  };
  pricing: {
    daily: number;
    weekly: number;
    monthly: number;
    currency: string;
  };
  availability: boolean;
  images: string[];
}
