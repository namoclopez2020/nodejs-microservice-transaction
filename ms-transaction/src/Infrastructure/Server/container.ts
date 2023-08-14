import { asClass, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import express from 'express';
import { CreateTransactionCommandHandler } from '../../Application/Commands/Handler/create-transaction.handler';
import CreateTransactionUseCase from '../../Application/UseCases/create-transaction.use-case';
import { TransactionRepository } from '../Repositories/transaction.repository';
import { KafkaService } from '../Brokers/kafka.service';
import { GetTransactionQueryHandler } from '../../Application/Querys/Handler/get-transaction.handler';
import TransactionStatusUpdatedHandler from '../../Application/MessageHandlers/transaction-status.handler';
import { UpdateTransactionStatusCommandHandler } from '../../Application/Commands/Handler/update-transaction-status.handler';
import UpdateTransactionStatusUseCase from '../../Application/UseCases/update-transaction.use-case';

const container = createContainer({
  injectionMode: 'CLASSIC',
});

container.register({
  createTransactionCommandHandler: asClass(CreateTransactionCommandHandler).scoped(),
  createTransactionUseCase: asClass(CreateTransactionUseCase).scoped(),
  transactionRepository: asClass(TransactionRepository).scoped(),
  kafkaService: asClass(KafkaService).scoped(),
  getTransactionQueryHandler: asClass(GetTransactionQueryHandler).scoped(),
  TransactionStatusUpdatedHandler: asClass(TransactionStatusUpdatedHandler).scoped(),
  updateTransactionStatusCommandHandler: asClass(UpdateTransactionStatusCommandHandler).scoped(),
  updateTransactionStatusUseCase: asClass(UpdateTransactionStatusUseCase).scoped()
});

export {container};

export default (app: express.Application) => {
  app.use(scopePerRequest(container));
};
