const medicoModel = require('../models/medicoModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registrar = async (req, res) => {
    try {
        const { email, password, nombre } = req.body;
        const medico = await medicoModel.crearMedico(email, password, nombre);
        res.status(201).json({ mensaje: 'Médico registrado', medico });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const medico = await medicoModel.buscarPorEmail(email);
        
        if (!medico) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const valido = await bcrypt.compare(password, medico.password);
        if (!valido) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: medico.id, email: medico.email },
            process.env.JWT_SECRET || 'secreto123',
            { expiresIn: '7d' }
        );

        res.json({ token, medico: { id: medico.id, email: medico.email, nombre: medico.nombre } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registrar, login };