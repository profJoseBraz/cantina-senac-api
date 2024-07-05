import express, { Request, Response } from 'express';
import { createNewConnection } from '../database/Db.js';
import { TCategory } from '../types/model/Category.js';

const router = express.Router();

router.get(
    "/", 
    async (req: Request, res: Response, next) => {
        console.log(req.ip);
        next()
        res.status(200).json("OK");
    });

export default router;