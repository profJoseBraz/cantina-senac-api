import { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import { TOrderItems } from '../types/model/OrderItems';

export const getAllOrderItems = async (_: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const sql = 
            `
            select 
                ip.id,
                ip.quantidade,
                p.id as id_pedido,
                p.id_forma_pagamento as id_forma_pagamento_pedido,
                p.nome_cliente as nome_cliente_pedido,
                date_format(date(p.data), '%d/%m/%Y') as data_pedido,
                time(p.data) as hora_pedido,
                pr.id as id_produto,
                pr.id_categoria as id_categoria_produto,
                pr.nome as nome_produto,
                pr.descricao as descricao_produto,
                pr.valor as valor_produto,
                pr.imagem as imagem_produto
            from 
                itens_pedido ip
            join pedido p
                on p.id = ip.id_pedido 
            join produto pr
                on pr.id = ip.id_produto`;

        const [data] = await dbConn.query(sql);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getAllOrderItems, Erro: ${err}`);
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
                ip.id,
                ip.quantidade,
                p.id as id_pedido,
                p.id_forma_pagamento as id_forma_pagamento_pedido,
                p.nome_cliente as nome_cliente_pedido,
                date_format(date(p.data), '%d/%m/%Y') as data_pedido,
                time(p.data) as hora_pedido,
                pr.id as id_produto,
                pr.id_categoria as id_categoria_produto,
                pr.nome as nome_produto,
                pr.descricao as descricao_produto,
                pr.valor as valor_produto,
                pr.imagem as imagem_produto 
            from 
                itens_pedido ip
            join pedido p
                on p.id = ip.id_pedido 
            join produto pr
                on pr.id = ip.id_produto
            where
                ip.id = ?`;

        const [data] = await dbConn.query(sql, [id]);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getOrderItemsById, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getOrderItemsByOrderId = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { orderId } = req.query;

        const sql = 
            `
            select 
                ip.id,
                ip.quantidade,
                p.id as id_pedido,
                p.id_forma_pagamento as id_forma_pagamento_pedido,
                p.nome_cliente as nome_cliente_pedido,
                date_format(date(p.data), '%d/%m/%Y') as data_pedido,
                time(p.data) as hora_pedido,
                pr.id as id_produto,
                pr.id_categoria as id_categoria_produto,
                pr.nome as nome_produto,
                pr.descricao as descricao_produto,
                pr.valor as valor_produto,
                pr.imagem as imagem_produto 
            from 
                itens_pedido ip
            join pedido p
                on p.id = ip.id_pedido 
            join produto pr
                on pr.id = ip.id_produto
            where
                p.id like ?`;

        const [data] = await dbConn.query(sql, [orderId]);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getOrderItemsByOrderId, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getOrderItemsByProductId = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { productId } = req.query;

        const sql = 
            `
            select 
                ip.id,
                ip.quantidade,
                p.id as id_pedido,
                p.id_forma_pagamento as id_forma_pagamento_pedido,
                p.nome_cliente as nome_cliente_pedido,
                date_format(date(p.data), '%d/%m/%Y') as data_pedido,
                time(p.data) as hora_pedido,
                pr.id as id_produto,
                pr.id_categoria as id_categoria_produto,
                pr.nome as nome_produto,
                pr.descricao as descricao_produto,
                pr.valor as valor_produto,
                pr.imagem as imagem_produto 
            from 
                itens_pedido ip
            join pedido p
                on p.id = ip.id_pedido 
            join produto pr
                on pr.id = ip.id_produto
            where
                pr.id like ?`;

        const [data] = await dbConn.query(sql, [productId]);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getOrderItemsByProductId, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getOrderItemsTotalById = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { id } = req.query;

        const sql = 
            `
            select
                p.id as id,
                p.nome_cliente as nome_cliente,
                date_format(date(p.data), '%d/%m/%Y') as data,
                time(p.data) as hora,
                sum(p2.valor * ip.quantidade) as valor_total 
            from
                itens_pedido ip 
            join pedido p 
                on p.id = ip.id_pedido 
            join produto p2 
                on p2.id = ip.id_produto
            where
                p.id = ?
            group by
                p.id,
                p.nome_cliente`;

        const [data] = await dbConn.query(sql, [id]);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getOrderItemsByProductId, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const addOrderItems = async (orderId: number, closeConn: boolean, req: Request, res: Response, dbConn : mysql.Connection) => {
    try{
        const { 
            orderItems 
        } = req.body;

        const sql = 
            `
            insert into itens_pedido 
                (
                    id_pedido,
                    id_produto,
                    quantidade
                )
            values
                (
                    ?,
                    ?,
                    ?
                )`;
        
        dbConn.beginTransaction();

        for (const orderItem of orderItems as Array<TOrderItems>) {
            try {
                await dbConn.query(sql, [orderId, orderItem.productId, orderItem.amount]);
            } catch (error) {
                throw new Error(`Erro ao inserir os itens do pedido. Motivo: ${error}`);
            }
        }

        await dbConn.commit();

        console.log(`Itens adicionados com sucesso.`);
    }catch(err: any){
        if(dbConn){
            dbConn.rollback();
        }

        console.log(`Endpoint: addOrderItems, Erro: ${err}`);
    }finally{
        if(dbConn && closeConn){
            dbConn.end();
        }
    }
}