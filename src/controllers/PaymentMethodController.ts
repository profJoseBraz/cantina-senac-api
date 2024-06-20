import { Request, Response } from 'express';
import mysql from 'mysql2/promise';

export const getAllPaymentMethods = async (_: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const sql = 
            `
            select 
                * 
            from 
                forma_pagamento`;

        const [data] = await dbConn.query(sql);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`End point: getAllPaymentMethods, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getPaymentMethodsById = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { id } = req.query;

        const sql = 
            `
            select 
                * 
            from 
                forma_pagamento
            where
                id = ?`;

        const [data] = await dbConn.query(sql, [id]);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`End point: getPaymentMethodsById, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getPaymentMethodsByName = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { name } = req.query;

        const sql = 
            `
            select 
                * 
            from 
                forma_pagamento
            where
                nome like ?`;

        const [data] = await dbConn.query(sql, [`${name}%`]);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`End point: getPaymentMethodsByName, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}