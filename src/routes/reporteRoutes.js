const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');

/**
 * @swagger
 * /api/reportes/{pacienteId}:
 *   get:
 *     summary: Generar reporte PDF de un paciente
 *     parameters:
 *       - in: path
 *         name: pacienteId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: PDF generado exitosamente
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get('/:pacienteId', reporteController.generarReporte);

module.exports = router;