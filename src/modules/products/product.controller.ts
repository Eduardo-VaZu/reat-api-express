import type { Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client.js";
import { productService } from "./product.service.js";

export const productController = {
    createProduct: async (req: Request, res: Response) => {
        try {

            const data: Prisma.ProductCreateInput = {
                name: req.body.name ?? null,
                price: new Prisma.Decimal(req.body.price),
            };

            const product = await productService.createProduct(data);
            res.status(201).json({
                success: true,
                message: "Product created successfully",
                product: product
            });

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                switch (error.code) {
                    case "P2002":
                        res.status(409).json({ error: "Unique constraint violation" });
                        return;
                    case "P2003":
                        res.status(409).json({ error: "Foreign key constraint failed" });
                        return;
                    case "P2025":
                        res.status(404).json({ error: "Related record not found" });
                        return;
                }
            }
            res.status(500).json({ error: "Internal server error" });
        }

    },

    getProducts: async (req: Request, res: Response) => {
        try {
            const products = await productService.getProducts();

            res.status(200).json({
                success: true,
                message: "Products retrieved successfully",
                products: products
            });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },

    getProductById: async (req: Request, res: Response) => {
        try {
            const productId = Number(req.params.id);
            const product = await productService.getProductById(productId);
            if (!product) {
                res.status(404).json({ error: "Product not found" });
                return;
            }
            const productDTO = { ...product, price: product.price.toString() };
            res.status(200).json({
                success: true,
                message: "Product retrieved successfully",
                product: productDTO
            });

        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },

    updateProduct: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const data: Prisma.ProductUpdateInput = {};
            if (req.body.name !== undefined) {
                data.name = req.body.name;
            }
            if (req.body.price !== undefined) {
                data.price = new Prisma.Decimal(req.body.price);
            }
            const product = await productService.updateProduct(id, data);
            res.status(200).json({
                product,
                message: "Product updated successfully",
                success: true
            });

        } catch (error: unknown) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                switch (error.code) {
                    case "P2002":
                        res.status(409).json({ error: "Unique constraint violation" });
                        return;
                    case "P2003":
                        res.status(409).json({ error: "Foreign key constraint failed" });
                        return;
                    case "P2025":
                        res.status(404).json({ error: "Product not found" });
                        return;
                }
            }
            res.status(500).json({ error: "Internal server error" });
        }
    },

    availabilityProduct: async (req: Request, res: Response) => {
        try {
            const idStr = req.params.id;

            if (!idStr || !Number.isFinite(Number(idStr))) {
                res.status(400).json({
                    error: "Invalid id"
                });
                return;
            }

            const id = Number(idStr);
            const product = await productService.availabilityProduct(id);
            const productDTO = { ...product, price: product.price.toString() };
            res.status(200).json({
                product: productDTO,
                message: "Product availability updated successfully",
                success: true
            });
        } catch (error: unknown) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                switch (error.code) {
                    case "P2025":
                        res.status(404).json({ error: "Product not found" });
                        return;
                    case "P2003":
                        res.status(409).json({ error: "Foreign key constraint failed" });
                        return;
                }
            }
            res.status(500).json({ error: "Internal server error" });
        }
    },

    deleteProduct: async (req: Request, res: Response) => {
        try {
            const idStr = req.params.id;

            if (!idStr || !Number.isFinite(Number(idStr))) {
                res.status(400).json({
                    error: "Invalid id"
                });
                return;
            }

            const id = Number(idStr);
            const product = await productService.deleteProduct(id);
            res.status(200).json({
                product,
                message: "Product deleted successfully",
                success: true
            });
        } catch (error: unknown) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                switch (error.code) {
                    case "P2025":
                        res.status(404).json({ error: "Product not found" });
                        return;
                    case "P2003":
                        res.status(409).json({ error: "Foreign key constraint failed" });
                        return;
                }
            }
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
