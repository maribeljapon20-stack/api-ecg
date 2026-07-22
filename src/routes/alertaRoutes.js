const express = require('express');
const router = express.Router();
const alertaController = require('../controllers/alertaController');

/**
 * @swagger
 * /api/alertas:
 *   get:
 *     summary: Obtener todas las alertas activas
 *     responses:
 *       200:
 *         description: Lista de alertas activas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alertas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       paciente_id:
 *                         type: integer
 *                       condicion:
 *                         type: string
 *                       riesgo:
 *                         type: string
 *                       mensaje:
 *                         type: string
 *                       atendida:
 *                         type: boolean
 *                       created_at:
 *                         type: string
 */
router.get('/', alertaController.listarAlertas);

/**
 * @swagger
 * /api/alertas/{id}/atender:
 *   put:
 *     summary: Marcar una alerta como atendida
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la alerta
 *     responses:
 *       200:
 *         description: Alerta atendida
 *       404:
 *         description: Alerta no encontrada
 */
router.put('/:id/atender', alertaController.atenderAlerta);

module.exports = router;