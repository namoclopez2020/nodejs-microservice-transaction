import { ITransactionRepository } from "../../../Domain/Interfaces/transaction.repository.interface";
import { TransactionResponse } from "../../../Domain/Types/transaction-response.type";
import GetTransactionQuery from "../Impl/get-transaction.query";

export class GetTransactionQueryHandler {
    constructor(
        private transactionRepository: ITransactionRepository,
    ) {}

    public async execute(
        getTransactionQuery: GetTransactionQuery
    ): Promise<TransactionResponse | null>{
        console.log(getTransactionQuery)

        const transaction = await this.transactionRepository.findById(getTransactionQuery.transactionExternalId)

        return transaction ? {
            transactionExternalId: transaction.getTransactionExternalId(),
            transactionType: {
                name: transaction.gettranferTypeId()
            },
            transactionStatus: {
                name: transaction.getStatus()
            },
            value: transaction.getValue(),
            createdAt: transaction.getCreatedAt().toDateString()
        } : null
    }
}