import { Request, Response } from 'express';
import express from 'express'
import myDataSource from './data-source';
import { User } from './entities/user.entity';

const router = express.Router();

router.get("/users", async function (req: Request, res: Response): Promise<any> {
    const users = await myDataSource.getRepository(User).find();
    res.json(users);
});

export default router;
