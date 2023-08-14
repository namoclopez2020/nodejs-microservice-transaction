import TransactionCreatedMessageHandler from '../../Application/MessageHandlers/transaction-created.handler';
import {KafkaService} from '../../Infrastructure/Brokers/kafka.service';
import { CheckTransactionUseCase } from '../../Application/UseCases/check-transaction.use-case';
import { registerConsumer } from './consumer-registry';

registerConsumer('transaction.created', new TransactionCreatedMessageHandler(new CheckTransactionUseCase()));
