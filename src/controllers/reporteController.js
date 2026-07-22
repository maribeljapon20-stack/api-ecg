const PDFDocument = require('pdfkit');
const pool = require('../src/config/db.js');

const generarReporte = async (req, res) => {
    try {
        const { pacienteId } = req.params;

        // Obtener datos del paciente
        const pacienteResult = await pool.query(
            'SELECT * FROM pacientes WHERE id = $1',
            [pacienteId]
        );

        if (pacienteResult.rows.length === 0) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }

        const paciente = pacienteResult.rows[0];

        // Obtener historial de lecturas
        const lecturasResult = await pool.query(
            'SELECT * FROM lecturas WHERE paciente_id = $1 ORDER BY created_at DESC LIMIT 20',
            [pacienteId]
        );

        const lecturas = lecturasResult.rows;

        // Crear PDF
        const doc = new PDFDocument({ margin: 50 });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=reporte_${paciente.nombre}.pdf`);

        doc.pipe(res);

        // Título
        doc.fontSize(20).text('Reporte de Monitoreo Cardíaco', { align: 'center' });
        doc.moveDown();

        // Datos del paciente
        doc.fontSize(14).text(`Paciente: ${paciente.nombre}`);
        doc.text(`Edad: ${paciente.edad} años`);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`);
        doc.moveDown();

        // Resumen
        doc.fontSize(16).text('Resumen de Lecturas', { underline: true });
        doc.moveDown();

        if (lecturas.length === 0) {
            doc.text('No hay lecturas registradas para este paciente.');
        } else {
            // Tabla de lecturas
            lecturas.forEach((lectura, index) => {
                doc.fontSize(12).text(
                    `${index + 1}. Fecha: ${new Date(lectura.created_at).toLocaleString()} | ` +
                    `Frecuencia: ${lectura.frecuencia} BPM | ` +
                    `Condición: ${lectura.condicion} | ` +
                    `Riesgo: ${lectura.riesgo}`
                );
            });

            doc.moveDown();

            // Estadísticas
            const frecuencias = lecturas.map(l => l.frecuencia);
            const promedio = frecuencias.reduce((a, b) => a + b, 0) / frecuencias.length;
            const max = Math.max(...frecuencias);
            const min = Math.min(...frecuencias);

            doc.fontSize(14).text('Estadísticas:', { underline: true });
            doc.fontSize(12).text(`Frecuencia promedio: ${promedio.toFixed(1)} BPM`);
            doc.text(`Frecuencia máxima: ${max} BPM`);
            doc.text(`Frecuencia mínima: ${min} BPM`);
        }

        doc.end();

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { generarReporte };