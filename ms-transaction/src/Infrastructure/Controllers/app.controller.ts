import { GET, POST, route } from 'awilix-express';
import { Request, Response } from 'express';
import { validationResult, body, ValidationChain } from 'express-validator';
import { CreateTransactionCommandHandler } from '../../Application/Commands/Handler/create-transaction.handler';
import { CreateTransactionCommand } from '../../Application/Commands/Impl/create-transaction.command';
import { CreateTransactionDto } from '../../Application/Dto/Http/create-transaction.dto';
import GetTransactionQuery from '../../Application/Querys/Impl/get-transaction.query';
import { GetTransactionQueryHandler } from '../../Application/Querys/Handler/get-transaction.handler';

@route('/transactions')
export default class TransactionController {
    public constructor(
        private readonly createTransactionCommandHandler: CreateTransactionCommandHandler,
        private readonly getTransactionQueryHandler: GetTransactionQueryHandler
    ) {}

    @POST()
    public async createTransaction(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const validationRules: ValidationChain[] = [
                body('transactionExternalId').isString(),
                body('accountExternalIdDebit').isString(),
                body('accountExternalIdCredit').isString(),
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
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while creating the transaction' });
        }

        return res.status(201).json({ message: 'Transaction created successfully' });
    }

    @route('/:transactionId')
    @GET()
    public async getTransaction(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const query = new GetTransactionQuery(req.params.transactionId);
            const transaction = await this.getTransactionQueryHandler.execute(query);

            if (!transaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }

            return res.status(200).json(transaction);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while fetching the transaction' });
        }
    }
}