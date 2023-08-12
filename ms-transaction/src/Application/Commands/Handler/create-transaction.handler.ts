import { IKafkaService } from "../../../Domain/Interfaces/kafka.service.interface"
import { CreateTransactionDto } from "../../Dto/create-transaction.dto"
import CreateTransactionUseCase from "../../UseCases/create-transaction.use-case"
import { CreateTransactionCommand } from "../Impl/create-transaction.command"

export class CreateTransactionCommandHandler {
    constructor(
        private readonly createTransactionUseCase: CreateTransactionUseCase,
        private readonly kafkaService: IKafkaService
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

        await this.kafkaService.sendEvent('transaction.created', transaction);
    }
}