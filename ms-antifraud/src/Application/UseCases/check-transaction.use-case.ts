import { TransactionStatus } from "../../Domain/Constants/transaction-status.constant"
import { IKafkaService } from "../../Domain/Interfaces/kafka.service.interface"
import { TransactionCreatedDto } from "../Dto/transaction-created.dto"

export class CheckTransactionUseCase {
    execute(
        transaction: TransactionCreatedDto,
        kafkaService: IKafkaService
    ): void {
        const status = transaction.value > 1000 ? TransactionStatus.APPROVED : TransactionStatus.REJECTED
        
        kafkaService.sendEvent('transaction.update.status', {
            'transactionExternalId': transaction.transactionExternalId,
            'status': status
        })
    }
}

