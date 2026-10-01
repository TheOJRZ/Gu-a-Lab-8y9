const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/lineaController");
const auth = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: LineasInvestigacion
 *   description: Endpoints CRUD de Líneas de Investigación (Protegidos con JWT)
 */

/**
 * @swagger
 * /api/lineas:
 *   get:
 *     summary: Obtener todas las líneas de investigación
 *     tags: [LineasInvestigacion]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de líneas
 *       401:
 *         description: No autorizado
 *   post:
 *     summary: Crear una nueva línea de investigación
 *     tags: [LineasInvestigacion]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - codigo
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Inteligencia Artificial
 *               codigo:
 *                 type: string
 *                 example: IA-01
 *               activa:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Línea creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.get("/", auth.verifyToken, ctrl.obtenerLineas);
router.post("/", auth.verifyToken, ctrl.crearLinea);

/**
 * @swagger
 * /api/lineas/{id}:
 *   put:
 *     summary: Actualizar una línea de investigación existente
 *     tags: [LineasInvestigacion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la línea de investigación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Inteligencia Artificial Avanzada
 *               activa:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Línea actualizada
 *       404:
 *         description: Línea no encontrada
 *   delete:
 *     summary: Eliminar una línea de investigación
 *     tags: [LineasInvestigacion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Línea eliminada
 *       404:
 *         description: Línea no encontrada
 */
router.put("/:id", auth.verifyToken, ctrl.actualizarLinea);
router.delete("/:id", auth.verifyToken, ctrl.eliminarLinea);

module.exports = router;
