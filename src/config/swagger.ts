import swaggerJsdoc from 'swagger-jsdoc'
import type { Options } from 'swagger-jsdoc'

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentación de mi API con Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        ProductCreateInput: {
          type: "object",
          required: ["price"],
          properties: {
            name: { type: "string", nullable: true },
            price: { type: "number", format: "double", example: 100.5 },
          },
        },
        ProductUpdateInput: {
          type: "object",
          required: ["price"],
          properties: {
            name: { type: "string", nullable: true },
            price: { type: "number", format: "double", example: 100.5 },
          },
        },
        Product: {
          type: "object",
          required: ["id", "price", "availability", "createdAt", "updatedAt"],
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", nullable: true },
            price: { type: "string", example: "100.50" },
            availability: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apis: ["./src/modules/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
