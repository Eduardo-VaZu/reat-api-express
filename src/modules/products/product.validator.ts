import { body, param } from "express-validator";

export const createProductValidator = [
    body("name").optional().isString().isLength({ max: 255 }),
    body("price").exists().isDecimal({decimal_digits: "1,2"}).custom((v) => Number(v) > 0)
];

export const updateProductValidator = [
    body("name").optional().isString().isLength({ max: 255 }),
    body("price").optional().isDecimal({decimal_digits: "1,2"}).custom((v) => Number(v) > 0)
];

export const idParamValidator = [
    param("id").exists().isInt({ min: 1 })
];

export const getProductValidator = idParamValidator;
export const deleteProductValidator = idParamValidator;
export const availabilityProductValidator = idParamValidator;

