import { ITransactionRepository } from '../../Domain/Interfaces/transaction.repository.interface';
import { Transaction as TransactionEntity} from '../../Domain/Entities/transaction.entity';
import { UUID } from 'crypto';
import { Transaction } from './Entities/transaction.entity';
import myDataSource from './dataSources/data-source';

export class TransactionRepository implements ITransactionRepository {
    async save(transaction: TransactionEntity): Promise<void> 
    {
        await myDataSource.getRepository(Transaction).save({
            transactionExternalId: transaction.getTransactionExternalId(),
            accountExternalIdDebit: transaction.getAccountExternalIdDebit(),
            accountExternalIdCredit: transaction.getAccountExternalIdCredit(),
            tranferTypeId: transaction.gettranferTypeId(),
            value: transaction.getValue(),
            status: transaction.getStatus(),
            createdAt: transaction.getCreatedAt(),
            updatedAt: transaction.getUpdatedAt()
        });
    }

    async update(transaction: TransactionEntity): Promise<void> 
    {
        await myDataSource.getRepository(Transaction).update(
            { transactionExternalId: transaction.getTransactionExternalId() },
            {
                accountExternalIdDebit: transaction.getAccountExternalIdDebit(),
                accountExternalIdCredit: transaction.getAccountExternalIdCredit(),
                tranferTypeId: transaction.gettranferTypeId(),
                value: transaction.getValue(),
                status: transaction.getStatus(),
                updatedAt: transaction.getUpdatedAt() 
            },
        );
    }

    async findById(transactionExternalId: UUID): Promise<TransactionEntity | null> 
    {
        const transaction = await myDataSource.getRepository(Transaction).findOne({
            where: { transactionExternalId: transactionExternalId },
        });

        return transaction ? new TransactionEntity({
            transactionExternalId: transaction.transactionExternalId,
            accountExternalIdDebit: transaction.accountExternalIdDebit,
            accountExternalIdCredit: transaction.accountExternalIdCredit,
            value: transaction.value,
            status: transaction.status,
            tranferTypeId: transaction.tranferTypeId,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt
        }) : null;
    }
}
