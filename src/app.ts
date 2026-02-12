import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import productRouter from "./modules/products/product.router.js";
import healthRouter from "./modules/health/health.router.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/products", productRouter);
app.use("/", healthRouter);


export default app;
