const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Registro y login de médicos
 */

/**
 * @swagger
 * /api/auth/registrar:
 *   post:
 *     summary: Registrar un nuevo médico
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: doctor@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               nombre:
 *                 type: string
 *                 example: Dr. Juan Pérez
 *     responses:
 *       201:
 *         description: Médico registrado exitosamente
 *       500:
 *         description: Error del servidor
 */
router.post('/registrar', authController.registrar);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión como médico
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: doctor@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve token JWT
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error del servidor
 */
router.post('/login', authController.login);

module.exports = router;