import { POST, route } from 'awilix-express';
import { Request, Response } from 'express';
import { validationResult, body, ValidationChain } from 'express-validator';
import { CreateTransactionCommandHandler } from '../../Application/Commands/Handler/create-transaction.handler';
import { CreateTransactionCommand } from '../../Application/Commands/Impl/create-transaction.command';
import { CreateTransactionDto } from '../../Application/Dto/Http/create-transaction.dto';

@route('/transactions')
export default class TransactionController {
    public constructor(
        private readonly createTransactionCommandHandler: CreateTransactionCommandHandler
    ) {}

    @POST()
    public async createTransaction(
        req: Request,
        res: Response
    ): Promise<any> {
        try {
            const validationRules: ValidationChain[] = [
                body('transactionExternalId').isUUID(),
                body('accountExternalIdDebit').isUUID(),
                body('accountExternalIdCredit').isUUID(),
                body('tranferTypeId').isInt(),
                body('value').isNumeric(),
            ];

            await Promise.all(validationRules.map(rule => rule.run(req)));

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const bodyParsed: CreateTransactionDto = req.body;

            const newTransaction = new CreateTransactionCommand(
                bodyParsed.transactionExternalId,
                bodyParsed.accountExternalIdDebit,
                bodyParsed.accountExternalIdCredit,
                bodyParsed.tranferTypeId,
                bodyParsed.value
            );

            await this.createTransactionCommandHandler.execute(newTransaction);

            res.status(201).json({ message: 'Transaction created successfully' });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while creating the transaction' });
        }
    }
}
