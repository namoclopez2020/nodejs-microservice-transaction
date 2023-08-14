import { IMessageHandler } from "../../Domain/Interfaces/message.handler.interface";
import { KafkaService } from "../../Infrastructure/Brokers/kafka.service";
import { TransactionCreatedDto } from "../Dto/transaction-created.dto";
import { CheckTransactionUseCase } from "../UseCases/check-transaction.use-case";

class TransactionCreatedMessageHandler implements IMessageHandler{
    private checkTransactionUseCase: CheckTransactionUseCase;

    constructor(checkTransactionUseCase: CheckTransactionUseCase) {
        this.checkTransactionUseCase = checkTransactionUseCase;
    }
    
    async handleMessage(topic: string, partition: number, value: string): Promise<void> {
      console.log(`Handling message microservice from topic ${topic}, partition ${partition}: ${value}`);

      const transactionCreated: TransactionCreatedDto = JSON.parse(value)
      const kafkaService = new KafkaService()
      this.checkTransactionUseCase.execute(transactionCreated, kafkaService)
    }
}
  
export default TransactionCreatedMessageHandler;
  