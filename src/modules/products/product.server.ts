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
        const products = await prisma.product.findMany();
        return products;
    },
}
