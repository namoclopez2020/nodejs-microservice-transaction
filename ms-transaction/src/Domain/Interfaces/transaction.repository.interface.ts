import { Transaction } from '../Entities/transaction.entity'

export interface ITransactionRepository {
  save(transaction: Transaction): void;
  update(transaction: Transaction): void;
  findById(transactionExternalId: string): Promise<Transaction | null>;
}
