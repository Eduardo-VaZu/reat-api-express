import { prisma } from "../../config/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";


export const productService = {
    createProduct: async (productData: Prisma.ProductCreateInput) => {
        const product = await prisma.product.create({
            data: productData,
        });
        return product;
    },
    updateProduct: async (id: number, data: Prisma.ProductUpdateInput) => {
        const product = await prisma.product.update({
            where: { id },
            data,
        });
        return product;

    },
    getProducts: async () => {
        const products = await prisma.product.findMany({
            orderBy: {
                id: "asc",
            }
        });
        return products;
    },
    getProductById: async (id: number) => {
        const product = await prisma.product.findUnique({
            where: { id },
        });
        return product;
    },
    availabilityProduct: async (id: number) => {
        const product = await prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new Error("Product not found");
        }
        const availability = product.availability ? false : true

        const updated = await prisma.product.update({
            where: { id },
            data: { availability },
        });
        return updated;
    },
    deleteProduct: async (id: number) => {
        const product = await prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new Error("Product not found");
        }
        const deleted = await prisma.product.delete({
            where: { id },
        });
        return deleted;
    }
}
