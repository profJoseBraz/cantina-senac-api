import express, { Request, Response } from 'express';
import { 
    getAllProducts,
    getProductsById,
    getProductsByCategoryId,
    getProductsByName,
    getProductsByDescription
 } from '../controllers/ProductController.js';
import { createNewConnection } from '../database/Db.js';
import { TProduct } from '../types/model/Product.js';

const router = express.Router();

router.get(
    "/", 
    async (req: Request, res: Response) => {
        try{
            const query : TProduct = req.query as any;
            
            if(Object.keys(query).length === 0){
                return getAllProducts(req, res, await createNewConnection())
            }

            if(query.id){
                return getProductsById(req, res, await createNewConnection());
            }else if(query.categoryId){
                return getProductsByCategoryId(req, res, await createNewConnection());
            }else if(query.name){
                return getProductsByName(req, res, await createNewConnection());
            }else if(query.description){
                return getProductsByDescription(req, res, await createNewConnection());
            }

            throw new Error(`Bad Request`);
        }catch(err : any){
            console.log(err);
            return res.status(400).json({Message: err.message});
        }
    });

export default router;