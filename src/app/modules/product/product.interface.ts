import { Model, Schema, Types } from "mongoose";

export type IProduct = {
  title: string;
  image: string;
  description: string;
  price: number;
  brand: string;
  category: Schema.Types.ObjectId;
  material: string;
  rating: number;
  stock: number;
};

export type ProductModal = Model<IProduct, Record<string, unknown>>;
