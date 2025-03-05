// config/kafkaConfig.js

const kafkaConfig = {
    clientId: 'marcacion-service',
    brokers: [process.env.KAFKA_BROKER], // Usa la variable de entorno o un valor por defecto
  };

  module.exports = kafkaConfig;