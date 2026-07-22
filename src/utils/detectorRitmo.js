const calcularFrecuencia = (muestras) => {
    const promedio = muestras.reduce((a, b) => a + b, 0) / muestras.length;
    const frecuencia = Math.round(40 + (promedio * 30));
    return Math.min(Math.max(frecuencia, 30), 200);
};

const analizarRitmo = (frecuencia) => {
    if (frecuencia > 100) {
        return {
            condicion: 'TAQUICARDIA',
            riesgo: frecuencia > 140 ? 'CRITICO' : 'MODERADO',
            mensaje: frecuencia > 140 ? '¡TAQUICARDIA SEVERA!' : 'Taquicardia moderada'
        };
    }
    if (frecuencia < 60) {
        return {
            condicion: 'BRADICARDIA',
            riesgo: frecuencia < 40 ? 'CRITICO' : 'MODERADO',
            mensaje: frecuencia < 40 ? '¡BRADICARDIA SEVERA!' : 'Bradicardia moderada'
        };
    }
    return {
        condicion: 'NORMAL',
        riesgo: 'BAJO',
        mensaje: 'Ritmo normal'
    };
};

module.exports = { calcularFrecuencia, analizarRitmo };