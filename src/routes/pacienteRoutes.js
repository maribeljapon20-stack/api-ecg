const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
// const { verificarToken } = require('../middleware/auth');

/**
 * @swagger
 * /api/pacientes:
 *   get:
 *     summary: Listar todos los pacientes del médico
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pacientes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nombre:
 *                         type: string
 *                       edad:
 *                         type: integer
 *                       medico_id:
 *                         type: string
 *                       created_at:
 *                         type: string
 */
router.get('/', /* verificarToken, */ pacienteController.listarPacientes);

/**
 * @swagger
 * /api/pacientes:
 *   post:
 *     summary: Crear un nuevo paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "María García"
 *               edad:
 *                 type: integer
 *                 example: 68
 *     responses:
 *       201:
 *         description: Paciente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 paciente:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nombre:
 *                       type: string
 *                     edad:
 *                       type: integer
 *                     medico_id:
 *                       type: string
 *                     created_at:
 *                       type: string
 */
router.post('/', /* verificarToken, */ pacienteController.crearPaciente);

module.exports = router;