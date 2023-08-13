import { IMessageHandler } from "../../Domain/Interfaces/message.handler.interface";

class TransactionStatusUpdatedHandler implements IMessageHandler{
    async handleMessage(topic: string, partition: number, value: string): Promise<void> {
      console.log(`Handling message from topic ${topic}, partition ${partition}: ${value}`);
    }
}
  
export default TransactionStatusUpdatedHandler;
  