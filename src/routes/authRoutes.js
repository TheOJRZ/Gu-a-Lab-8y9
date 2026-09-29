const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { validateResult } = require('../middlewares/validateMiddleware');

const registerRules = [
  check('nombre', 'El nombre es obligatorio').notEmpty().trim(),
  check('email', 'El correo electrónico no tiene un formato válido').isEmail().normalizeEmail(),
  check('password', 'La contraseña debe tener mínimo 8 caracteres').isLength({ min: 8 })
];

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - password
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan Perez
 *               email:
 *                 type: string
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en validación o usuario existente
 */
router.post('/register', registerRules, validateResult, authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Token generado exitosamente
 *       400:
 *         description: Credenciales inválidas
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del perfil del usuario
 *       401:
 *         description: No autorizado o token inválido
 */
router.get('/profile', verifyToken, authController.getProfile);

module.exports = router;