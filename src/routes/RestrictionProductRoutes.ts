import express, { Request, Response } from 'express';
import { 
    getAllRestrictionProduct,
    getRestrictionProductByProductId,
    getRestrictionProductByRestrictionId
} from '../controllers/RestrictionProductController.js';
import { createNewConnection } from '../database/Db.js';
import { TRestrictionProduct } from '../types/model/RestrictionProduct.js';

const router = express.Router();

router.get(
    "/", 
    async (req: Request, res: Response) => {
        try{
            const query : TRestrictionProduct = req.query as any;
            
            if(Object.keys(query).length === 0){
                return getAllRestrictionProduct(req, res, await createNewConnection())
            }

            if(query.productId){
                return getRestrictionProductByProductId(req, res, await createNewConnection());
            }else if(query.restrictionId){
                return getRestrictionProductByRestrictionId(req, res, await createNewConnection());
            }

            throw new Error(`Bad Request`);
        }catch(err : any){
            console.log(err);
            return res.status(400).json({Message: err.message});
        }
    });

export default router;