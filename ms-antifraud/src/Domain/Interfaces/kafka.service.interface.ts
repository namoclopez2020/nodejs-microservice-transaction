import { IMessageHandler } from "./message.handler.interface";

export interface IKafkaService {
    connect(): Promise<void>
    runConsumer(topic: string, messageHandler: IMessageHandler): Promise<void>
    sendEvent(topic: string, message: object): Promise<void>
    closeConsumer(): Promise<void>
}