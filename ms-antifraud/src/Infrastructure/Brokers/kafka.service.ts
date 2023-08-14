import { Kafka, Consumer, EachMessagePayload, Partitioners } from 'kafkajs';
import envConfig from '../Config/config';
import '../Brokers/register-consumer.container';
import { IMessageHandler } from '../../Domain/Interfaces/message.handler.interface';
import { IKafkaService } from '../../Domain/Interfaces/kafka.service.interface';

export class KafkaService implements IKafkaService {
    private kafka: Kafka;
    private consumer: Consumer;

    constructor() {
        this.kafka = new Kafka({
        clientId: 'my-app-consumer',
        brokers: [envConfig.KAFKA_BROKER],
        });

        this.consumer = this.kafka.consumer({ groupId: 'test-group' });
    }

    async connect(): Promise<void> {
        await this.consumer.connect();
    }

    async runConsumer(topic: string, messageHandler: IMessageHandler): Promise<void> {
        await this.consumer.subscribe({ topic:'transaction.created', fromBeginning: true });

        await this.consumer.run({
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

    async closeConsumer(): Promise<void> {
        await this.consumer.disconnect();
    }
}