const amqp = require('amqplib');

class RabbitMQPublisher {
  constructor() {
    this.queue = 'usuarios';
  }

  async connect() {
    this.connection = await amqp.connect(process.env.RABBITMQ_URL);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue, { durable: true });
  }

  async publish(message) {
    if (!this.channel) await this.connect();
    console.log('Message published:', message);
    this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(message)), { persistent: true });
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }
}

module.exports = RabbitMQPublisher;
