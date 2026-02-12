import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import productRouter from "./modules/products/product.router.js";
import healthRouter from "./modules/health/health.router.js";

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        const envList = (process.env.CORS_ORIGINS ?? process.env.CORS_ORIGIN ?? "").trim();
        const allowedOrigins = envList
            ? envList.split(",").map(o => o.trim()).filter(Boolean)
            : ["http://localhost:5173"];

        if (!origin) {
            callback(null, true);
            return;
        }
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error("Not allowed by CORS"));
    },
}));
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/products", productRouter);
app.use("/", healthRouter);


export default app;
