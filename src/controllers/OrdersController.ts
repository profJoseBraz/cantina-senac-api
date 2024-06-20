import { Request, Response } from 'express';
import mysql from 'mysql2/promise';

export const getAllOrders = async (_: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const sql = 
            `
            select 
                * 
            from 
                pedido p
            join forma_pagamento fp 
                on fp.id = p.id_forma_pagamento `;

        const [data] = await dbConn.query(sql);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`End point: getAllOrders, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getOrdersById = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { id } = req.query;

        const sql = 
            `
            select 
                * 
            from 
                pedido p
            join forma_pagamento fp 
                on fp.id = p.id_forma_pagamento
            where
                p.id = ?`;

        const [data] = await dbConn.query(sql, [id]);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`End point: getOrdersById, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getOrdersByPaymentMethodId = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { id_forma_pagamento } = req.query;

        const sql = 
            `
            select 
                * 
            from 
                pedido p
            join forma_pagamento fp 
                on fp.id = p.id_forma_pagamento
            where
                fp.id = ?`;

        const [data] = await dbConn.query(sql, [id_forma_pagamento]);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`End point: getOrdersByPaymentMethodId, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}