import { asClass, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import express from 'express';
import { CreateTransactionCommandHandler } from '../../Application/Commands/Handler/create-transaction.handler';
import CreateTransactionUseCase from '../../Application/UseCases/create-transaction.use-case';
import { TransactionRepository } from '../Repositories/transaction.repository';
import { KafkaService } from '../Brokers/kafka.service';
import { GetTransactionQueryHandler } from '../../Application/Querys/Handler/get-transaction.handler';

export default (app: express.Application) => {
  const container = createContainer({
    injectionMode: 'CLASSIC',
  });

  container.register({
    createTransactionCommandHandler: asClass(CreateTransactionCommandHandler).scoped(),
    createTransactionUseCase: asClass(CreateTransactionUseCase).scoped(),
    transactionRepository: asClass(TransactionRepository).scoped(),
    kafkaService: asClass(KafkaService).scoped(),
    getTransactionQueryHandler: asClass(GetTransactionQueryHandler).scoped()
  });

  app.use(scopePerRequest(container));
};
