import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString || typeof connectionString !== "string") {
  throw new Error("DATABASE_URL not set");
}
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prismaClientSingleton = () =>
  new PrismaClient({ adapter });

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

