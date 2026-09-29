require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');

// Importaciones de Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/swagger');

const app = express();

app.use(express.json());

// Ruta para la documentación interactiva
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas de la API
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Base de datos MongoDB Atlas conectada con éxito');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
      console.log(`Swagger UI disponible en http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('Error de conexión a MongoDB:', err.message);
  });