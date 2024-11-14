const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'markings-service',
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

const publishMarkingEvent = async (markingData) => {
  try {
    const id = markingData.id;
    const userId = markingData.userId;
    
    // Obtener el año
    const anio = new Date(markingData.date).getFullYear();
    
    // Obtener el mes (0-11)
    const mes = new Date(markingData.date).getMonth() + 1; // Sumamos 1 porque los meses empiezan en 0

    // Obtener el día del mes (1-31)
    const dia = new Date(markingData.date).getDate();


    let horaInicio = '';
    let horaInicio1 = '';
    let horaFin = '';
    let horaFin1 = '';

    switch(markingData.type){
        case 'entry': horaInicio = new Date(markingData.date).getHours(); break;
        case 'entry1': horaInicio1 = new Date(markingData.date).getHours(); break;
        case 'exit': horaFin = new Date(markingData.date).getHours(); break;
        case 'ext1': horaFin1 = new Date(markingData.date).getHours(); break;
        default: break;
    }

    const location = markingData.location;
    const idEmpresa = markingData.idEmpresa;
    const idPersona = markingData.idEmpresa;
    const createdBy = markingData.createdBy;
    const result = await producer.send({
      topic: 'marking-events',
      messages: [
        {
          value: JSON.stringify({id, userId, anio, mes, dia, horaInicio, horaInicio1, horaFin, horaFin1, location, idEmpresa, idPersona, createdBy}),
        },
      ],
    });
    console.log('Evento de marcación publicado:', markingData);
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

module.exports = { startProducer, publishMarkingEvent, shutdownProducer };