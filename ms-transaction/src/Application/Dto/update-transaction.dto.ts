import { TransactionStatus } from "../../Domain/Constants/transaction-status.constant";

export class UpdateTransactionStatusDto {
    readonly transactionExternalId: string;
    readonly status: TransactionStatus;
}