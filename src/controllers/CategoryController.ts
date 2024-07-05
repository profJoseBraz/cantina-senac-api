import { Request, Response } from 'express';
import mysql from 'mysql2/promise';

export const getAllCategories = async (_: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const sql = 
            `
            select 
                * 
            from 
                categoria`;

        const [data] = await dbConn.query(sql);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getCategories, Erro: ${err}`);
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

        const sql = 
            `
            select 
                * 
            from 
                categoria 
            where 
                id = ?`;

        const [data] = await dbConn.query(sql, [id]);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getCategoriesById, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getCategoriesByName = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { name } = req.query;

        const sql = 
            `
            select 
                * 
            from 
                categoria 
            where 
                nome like ?`;

        const [data] = await dbConn.query(sql, [`${name}%`]);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getCategoriesByName, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}