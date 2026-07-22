const alertaModel = require('../models/alertaModel');

const listarAlertas = async (req, res) => {
    try {
        const alertas = await alertaModel.obtenerAlertasActivas();
        res.json({ alertas });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const atenderAlerta = async (req, res) => {
    try {
        const { id } = req.params;
        const alerta = await alertaModel.marcarAtendida(id);
        res.json({ alerta });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { listarAlertas, atenderAlerta };