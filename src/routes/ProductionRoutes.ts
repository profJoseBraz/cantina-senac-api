import express, { Request, Response } from 'express';
import { 
    getAllProduction,
    getProductionById,
    getProductionByProductId,
    getProductionByDate,
    getProductionByAmount,
    getProductionByProductCategoryId,
    addProduction,
    getProductionByProductCategoryName
} from '../controllers/ProductionController.js';
import { createNewConnection } from '../database/Db.js';
import { TProduction } from '../types/model/Production.js';
import { TProduct } from '../types/model/Product.js';
import { TCategory } from '../types/model/Category.js';

const router = express.Router();

router.get(
    "/", 
    async (req: Request, res: Response) => {
        try{
            const query : TProduction = req.query as any;

            if(Object.keys(query).length === 0){
                return getAllProduction(req, res, await createNewConnection())
            }

            if(query.id){
                return getProductionById(req, res, await createNewConnection());
            }else if(query.productId){
                return getProductionByProductId(req, res, await createNewConnection());
            }else if(query.date){
                return getProductionByDate(req, res, await createNewConnection());
            }else if(query.amount){
                return getProductionByAmount(req, res, await createNewConnection());
            }

            throw new Error(`Bad Request`);
        }catch(err : any){
            console.log(err);
            return res.status(400).json({Message: err.message});
        }
    });

router.get(
    "/products", 
    async (req: Request, res: Response) => {
        try{
            const query : TProduct = req.query as any;

            if(query.categoryId){
                return getProductionByProductCategoryId(req, res, await createNewConnection());
            }

            throw new Error(`Bad Request`);
        }catch(err : any){
            console.log(err);
            return res.status(400).json({Message: err.message});
        }
    });

router.get(
    "/products/category", 
    async (req: Request, res: Response) => {
        try{
            const query : TCategory = req.query as any;

            if(query.name){
                return getProductionByProductCategoryName(req, res, await createNewConnection());
            }

            throw new Error(`Bad Request`);
        }catch(err : any){
            console.log(err);
            return res.status(400).json({Message: err.message});
        }
    });

router.post(
    "/add", 
    async (req: Request, res: Response) => addProduction(req, res, await createNewConnection()));

export default router;