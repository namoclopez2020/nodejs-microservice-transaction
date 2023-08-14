import { UpdateTransactionStatusDto } from "../../Dto/update-transaction.dto"
import UpdateTransactionStatusUseCase from "../../UseCases/update-transaction.use-case"
import { UpdateTransactionStatusCommand } from "../Impl/update-transaction-status.command"

export class UpdateTransactionStatusCommandHandler {
    constructor(
        private updateTransactionStatusUseCase: UpdateTransactionStatusUseCase,
    ) {}

    async execute(
        command: UpdateTransactionStatusCommand,
    ): Promise<void> {
        const updateTransactionStatusDto: UpdateTransactionStatusDto = {
            transactionExternalId: command.transactionExternalId,
            status: command.status
        }

        console.log('pasando repositorio actualizar')
        await this.updateTransactionStatusUseCase.execute(updateTransactionStatusDto)
    }
}