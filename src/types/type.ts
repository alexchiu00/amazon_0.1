import { Key } from "react";

export interface ProductType {
  id: Key;
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
