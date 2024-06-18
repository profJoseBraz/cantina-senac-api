import { Request, Response } from 'express';
import mysql from 'mysql2/promise';

export const getAllOrderItems = async (_: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const sql = 
            `
            select 
                * 
            from 
                itens_pedido ip
            join pedido p
                on p.id = ip.id_pedido 
            join produto pr
                on pr.id = ip.id_produto`;

        const [data] = await dbConn.query(sql);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`End point: getAllOrderItems, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getOrderItemsById = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { id } = req.query;

        const sql = 
            `
            select 
                * 
            from 
                itens_pedido ip
            join pedido p
                on p.id = ip.id_pedido 
            join produto pr
                on pr.id = ip.id_produto
            where
                ip.id = ?`;

        const [data] = await dbConn.query(sql, [id]);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`End point: getOrderItemsById, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getOrderItemsByCustomerName = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { nome_cliente } = req.query;

        const sql = 
            `
            select 
                * 
            from 
                itens_pedido ip
            join pedido p
                on p.id = ip.id_pedido 
            join produto pr
                on pr.id = ip.id_produto
            where
                p.nome_cliente like ?`;

        const [data] = await dbConn.query(sql, [`${nome_cliente}%`]);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`End point: getOrderItemsById, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}