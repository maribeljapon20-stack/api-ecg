const express = require('express');
const cors = require('cors');
const app = express();
const admin = require('./src/config/firebase.js');
const PORT = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger.js');

// ========== CORS ==========
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
const authRoutes = require('./src/routes/authRoutes.js');
const pacienteRoutes = require('./src/routes/pacienteRoutes.js');
const lecturaRoutes = require('./src/routes/lecturaRoutes.js');
const alertaRoutes = require('./src/routes/alertaRoutes.js');
const reporteRoutes = require('./src/routes/reporteRoutes.js');

app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/lecturas', lecturaRoutes);
app.use('/api/alertas', alertaRoutes);
app.use('/api/reportes', reporteRoutes);

app.get('/', (req, res) => {
    res.json({ mensaje: 'API ECG funcionando' });
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
    console.log(`📚 Swagger en http://localhost:${PORT}/api-docs`);
});