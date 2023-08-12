export interface IKafkaService {
    sendEvent(topic: string, message: object): Promise<void>;
}