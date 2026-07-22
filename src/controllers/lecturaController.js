const lecturaModel = require('../models/lecturaModel');
const alertaModel = require('../models/alertaModel');
const { analizarRitmo, calcularFrecuencia } = require('../utils/detectorRitmo');
const { enviarNotificacion } = require('../utils/notificaciones');
const admin = require('../config/firebase'); // ✅ Correcto
const pool = require('../config/db');
const recibirDatos = async (req, res) => {
    try {
        const { pacienteId, muestras, tokenDispositivo } = req.body;
        
        if (!pacienteId || !muestras) {
            return res.status(400).json({ error: 'Faltan datos' });
        }

        const frecuencia = calcularFrecuencia(muestras);
        const analisis = analizarRitmo(frecuencia);

        const lectura = await lecturaModel.guardarLectura(
            pacienteId,
            frecuencia,
            analisis.condicion,
            analisis.riesgo,
            JSON.stringify({ muestras })
        );

        let alerta = null;
        if (analisis.riesgo !== 'BAJO') {
            alerta = await alertaModel.guardarAlerta(
                pacienteId,
                analisis.condicion,
                analisis.riesgo,
                analisis.mensaje
            );

            // Enviar notificación push
            if (tokenDispositivo) {
                await enviarNotificacion(
                    tokenDispositivo,
                    `🚨 ${analisis.condicion}`,
                    `Paciente ${pacienteId}: ${analisis.mensaje}`,
                    { pacienteId, condicion: analisis.condicion, riesgo: analisis.riesgo }
                );
            }
        }

        // ========== OBTENER NOMBRE DEL PACIENTE ==========
        const pacienteResult = await pool.query('SELECT nombre FROM pacientes WHERE id = $1', [pacienteId]);
        const nombrePaciente = pacienteResult.rows[0]?.nombre || `Paciente ${pacienteId}`;

        // ========== GUARDAR EN FIREBASE REALTIME DATABASE ==========
        try {
            await admin.database().ref(`lecturas/${nombrePaciente}`).push({
                frecuencia,
                condicion: analisis.condicion,
                riesgo: analisis.riesgo,
                mensaje: analisis.mensaje,
                timestamp: new Date().toISOString()
            });
            console.log(`✅ Lectura guardada en Firebase para ${nombrePaciente}`);
        } catch (firebaseError) {
            console.error('❌ Error al guardar en Firebase:', firebaseError.message);
        }

        res.json({
            lectura,
            alerta,
            frecuencia,
            condicion: analisis.condicion,
            riesgo: analisis.riesgo,
            mensaje: analisis.mensaje
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerHistorial = async (req, res) => {
    try {
        const { pacienteId } = req.params;
        const historial = await lecturaModel.obtenerHistorial(pacienteId);
        res.json({ historial });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { recibirDatos, obtenerHistorial };