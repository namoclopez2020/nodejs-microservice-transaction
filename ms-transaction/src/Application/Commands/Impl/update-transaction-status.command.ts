import { TransactionStatus } from "../../../Domain/Constants/transaction-status.constant";

export class UpdateTransactionStatusCommand {
    constructor(
      public readonly transactionExternalId: string,
      public readonly status: TransactionStatus,
    ) {}
  }