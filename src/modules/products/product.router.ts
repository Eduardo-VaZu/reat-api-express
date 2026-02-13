
import express, { type NextFunction, type Request, type Response } from "express";
import { productController } from "./product.controller.js";
import {
  createProductValidator,
  updateProductValidator,
  idParamValidator,
  availabilityProductValidator,
} from "./product.validator.js";
import validate from "../../middlewares/errorValidator.js";

const router = express.Router();


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crea un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreateInput'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post("/", createProductValidator, validate, productController.createProduct);

/**
 * @swagger
 * /product:
 *  get:
 *    summary: Obtener todos los productos
 *    responses:
 *      201:
 *        description: Productos obtenidos exitosamente
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/Product'
 */
router.get("/", productController.getProducts);

/**
 * @swagger
 * /product/{id}:
 *  get:
 *    summary: Obtener un producto por ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Producto obtenido exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 */
router.get("/:id", idParamValidator, validate, productController.getProductById);

/**
 * @swagger
 * /product/{id}:
 *  put:
 *    summary: Actualizar un producto por ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ProductUpdateInput'
 *    responses:
 *      200:
 *        description: Producto actualizado exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 */
router.put("/:id", idParamValidator, updateProductValidator, validate, productController.updateProduct);

/**
 * @swagger
 * /product/availability/{id}:
 *  put:
 *    summary: Actualizar la disponibilidad de un producto por ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *
 *    responses:
 *      200:
 *        description: Disponibilidad del producto actualizada exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 */
router.put("/availability/:id", idParamValidator, availabilityProductValidator, validate, productController.availabilityProduct);

/**
 * @swagger
 * /product/{id}:
 *  delete:
 *    summary: Eliminar un producto por ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Producto eliminado exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 */
router.delete("/:id", idParamValidator, validate, productController.deleteProduct);



export default router;
