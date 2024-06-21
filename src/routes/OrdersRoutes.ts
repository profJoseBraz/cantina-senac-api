import express, { Request, Response } from 'express';
import { 
    getAllOrders,
    getOrdersById,
    getOrdersByPaymentMethodId,
    getOrdersByCustomerName,
    getOrdersByDate,
    addOrder
} from '../controllers/OrdersController.js';
import { createNewConnection } from '../database/Db.js';
import { TOrder } from '../types/model/Order.js';

const router = express.Router();

router.get(
    "/", 
    async (req: Request, res: Response) => {
        try{
            const query : TOrder = req.query as any;
            
            if(Object.keys(query).length === 0){
                return getAllOrders(req, res, await createNewConnection())
            }

            if(query.id){
                return getOrdersById(req, res, await createNewConnection());
            }else if(query.paymentMethodId){
                return getOrdersByPaymentMethodId(req, res, await createNewConnection());
            }else if(query.customerName){
                return getOrdersByCustomerName(req, res, await createNewConnection());
            }else if(query.date){
                return getOrdersByDate(req, res, await createNewConnection());
            }

            throw new Error(`Bad Request`);
        }catch(err : any){
            console.log(err);
            return res.status(400).json({Message: err.message});
        }
    });

router.post(
    "/addOrder", 
    async (req: Request, res: Response) => addOrder(req, res, await createNewConnection()));

export default router;