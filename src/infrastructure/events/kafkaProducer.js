const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'marcacions-service',
  brokers: ['localhost:29092'], // Cambiado a 29092 para coincidir con el docker-compose
});

const producer = kafka.producer();

const startProducer = async () => {
  try {
    await producer.connect();
    console.log('Kafka Producer conectado');
  } catch (error) {
    console.error('Error al conectar el productor Kafka:', error);
    throw error; // Re-lanza el error para manejarlo en el llamador
  }
};

const publishMarcacionEvent = async (marcacionData) => {
  try {
    const id = marcacionData.id;
    const usuarioId = marcacionData.usuarioId;
    
    // Obtener el año
    const anio = new Date(marcacionData.fecha).getFullYear();
    
    // Obtener el mes (0-11)
    const mes = new Date(marcacionData.fecha).getMonth() + 1; // Sumamos 1 porque los meses empiezan en 0

    // Obtener el día del mes (1-31)
    const dia = new Date(marcacionData.fecha).getDate();


    let horaInicio = '';
    let horaInicio1 = '';
    let horaFin = '';
    let horaFin1 = '';
    switch(marcacionData.tipo) {
      case 'entry': 
          horaInicio = `${new Date(marcacionData.fecha).getHours().toString().padStart(2, '0')}:${new Date(marcacionData.fecha).getMinutes().toString().padStart(2, '0')}`;
          break;
      case 'salidacomida': 
          horaInicio1 = `${new Date(marcacionData.fecha).getHours().toString().padStart(2, '0')}:${new Date(marcacionData.fecha).getMinutes().toString().padStart(2, '0')}`;
          break;
      case 'entradacomida': 
          horaFin = `${new Date(marcacionData.fecha).getHours().toString().padStart(2, '0')}:${new Date(marcacionData.fecha).getMinutes().toString().padStart(2, '0')}`;
          break;
      case 'exit': 
          horaFin1 = `${new Date(marcacionData.fecha).getHours().toString().padStart(2, '0')}:${new Date(marcacionData.fecha).getMinutes().toString().padStart(2, '0')}`;
          break;
      default: 
          break;
  }

    const localizacion = marcacionData.localizacion;
    const empresaId = marcacionData.empresaId;
    const empleadoId = marcacionData.empleadoId;
    const personaId = marcacionData.personaId;
    const createdBy = marcacionData.createdBy;
    const result = await producer.send({
      topic: 'marcacion-events',
      messages: [
        {
          value: JSON.stringify({id, usuarioId, empleadoId, anio, mes, dia, horaInicio, horaInicio1, horaFin, horaFin1, localizacion, empresaId, personaId, createdBy}),
        },
      ],
    });
    console.log('Evento de marcación publicado:', marcacionData);
    return result; // Retorna el resultado de la operación de envío
  } catch (error) {
    console.error('Error al publicar el evento:', error);
    throw error; // Re-lanza el error para manejarlo en el llamador
  }
};

const shutdownProducer = async () => {
  try {
    await producer.disconnect();
    console.log('Kafka Producer desconectado');
  } catch (error) {
    console.error('Error al desconectar el productor Kafka:', error);
  }
};

module.exports = { startProducer, publishMarcacionEvent, shutdownProducer };