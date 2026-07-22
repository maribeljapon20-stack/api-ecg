const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API ECG - Monitoreo Cardíaco',
            version: '1.0.0',
            description: 'API para monitoreo de ritmo cardíaco con detección de taquicardia y bradicardia',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local',
            },
        ],
        tags: [
            {
                name: 'ECG API',
                description: 'Endpoints del sistema de monitoreo cardíaco'
            },
            {
                name: 'Autenticación',
                description: 'Registro y login de médicos'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);