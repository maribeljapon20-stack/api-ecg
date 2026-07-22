const pool = require('../Config/db');
const bcrypt = require('bcryptjs');

const crearMedico = async (email, password, nombre) => {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
        'INSERT INTO medicos (email, password, nombre) VALUES ($1, $2, $3) RETURNING id, email, nombre',
        [email, hashed, nombre]
    );
    return result.rows[0];
};

const buscarPorEmail = async (email) => {
    const result = await pool.query('SELECT * FROM medicos WHERE email = $1', [email]);
    return result.rows[0];
};

module.exports = { crearMedico, buscarPorEmail };