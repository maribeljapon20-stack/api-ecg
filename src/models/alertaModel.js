const pool = require('../src/config/db.js');

const guardarAlerta = async (paciente_id, condicion, riesgo, mensaje) => {
    const result = await pool.query(
        'INSERT INTO alertas (paciente_id, condicion, riesgo, mensaje) VALUES ($1, $2, $3, $4) RETURNING *',
        [paciente_id, condicion, riesgo, mensaje]
    );
    return result.rows[0];
};

const obtenerAlertasActivas = async () => {
    const result = await pool.query(
        'SELECT * FROM alertas WHERE atendida = false ORDER BY created_at DESC'
    );
    return result.rows;
};

const marcarAtendida = async (id) => {
    const result = await pool.query(
        'UPDATE alertas SET atendida = true WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};

module.exports = { guardarAlerta, obtenerAlertasActivas, marcarAtendida };