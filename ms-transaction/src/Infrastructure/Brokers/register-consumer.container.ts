import TransactionStatusUpdatedHandler from '../../Application/MessageHandlers/transaction-status.handler';
import { registerConsumer } from './consumer-registry';

registerConsumer('transaction.updated', new TransactionStatusUpdatedHandler());