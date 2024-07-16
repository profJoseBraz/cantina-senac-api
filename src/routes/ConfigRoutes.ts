import express, { Request, Response } from 'express';
import { 
    getBdImgsToken } from '../controllers/ConfigController.js';
import { createNewConnection } from '../database/Db.js';

const router = express.Router();

router.get(
    "/bdImgsToken", 
    async (req: Request, res: Response) => {
        try{
            const query = req.query as any;
            
            if(Object.keys(query).length === 0){
                return getBdImgsToken(req, res, await createNewConnection())
            }

            throw new Error(`Bad Request`);
        }catch(err : any){
            console.log(err);
            return res.status(400).json({Message: err.message});
        }
    });

export default router;