import express from "express";
import { productController } from "./product.controller.js";

const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.put("/:id", productController.updateProduct);

export default router;
