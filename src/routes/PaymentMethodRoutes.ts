import express, { Request, Response } from 'express';
import { 
    getAllPaymentMethods,
    getPaymentMethodsById,
    getPaymentMethodsByName
} from '../controllers/PaymentMethodController.js';
import { createNewConnection } from '../database/Db.js';
import { TPaymentMethod } from '../types/model/PaymentMethod.js';

const router = express.Router();

router.get(
    "/", 
    async (req: Request, res: Response) => {
        try{
            const query : TPaymentMethod = req.query as any;
            
            if(Object.keys(query).length === 0){
                return getAllPaymentMethods(req, res, await createNewConnection())
            }

            if(query.id){
                return getPaymentMethodsById(req, res, await createNewConnection());
            }else if(query.name){
                return getPaymentMethodsByName(req, res, await createNewConnection());
            }

            throw new Error(`Bad Request`);
        }catch(err : any){
            console.log(err);
            return res.status(400).json({Message: err.message});
        }
    });

export default router;