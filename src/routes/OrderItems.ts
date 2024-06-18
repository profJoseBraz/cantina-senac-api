import express, { Request, Response } from 'express';
import { 
    getAllOrderItems,
    getOrderItemsById,
    getOrderItemsByCustomerName
} from '../controllers/OrderItemsController.js'; 
import { createNewConnection } from '../database/Db.js';
import { TOrderItems } from '../types/model/OrderItems.js';
import { TOrder } from '../types/model/Order.js';

const router = express.Router();

router.get(
    "/", 
    async (req: Request, res: Response) => {
        try{
            const query : TOrder & TOrderItems = req.query as any;
            
            if(Object.keys(query).length === 0){
                return getAllOrderItems(req, res, await createNewConnection())
            }

            if(query.id){
                return getOrderItemsById(req, res, await createNewConnection());
            }else if(query.nome_cliente){
                return getOrderItemsByCustomerName(req, res, await createNewConnection());
            }

            throw new Error(`Bad Request`);
        }catch(err : any){
            console.log(err);
            return res.status(400).json({Message: err.message});
        }
    });

export default router;