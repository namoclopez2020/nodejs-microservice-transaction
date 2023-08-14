import { TransactionStatus } from '../Constants/transaction-status.constant';

export type TransactionProperties = {
    readonly transactionExternalId: string,
    readonly accountExternalIdDebit: string,
    readonly accountExternalIdCredit: string,
    readonly tranferTypeId: number,
    readonly value: number,
    readonly status: TransactionStatus,
    readonly createdAt: Date,
    readonly updatedAt: Date,
};

export class Transaction {
    private readonly transactionExternalId: string
    private readonly accountExternalIdDebit: string
    private readonly accountExternalIdCredit: string
    private readonly tranferTypeId: number
    private readonly value: number
    private readonly status: TransactionStatus
    private readonly createdAt: Date
    private readonly updatedAt: Date

    constructor(properties: TransactionProperties) {
        Object.assign(this, properties);
    }

    getTransactionExternalId(): string {
        return this.transactionExternalId;
    }

    getStatus(): TransactionStatus {
        return this.status;
    }

    getAccountExternalIdDebit(): string {
        return this.accountExternalIdDebit;
    }

    getAccountExternalIdCredit(): string {
        return this.accountExternalIdCredit;
    }

    gettranferTypeId(): number {
        return this.tranferTypeId;
    }

    getValue(): number {
        return this.value;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }
}
