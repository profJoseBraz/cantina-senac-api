import express, { Request, Response } from 'express';
import { 
    getCategories,
    getCategoriesById,
    getCategoriesByName } from '../controllers/CategoryController.js';
import { createNewConnection } from '../database/Db.js';
import { TCategoryQueryParams } from '../types/controllers/CategoryController.types.js';

const router = express.Router();

router.get(
    "/", 
    async (req: Request, res: Response) => {
        try{
            const query : TCategoryQueryParams = req.query as any as TCategoryQueryParams;
            
            if(Object.keys(query).length === 0){
                return getCategories(req, res, await createNewConnection())
            }

            if(query.id){
                return getCategoriesById(req, res, await createNewConnection());
            }else if(query.nome){
                return getCategoriesByName(req, res, await createNewConnection());
            }

            throw new Error(`Bad Request`);
        }catch(err : any){
            console.log(err);
            return res.status(400).json({Message: err.message});
        }
    });

export default router;