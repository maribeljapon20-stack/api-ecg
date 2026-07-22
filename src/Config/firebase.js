const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://api-ecg-notificaciones-default-rtdb.firebaseio.com'
});

console.log('✅ Firebase inicializado correctamente');
module.exports = admin;