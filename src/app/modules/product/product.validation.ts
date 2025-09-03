import { z } from "zod";

const createProductZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Product title is required" }),
    image: z.string().optional(),
    description: z.string({
      required_error: "Product description is required",
    }),
    price: z.coerce.number({ required_error: "Product price is required" }),
    brand: z.string({ required_error: "Product brand is required" }),
    category: z.string({ required_error: "Product category is required" }),
    material: z.string({ required_error: "Product material is required" }),
    rating: z.coerce.number({ required_error: "Product rating is required" }),
    stock: z.coerce.number({ required_error: "Product stock is required" }),
  }),
});

const updateProductZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    price: z.coerce.number().optional(),
    brand: z.string().optional(),
    category: z.string().optional(),
    material: z.string().optional(),
    rating: z.coerce.number().optional(),
    stock: z.coerce.number().optional(),
  }),
});

export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
};
