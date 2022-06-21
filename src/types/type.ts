export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface Rating {
  rate: number;
  count: number;
}

export interface Products extends Array<ProductType> {}

export interface itemType {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  hasPrime: boolean;
}
