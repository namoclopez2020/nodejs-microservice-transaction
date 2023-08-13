import { IKafkaService } from "../../../src/Domain/Interfaces/kafka.service.interface";
import { IMessageHandler } from "../../../src/Domain/Interfaces/message.handler.interface";

export const createMockKafkaService = (): IKafkaService => {
  return {
    connect: jest.fn(),
    runConsumer: jest.fn((topic: string, messageHandler: IMessageHandler) => Promise.resolve()),
    sendEvent: jest.fn((topic: string, message: object) => Promise.resolve()),
    closeConsumer: jest.fn(),
  };
};
