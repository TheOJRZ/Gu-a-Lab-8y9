const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/estudianteController");
const auth = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Estudiantes
 *   description: Endpoints CRUD de Estudiantes y relaciones pobladas
 */

/**
 * @swagger
 * /api/estudiantes:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     tags: [Estudiantes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista general de estudiantes
 *   post:
 *     summary: Crear un nuevo estudiante
 *     tags: [Estudiantes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - carnet
 *               - nombre
 *               - carrera
 *             properties:
 *               carnet:
 *                 type: string
 *                 example: 2024-0012U
 *               nombre:
 *                 type: string
 *                 example: Ana Gomez
 *               carrera:
 *                 type: string
 *                 example: Ingenieria en Sistemas
 *               lineaInvestigacion:
 *                 type: string
 *                 description: ID (ObjectId de Mongo) de la línea de investigación
 *                 example: 65123abc456def7890123456
 *     responses:
 *       201:
 *         description: Estudiante creado
 */
router.get("/", auth.verifyToken, ctrl.obtenerEstudiantes);
router.post("/", auth.verifyToken, ctrl.crearEstudiante);

/**
 * @swagger
 * /api/estudiantes/{id}:
 *   get:
 *     summary: Obtener un estudiante con su línea de investigación poblada (populate)
 *     tags: [Estudiantes]
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
 *         description: Estudiante con datos de la línea embebidos
 *       404:
 *         description: No encontrado
 *   put:
 *     summary: Actualizar datos de un estudiante
 *     tags: [Estudiantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               carrera:
 *                 type: string
 *               lineaInvestigacion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Actualizado
 *   delete:
 *     summary: Eliminar un estudiante
 *     tags: [Estudiantes]
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
 *         description: Eliminado
 */
router.get("/:id", auth.verifyToken, ctrl.obtenerEstudiantePorId);
router.put("/:id", auth.verifyToken, ctrl.actualizarEstudiante);
router.delete("/:id", auth.verifyToken, ctrl.eliminarEstudiante);

module.exports = router;
