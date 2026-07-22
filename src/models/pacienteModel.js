const pool = require('../Config/db');

const crearPaciente = async (nombre, edad, medico_id) => {
    const result = await pool.query(
        'INSERT INTO pacientes (nombre, edad, medico_id) VALUES ($1, $2, $3) RETURNING *',
        [nombre, edad, medico_id]
    );
    return result.rows[0];
};

const obtenerPacientes = async (medico_id) => {
    const result = await pool.query(
        'SELECT * FROM pacientes WHERE medico_id = $1 ORDER BY id DESC',
        [medico_id]
    );
    return result.rows;
};

const obtenerPacientePorId = async (id) => {
    const result = await pool.query('SELECT * FROM pacientes WHERE id = $1', [id]);
    return result.rows[0];
};

module.exports = { crearPaciente, obtenerPacientes, obtenerPacientePorId };