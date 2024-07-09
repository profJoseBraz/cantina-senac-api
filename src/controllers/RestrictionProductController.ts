import { Request, Response } from 'express';
import mysql from 'mysql2/promise';

export const getAllRestrictionProduct = async (_: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const sql = 
            `
            select
                rp.id,
                json_object(
                    'id', p.id,
                    'categoria', JSON_OBJECT(
                        'id', c.id,
                        'nome', c.nome
                    ),
                'nome', p.nome,
                'descricao', p.descricao,
                'valor', p.valor,
                'imagem', p.imagem 
                ) as produto,
                json_object(
                    'id', r.id,
                    'nome', r.nome,
                    'descricao', r.descricao 
                ) as restricao
            from
                restricao_produto rp
            join produto p
                on p.id = rp.id_produto
            join restricao r
                on r.id = rp.id_retricao
            join categoria c 
                on c.id = p.id_categoria`;

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
                json_object(
                    'id', p.id,
                    'categoria', JSON_OBJECT(
                        'id', c.id,
                        'nome', c.nome
                    ),
                'nome', p.nome,
                'descricao', p.descricao,
                'valor', p.valor,
                'imagem', p.imagem 
                ) as produto,
                json_object(
                    'id', r.id,
                    'nome', r.nome,
                    'descricao', r.descricao 
                ) as restricao
            from
                restricao_produto rp
            join produto p
                on p.id = rp.id_produto
            join restricao r
                on r.id = rp.id_retricao
            join categoria c 
                on c.id = p.id_categoria
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
                json_object(
                    'id', p.id,
                    'categoria', JSON_OBJECT(
                        'id', c.id,
                        'nome', c.nome
                    ),
                'nome', p.nome,
                'descricao', p.descricao,
                'valor', p.valor,
                'imagem', p.imagem 
                ) as produto,
                json_object(
                    'id', r.id,
                    'nome', r.nome,
                    'descricao', r.descricao 
                ) as restricao
            from
                restricao_produto rp
            join produto p
                on p.id = rp.id_produto
            join restricao r
                on r.id = rp.id_retricao
            join categoria c 
                on c.id = p.id_categoria
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