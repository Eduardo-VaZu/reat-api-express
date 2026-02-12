import app from "./app.js";
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from "./config/swagger.js";

dotenv.config();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${NODE_ENV} mode`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API documentation: http://localhost:${PORT}/docs`);
});
