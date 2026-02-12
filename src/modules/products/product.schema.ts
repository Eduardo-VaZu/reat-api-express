import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1).optional(),
    price: z.number().min(0),
});