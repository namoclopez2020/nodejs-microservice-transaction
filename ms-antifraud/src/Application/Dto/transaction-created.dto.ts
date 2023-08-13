import { UUID } from 'crypto';

export class TransactionCreatedDto {
  readonly transactionExternalId: string;
  readonly accountExternalIdDebit: string;
  readonly accountExternalIdCredit: string;
  readonly tranferTypeId: number;
  readonly value: number;

  constructor(
      transactionExternalId: string,
      accountExternalIdDebit: string,
      accountExternalIdCredit: string,
      tranferTypeId: number,
      value: number
  ) {
      this.transactionExternalId = transactionExternalId;
      this.accountExternalIdDebit = accountExternalIdDebit;
      this.accountExternalIdCredit = accountExternalIdCredit;
      this.tranferTypeId = tranferTypeId;
      this.value = value;
  }
}
    