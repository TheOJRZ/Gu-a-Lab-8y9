require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Importación de rutas
const authRoutes = require("./src/routes/authRoutes");
const lineaRoutes = require("./src/routes/lineaRoutes");
const estudianteRoutes = require("./src/routes/estudianteRoutes");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./src/swagger");

const app = express();
app.use(express.json());

// Documentación interactiva
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Endpoints principales
app.use("/api/auth", authRoutes);
app.use("/api/lineas", lineaRoutes);
app.use("/api/estudiantes", estudianteRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Base de datos MongoDB Atlas conectada con éxito");
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
      console.log(
        `Documentación interactiva disponible en: http://localhost:${PORT}/api-docs`,
      );
    });
  })
  .catch((err) => console.error("Error al conectar:", err));
