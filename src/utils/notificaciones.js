const admin = require('../Config/firebase');

const enviarNotificacion = async (token, titulo, cuerpo, datos = {}) => {
    try {
        const mensaje = {
            notification: {
                title: titulo,
                body: cuerpo
            },
            data: {
                pacienteId: String(datos.pacienteId || ''),
                condicion: String(datos.condicion || ''),
                riesgo: String(datos.riesgo || '')
            },
            token: token
        };

        const response = await admin.messaging().send(mensaje);
        console.log('✅ Notificación enviada:', response);
        return response;
    } catch (error) {
        console.error('❌ Error al enviar notificación:', error);
        throw error;
    }
};

module.exports = { enviarNotificacion };