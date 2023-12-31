import { Kafka, Partitioners } from 'kafkajs';
import envConfig from '../Server/config';
import { IKafkaService } from '../../Domain/Interfaces/kafka.service.interface';
import { IMessageHandler } from '../../Domain/Interfaces/message.handler.interface';

export class KafkaService implements IKafkaService {
    private kafka: Kafka;

    constructor() {
        this.kafka = new Kafka({
            clientId: 'my-app',
            brokers: [envConfig.KAFKA_BROKER],
        });
    }

    async sendEvent(topic: string, message: object): Promise<void> {
        const producer = this.kafka.producer();
        await producer.connect();

        await producer.send({
            topic,
            messages: [
                { value: JSON.stringify(message) },
            ],
        });

        await producer.disconnect();
    }

    async runConsumer(topic: string, messageHandler: IMessageHandler): Promise<void> {
        const consumer = this.kafka.consumer({ groupId: 'test-group' });

        await consumer.connect();
        await consumer.subscribe({ topic, fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                if (message.value !== null) {
                    const value = message.value.toString();
                    console.log(`Received message from topic ${topic}, partition ${partition}: ${value}`);

                    await messageHandler.handleMessage(topic, partition, value)
                } else {
                    console.log(`Received null message from topic ${topic}, partition ${partition}`);
                }
            },
        });
    }

    async closeConnection(): Promise<void> {
        await this.kafka.consumer({ groupId: 'test-group' }).disconnect();
    }
}
