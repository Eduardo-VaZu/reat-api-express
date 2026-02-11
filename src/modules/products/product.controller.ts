import { productService } from "./product.server.js";
import type { Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client.js";

export const productController = {
    createProduct: async (req: Request, res: Response) => {
        try {
            const productData = req.body as Omit<Prisma.ProductCreateInput, "createdAt" | "updatedAt">;
            const product = await productService.createProduct(productData);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }

    },
    getProducts: async (req: Request, res: Response) => {
        try{
            const products = await productService.getProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },

}