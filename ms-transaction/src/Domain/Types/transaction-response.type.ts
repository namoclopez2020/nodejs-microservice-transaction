type TransactionType = {
    name: number;
};

type TransactionStatus = {
    name: string;
};

export type TransactionResponse = {
    transactionExternalId: string;
    transactionType: TransactionType;
    transactionStatus: TransactionStatus;
    value: number;
    createdAt: string;
};
