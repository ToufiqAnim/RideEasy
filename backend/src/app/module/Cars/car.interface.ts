export interface ICar {
  make: string;
  model: string;
  type: string;
  year: number;
  category: string;
  features?: string[];
  specifications?: {
    mileage?: string;
    topSpeed?: string;
    acceleration?: string;
    engine?: string;
    horsepower?: string;
    transmission?: string;
    capacity?: string;
  };
  pricing: number;
  availability?: boolean;
  images?: string[];
}
export const carSearchableFields = ["make", "model", "category", "type"];
export type ICarFilters = {
  searchTerm?: string;
  type?: string;
};
