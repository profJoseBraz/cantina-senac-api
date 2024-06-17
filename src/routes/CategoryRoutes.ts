import express, { Request, Response } from 'express';
import { getCategories } from '../controllers/CategoryController.js';
import { createNewConnection } from '../database/Db.js';

const router = express.Router();

router.get(
    "/", 
    async (req: Request, res: Response) => getCategories(req, res, await createNewConnection()));

export default router;