import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1).optional(),
    price: z.coerce.number().min(0),
});

export const updateProductSchema = z.object({
    name: z.string().min(1).optional(),
    price: z.coerce.number().min(0).optional(),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
