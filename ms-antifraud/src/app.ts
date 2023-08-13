import { getConsumers } from "./Infrastructure/Brokers/consumer-registry";
import { KafkaService } from "./Infrastructure/Brokers/kafka.service";

async function startApp() {
  const kafkaService = new KafkaService();

  process.on('SIGINT', async () => {
    console.log('Closing Kafka consumer and disconnecting...');
    await kafkaService.closeConsumer();
    process.exit();
  });

  try {
    await kafkaService.connect();

    const consumers = getConsumers();
    for (const consumer of consumers) {
      await kafkaService.runConsumer(consumer.topic, consumer.handler);
    }
    console.log('Kafka consumer is running...');
  } catch (error) {
    console.error('Error starting Kafka consumer:', error);
  }
}

startApp();
