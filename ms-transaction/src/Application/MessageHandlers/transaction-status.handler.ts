import { IMessageHandler } from "../../Domain/Interfaces/message.handler.interface";
import { UpdateTransactionStatusCommandHandler } from "../Commands/Handler/update-transaction-status.handler";
import { UpdateTransactionStatusCommand } from "../Commands/Impl/update-transaction-status.command";

class TransactionStatusUpdatedHandler implements IMessageHandler{
    constructor(
      private readonly updateTransactionStatusCommandHandler: UpdateTransactionStatusCommandHandler
    ){}
    async handleMessage(topic: string, partition: number, value: string): Promise<void> {
      console.log(`Handling message from topic ${topic}, partition ${partition}: ${value}`);
      console.log('updating')

      const message = JSON.parse(value)
      const updateStatusCommand = new UpdateTransactionStatusCommand(
        message.transactionExternalId,
        message.status
      )

      await this.updateTransactionStatusCommandHandler.execute(updateStatusCommand)
    }
}
  
export default TransactionStatusUpdatedHandler;
  