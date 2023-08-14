import TransactionStatusUpdatedHandler from '../../Application/MessageHandlers/transaction-status.handler';
import { registerConsumer } from './consumer-registry';
import {container} from '../Server/container';

registerConsumer('transaction.update.status', container.resolve<TransactionStatusUpdatedHandler>('TransactionStatusUpdatedHandler'));