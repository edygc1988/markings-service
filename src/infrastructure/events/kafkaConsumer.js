const { Kafka } = require('kafkajs');

// Importa los casos de uso
const RegistrarEmpleado = require('../../application/use-cases/registrarEmpleadoUseCase');

// Importa los repositorios
const EmpleadoRepository = require('../../domain/repositories/empleadoRepository');

// Importa los modelos de base de datos
const { EmpleadoModel } = require('../database/sequelize');

// Configuración de Kafka
const kafkaConfig = require('../../config/kafkaConfig');
const kafka = new Kafka(kafkaConfig);


// Instancia los repositorios
const empleadoRepository = new EmpleadoRepository({ EmpleadoModel });

// Instancia los casos de uso
const registerEmpleadoUseCase = new RegistrarEmpleado(empleadoRepository);

class KafkaConsumerService {
  constructor() {
    this.consumer = kafka.consumer({ groupId: 'marcacion-group' });
    this.registerEmpleadoUseCase = registerEmpleadoUseCase;
  }

  async start() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'empleado-events', fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const data = JSON.parse(message.value.toString());
        await this.processEmpleadoEvent(data);
      }
    });
  }

  async processEmpleadoEvent(data) {
    await this.registerEmpleadoUseCase.execute(data);
  }

  async stop() {
    await this.consumer.disconnect();
  }
}

module.exports = KafkaConsumerService;
