import { UUID } from 'crypto';

export class CreateTransactionDto {
    readonly transactionExternalId: UUID;
    readonly accountExternalIdDebit: UUID;
    readonly accountExternalIdCredit: UUID;
    readonly tranferTypeId: number;
    readonly value: number;
}
