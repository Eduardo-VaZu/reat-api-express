# 📘 Documentación con Swagger en Express + TypeScript

## 📦 1️⃣ Instalar dependencias

``` bash
npm install swagger-ui-express swagger-jsdoc
npm install -D @types/swagger-ui-express
```

------------------------------------------------------------------------

## 📁 2️⃣ Crear configuración de Swagger

Crear archivo:

    src/config/swagger.ts

Ejemplo básico:

``` ts
import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
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
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
```

------------------------------------------------------------------------

## 🚀 3️⃣ Configurar Swagger en app.ts

``` ts
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
```

------------------------------------------------------------------------

## 📝 4️⃣ Documentar un endpoint

Ejemplo en un archivo de rutas:

``` ts
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica si el servidor está activo
 *     responses:
 *       200:
 *         description: Servidor funcionando correctamente
 */
router.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});
```

------------------------------------------------------------------------

## ▶️ 5️⃣ Ejecutar proyecto

``` bash
npm run dev
```

Luego abrir en el navegador:

    http://localhost:3000/api-docs

------------------------------------------------------------------------

## 🗂️ Estructura recomendada

    src/
      app.ts
      server.ts
      config/
        swagger.ts
      routes/
        health.routes.ts

------------------------------------------------------------------------

## 🔐 Opcional: Seguridad con JWT en Swagger

Agregar dentro de `definition`:

``` ts
components: {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
},
security: [{ bearerAuth: [] }],
```
