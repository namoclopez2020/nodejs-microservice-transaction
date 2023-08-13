export interface IMessageHandler {
    handleMessage(topic: string, partition: number, value: string): Promise<void>;
}