import { CreateTransactionDto } from "../../Dto/create-transaction.dto"
import CreateTransactionUseCase from "../../UseCases/create-transaction.use-case"
import { CreateTransactionCommand } from "../Impl/create-transaction.command"

export class CreateTransactionCommandHandler {
    constructor(
        private readonly createTransactionUseCase: CreateTransactionUseCase
    ) {}

    async execute(
        command: CreateTransactionCommand,
    ): Promise<void> {
        const transaction: CreateTransactionDto = {
            transactionExternalId: command.transactionExternalId,
            accountExternalIdDebit: command.accountExternalIdDebit,
            accountExternalIdCredit: command.accountExternalIdCredit,
            tranferTypeId: command.tranferTypeId,
            value: command.value,
        }

        await this.createTransactionUseCase.execute(transaction)

        // this.kafka.emit('transaction.created', JSON.stringify(transaction))

        console.log('created')
    }
}