const pool = require('../Config/db');

const guardarLectura = async (paciente_id, frecuencia, condicion, riesgo, datos) => {
    const result = await pool.query(
        'INSERT INTO lecturas (paciente_id, frecuencia, condicion, riesgo, datos) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [paciente_id, frecuencia, condicion, riesgo, datos]
    );
    return result.rows[0];
};

const obtenerHistorial = async (paciente_id, limite = 10) => {
    const result = await pool.query(
        'SELECT * FROM lecturas WHERE paciente_id = $1 ORDER BY created_at DESC LIMIT $2',
        [paciente_id, limite]
    );
    return result.rows;
};

module.exports = { guardarLectura, obtenerHistorial };