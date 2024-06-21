import { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import { SetCurrentTimeZone } from '../helpers/SetCurrentTimeZone.js';

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
        const { paymentMethodId } = req.query;

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

        const [data] = await dbConn.query(sql, [paymentMethodId]);
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

export const getOrdersByCustomerName = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { customerName } = req.query;

        const sql = 
            `
            select 
                * 
            from 
                pedido p
            join forma_pagamento fp 
                on fp.id = p.id_forma_pagamento
            where
                p.nome_cliente like ?`;

        const [data] = await dbConn.query(sql, [`${customerName}%`]);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`End point: getOrdersByCustomerName, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getOrdersByDate = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { date, operator } = req.query;

        const sqlOperator = `set @operator := ?`
        
        const sqlDate = `set @date := ?`

        const sql = 
            `
            select 
                * 
            from 
                pedido p
            join forma_pagamento fp 
                on fp.id = p.id_forma_pagamento
            where
                case 
                    when @operator = '>' then date(p.data) > @date
                    when @operator = '<' then date(p.data) < @date
                    when @operator = '=' then date(p.data) = @date
                    else false
                end`;

        await dbConn.query(sqlOperator, [operator]);
        await dbConn.query(sqlDate, [date]);
        const [data] = await dbConn.query(sql);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`End point: getOrdersByDate, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const addOrder = async (req: Request, res: Response, dbConn : mysql.Connection) => {
    try{
        const { 
            paymentMethodId, 
            customerName,
            value 
        } = req.body;

        const sql = 
            `
            insert into pedido
                (
                    id_forma_pagamento,
                    nome_cliente,
                    data
                )
            values
                (
                    ?,
                    ?,
                    now()
                )`;
        
        dbConn.beginTransaction();

        await SetCurrentTimeZone('America/Sao_Paulo', false, dbConn);
        await dbConn.query(sql, [paymentMethodId, customerName, value]);

        await dbConn.commit();

        console.log(`Novo pedido cadastrado.`);
        res.status(201).json({message: "Novo pedido cadastrado."})
    }catch(err: any){
        if(dbConn){
            dbConn.rollback();
        }

        console.log(`Endpoint: addOrder, Erro: ${err}`);
    }finally{
        if(dbConn){
            dbConn.end();
        }
    }
}