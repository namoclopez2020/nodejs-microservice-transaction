import { TransactionCreatedDto } from "../../../../src/Application/Dto/transaction-created.dto";
import { CheckTransactionUseCase } from "../../../../src/Application/UseCases/check-transaction.use-case";
import { TransactionStatus } from "../../../../src/Domain/Constants/transaction-status.constant";
import { IKafkaService } from "../../../../src/Domain/Interfaces/kafka.service.interface";
import { createMockKafkaService } from "../create-mock-kafka.service";
import { v4 as uuidv4 } from 'uuid';

describe('CheckTransactionUseCase', () => {
  it('should send event with status APPROVED if transaction value is greater than 1000', () => {
    const kafkaServiceMock = createMockKafkaService();

    const useCase = new CheckTransactionUseCase();

    const transaction = new TransactionCreatedDto(
        uuidv4(),
        uuidv4(),
        uuidv4(),
        1,
        1500
    );


    useCase.execute(transaction, kafkaServiceMock);

    // Assert
    expect(kafkaServiceMock.sendEvent).toHaveBeenCalledWith('transaction.update.status', {
      transactionExternalId: transaction.transactionExternalId,
      status: TransactionStatus.APPROVED,
    });
  });

  it('should send event with status REJECTED if transaction value is lower than 1000', () => {
    const kafkaServiceMock = createMockKafkaService();

    const useCase = new CheckTransactionUseCase();

    const transaction = new TransactionCreatedDto(
        uuidv4(),
        uuidv4(),
        uuidv4(),
        1,
        800
    );


    useCase.execute(transaction, kafkaServiceMock);

    expect(kafkaServiceMock.sendEvent).toHaveBeenCalledWith('transaction.update.status', {
      transactionExternalId: transaction.transactionExternalId,
      status: TransactionStatus.REJECTED,
    });
  });
});
