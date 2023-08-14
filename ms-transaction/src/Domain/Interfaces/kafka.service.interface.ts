import { IMessageHandler } from "./message.handler.interface";

export interface IKafkaService {
    sendEvent(topic: string, message: object): Promise<void>;
    runConsumer(topic: string, messageHandler: IMessageHandler): Promise<void>
    closeConnection(): Promise<void>
}