import { IMessageHandler } from '../../Domain/Interfaces/message.handler.interface';

interface ConsumerEntry {
  topic: string;
  handler: IMessageHandler;
}

const consumerRegistry: ConsumerEntry[] = [];

export function registerConsumer(topic: string, handler: IMessageHandler): void {
  consumerRegistry.push({ topic, handler });
}

export function getConsumers(): ConsumerEntry[] {
  return consumerRegistry;
}
