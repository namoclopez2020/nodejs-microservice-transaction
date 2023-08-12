import { ITransactionRepository } from '../../Domain/Interfaces/transaction.repository.interface';
import { TransactionStatus } from '../../Domain/Constants/transaction-status.constant';
import { CreateTransactionDto } from '../Dto/create-transaction.dto';
import { Transaction } from '../../Domain/Entities/transaction.entity';

export default class CreateTransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
  ) {}

  public async execute(createTransactionDto: CreateTransactionDto): Promise<void> {
    const transaction = new Transaction({
        transactionExternalId: createTransactionDto.transactionExternalId,
        accountExternalIdDebit: createTransactionDto.accountExternalIdDebit,
        accountExternalIdCredit: createTransactionDto.accountExternalIdCredit,
        tranferTypeId: createTransactionDto.tranferTypeId,
        value: createTransactionDto.value,
        status: TransactionStatus.PENDING, 
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    console.log(transaction)
    await this.transactionRepository.save(transaction);
  }
}
