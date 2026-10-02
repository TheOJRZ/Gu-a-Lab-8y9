require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // 1. Importar cors

const authRoutes = require("./src/routes/authRoutes");
const lineaRoutes = require("./src/routes/lineaRoutes");
const estudianteRoutes = require("./src/routes/estudianteRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./src/swagger");

const app = express();

// 2. Habilitar CORS para permitir peticiones desde Live Server o cualquier cliente frontend
app.use(cors({ origin: "*" }));

app.use(express.json());

// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas de la API
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
    });
  })
  .catch((err) => console.error("Error al conectar:", err));
