import type { Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client.js";
import { createProductSchema, updateProductSchema } from "./product.schema.js";
import { productService } from "./product.server.js";

export const productController = {
    createProduct: async (req: Request, res: Response) => {
        try {
            const parsed = createProductSchema.safeParse(req.body);

            if (!parsed.success) {
                res.status(400).json({
                    error: "Invalid request",
                    details: parsed.error
                });
                return;
            }

            const data: Omit<Prisma.ProductCreateInput, "createdAt" | "updatedAt"> = {
                name: parsed.data.name ?? null,
                price: new Prisma.Decimal(parsed.data.price),
            };

            const product = await productService.createProduct(data);
            res.status(201).json(product);

        } catch (error) {
            const message = error instanceof Error ? error.message : "Internal server error";
            res.status(500).json({
                error: message
            });
        }

    },
    getProducts: async (req: Request, res: Response) => {
        try {
            const products = await productService.getProducts();
            res.status(200).json(products);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Internal server error";
            res.status(500).json({
                error: message
            });
        }
    },
    updateProduct: async (req: Request, res: Response) => {
        try {
            const idStr = req.params.id;

            if (!idStr || !Number.isFinite(Number(idStr))) {
                res.status(400).json({ error: "Invalid id" });
                return;
            }

            const id = Number(idStr);
            const parsed = updateProductSchema.safeParse(req.body);
            if (!parsed.success) {
                res.status(400).json({
                    error: "Invalid request",
                    details: parsed.error
                });
                return;
            }
            const data: Prisma.ProductUpdateInput = {};
            if (parsed.data.name !== undefined) {
                data.name = parsed.data.name;
            }
            if (parsed.data.price !== undefined) {
                data.price = new Prisma.Decimal(parsed.data.price);
            }
            const product = await productService.updateProduct(id, data);
            res.status(200).json(product);

        } catch (error: any) {
            if (error?.code === "P2025") {
                res.status(404).json({ error: "Product not found" });
                return;
            }
            const message = error instanceof Error ? error.message : "Internal server error";
            res.status(500).json({ error: message });
        }
    },

}
