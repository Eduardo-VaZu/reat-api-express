import { prisma } from "../../config/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";


export const productService = {
    createProduct: async (productData: Omit<Prisma.ProductCreateInput, "createdAt" | "updatedAt">) => {
        const product = await prisma.product.create({
            data: productData,
        });
        return product;
    },
    getProducts: async () => {
        const products = await prisma.product.findMany();
        return products;
    },
}