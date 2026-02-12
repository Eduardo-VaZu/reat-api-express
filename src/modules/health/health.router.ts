import { Router } from "express";
import { healthController } from "./health.controller.js";

const healthRouter = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica si el servidor está activo
 *     responses:
 *       200:
 *         description: Servidor funcionando correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Healthy
 */
healthRouter.get("/health", healthController.checkHealth);

export default healthRouter;
