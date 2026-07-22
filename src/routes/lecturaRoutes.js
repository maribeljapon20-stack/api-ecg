const express = require('express');
const router = express.Router();
const lecturaController = require('../controllers/lecturaController');

/**
 * @swagger
 * /api/lecturas:
 *   post:
 *     summary: Enviar datos del sensor ECG
 *     tags: [ECG API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pacienteId:
 *                 type: integer
 *                 example: 1
 *               muestras:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [3.5, 3.8, 4.1, 4.5, 4.0, 3.7, 3.9, 4.3, 4.6, 4.2]
 *     responses:
 *       200:
 *         description: Datos procesados correctamente
 *       400:
 *         description: Faltan datos
 *       500:
 *         description: Error del servidor
 */
router.post('/', lecturaController.recibirDatos);

/**
 * @swagger
 * /api/lecturas/historial/{pacienteId}:
 *   get:
 *     summary: Obtener historial de lecturas de un paciente
 *     tags: [ECG API]
 *     parameters:
 *       - in: path
 *         name: pacienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del paciente
 *     responses:
 *       200:
 *         description: Historial del paciente
 *       404:
 *         description: Paciente no encontrado
 */
router.get('/historial/:pacienteId', lecturaController.obtenerHistorial);

module.exports = router;