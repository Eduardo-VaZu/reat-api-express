import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    price: z.coerce.number().min(0, { message: "Price must be greater than 0" }),
});

export const updateProductSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    price: z.coerce.number().min(0, { message: "Price must be greater than 0" }),
});
