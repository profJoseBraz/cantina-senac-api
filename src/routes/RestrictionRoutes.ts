import express, { Request, Response } from 'express';
import { 
    getAllCategories,
    getCategoriesById,
    getCategoriesByName } from '../controllers/CategoryController.js';
import { createNewConnection } from '../database/Db.js';
import { TRestriction } from '../types/model/Restriction.js';

const router = express.Router();

router.get(
    "/", 
    async (req: Request, res: Response) => {
        try{
            const query : TRestriction = req.query as any;
            
            if(Object.keys(query).length === 0){
                return getAllCategories(req, res, await createNewConnection())
            }

            if(query.id){
                return getCategoriesById(req, res, await createNewConnection());
            }else if(query.name){
                return getCategoriesByName(req, res, await createNewConnection());
            }

            throw new Error(`Bad Request`);
        }catch(err : any){
            console.log(err);
            return res.status(400).json({Message: err.message});
        }
    });

export default router;