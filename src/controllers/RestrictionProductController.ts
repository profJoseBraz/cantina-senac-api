import { Request, Response } from 'express';
import mysql from 'mysql2/promise';

export const getAllRestrictionProduct = async (_: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const sql = 
            `
            select
                rp.id,
                p.id as id_produto,
                p.id_categoria as id_categoria_produto,
                p.nome as nome_produto,
                p.descricao as descricao_produto,
                p.valor as valor_produto,
                p.imagem as imagem_produto,
                r.id as id_restricao,
                r.nome as nome_restricao,
                r.descricao as descricao_restricao
            from
                restricao_produto rp
            join produto p
                on p.id = rp.id_produto
            join restricao r
                on r.id =rp.id_retricao `;

        const [data] = await dbConn.query(sql);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getAllRestrictionProduct, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getRestrictionProductByRestrictionId = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { restrictionId } = req.query;
        
        const sql = 
            `
            select
                rp.id,
                p.id as id_produto,
                p.id_categoria as id_categoria_produto,
                p.nome as nome_produto,
                p.descricao as descricao_produto,
                p.valor as valor_produto,
                p.imagem as imagem_produto,
                r.id as id_restricao,
                r.nome as nome_restricao,
                r.descricao as descricao_restricao
            from
                restricao_produto rp
            join produto p
                on p.id = rp.id_produto
            join restricao r
                on r.id =rp.id_retricao
            where
                r.id = ?`;

        const [data] = await dbConn.query(sql, [restrictionId]);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getAllRestrictionProductById, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getRestrictionProductByProductId = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { productId } = req.query;
        
        const sql = 
            `
            select
                rp.id,
                p.id as id_produto,
                p.id_categoria as id_categoria_produto,
                p.nome as nome_produto,
                p.descricao as descricao_produto,
                p.valor as valor_produto,
                p.imagem as imagem_produto,
                r.id as id_restricao,
                r.nome as nome_restricao,
                r.descricao as descricao_restricao
            from
                restricao_produto rp
            join produto p
                on p.id = rp.id_produto
            join restricao r
                on r.id =rp.id_retricao
            where
                p.id = ?`;

        const [data] = await dbConn.query(sql, [productId]);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getAllRestrictionProductById, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}