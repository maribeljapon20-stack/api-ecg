const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/readings', async (req, res) => {
    try {
        const { pacienteId, muestras } = req.body;
        
        if (!pacienteId || !muestras) {
            return res.status(400).json({ 
                error: 'Faltan datos: pacienteId y muestras son requeridos' 
            });
        }

        if (!Array.isArray(muestras) || muestras.length === 0) {
            return res.status(400).json({ 
                error: 'muestras debe ser un arreglo no vacío' 
            });
        }

        const promedio = muestras.reduce((a, b) => a + b, 0) / muestras.length;
        const frecuencia = Math.round(40 + (promedio * 30));
        const frecuenciaFinal = Math.min(Math.max(frecuencia, 30), 200);

        let condicion = 'NORMAL';
        let riesgo = 'BAJO';
        let mensaje = 'Ritmo normal';

        if (frecuenciaFinal > 100) {
            condicion = 'TAQUICARDIA';
            riesgo = frecuenciaFinal > 140 ? 'CRITICO' : 'MODERADO';
            mensaje = frecuenciaFinal > 140 ? '¡TAQUICARDIA SEVERA!' : 'Taquicardia moderada';
        } else if (frecuenciaFinal < 60) {
            condicion = 'BRADICARDIA';
            riesgo = frecuenciaFinal < 40 ? 'CRITICO' : 'MODERADO';
            mensaje = frecuenciaFinal < 40 ? '¡BRADICARDIA SEVERA!' : 'Bradicardia moderada';
        }

        // Guardar en BD
        const result = await pool.query(
            'INSERT INTO lecturas (paciente_id, frecuencia, condicion, riesgo, datos) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [pacienteId, frecuenciaFinal, condicion, riesgo, JSON.stringify({ muestras, promedio })]
        );

        let alertaGuardada = null;
        if (riesgo !== 'BAJO') {
            const alertaResult = await pool.query(
                'INSERT INTO alertas (paciente_id, condicion, riesgo, mensaje) VALUES ($1, $2, $3, $4) RETURNING id',
                [pacienteId, condicion, riesgo, mensaje]
            );
            alertaGuardada = { id: alertaResult.rows[0].id, mensaje };
        }

        res.json({
            pacienteId,
            frecuencia: frecuenciaFinal,
            condicion,
            riesgo,
            mensaje,
            alerta: alertaGuardada ? '🚨 ALERTA GENERADA' : '✅ Sin alertas',
            lectura_id: result.rows[0].id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Error interno',
            detalle: error.message 
        });
    }
});

module.exports = router;