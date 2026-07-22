const pacienteModel = require('../models/pacienteModel');

const listarPacientes = async (req, res) => {
    try {
        const medico_id = req.usuario?.id || 'MED-001'; // Temporal
        const pacientes = await pacienteModel.obtenerPacientes(medico_id);
        res.json({ pacientes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crearPaciente = async (req, res) => {
    try {
        const { nombre, edad } = req.body;
        const medico_id = req.usuario?.id || 'MED-001';
        const paciente = await pacienteModel.crearPaciente(nombre, edad, medico_id);
        res.status(201).json({ paciente });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { listarPacientes, crearPaciente };