import express, { Request, Response } from 'express';
import { 
    getAllOrderItems,
    getOrderItemsById,
    getOrderItemsByOrderId,
    getOrderItemsByProductId
} from '../controllers/OrderItemsController.js'; 
import { createNewConnection } from '../database/Db.js';
import { TOrderItems } from '../types/model/OrderItems.js';

const router = express.Router();

router.get(
    "/", 
    async (req: Request, res: Response) => {
        try{
            const query : TOrderItems = req.query as any;
            
            if(Object.keys(query).length === 0){
                return getAllOrderItems(req, res, await createNewConnection())
            }

            if(query.id){
                return getOrderItemsById(req, res, await createNewConnection());
            }else if(query.orderId){
                return getOrderItemsByOrderId(req, res, await createNewConnection());
            }else if(query.productId){
                return getOrderItemsByProductId(req, res, await createNewConnection());
            }

            throw new Error(`Bad Request`);
        }catch(err : any){
            console.log(err);
            return res.status(400).json({Message: err.message});
        }
    });

export default router;