import { Category } from "./category";

export interface Product {
  _id: string;
  category: Category;
  createdAt: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}
