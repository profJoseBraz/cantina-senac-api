import { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import { TCategoryQueryParams } from '../types/controllers/CategoryController.types';

export const getCategories = async (_: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const sql = `select * from categoria`;

        const [data] = await dbConn.query(sql);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`End point: getCategories, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getCategoriesById = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { id } = req.query;

        const sql = `select * from categoria where id = ?`;

        const [data] = await dbConn.query(sql, [id]);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`End point: getCategoriesById, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getCategoriesByName = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { nome } = req.query;

        const sql = `select * from categoria where nome like ?`;

        const [data] = await dbConn.query(sql, [`${nome}%`]);
        
        console.log(data)

        const id = (data as any as TCategoryQueryParams).id
        const name = (data as any as TCategoryQueryParams).nome

        const category : Category = new Category(id, name);
        
        console.log(category);
        return res.status(200).json(category);
    } catch (err) {
        console.log(`End point: getCategoriesByName, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}