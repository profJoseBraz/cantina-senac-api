import { Request, Response } from 'express';
import mysql from 'mysql2/promise';

export const getAllProduction = async (_: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const sql = 
            `
            select 
                p.id,
                p.data,
                p.quantidade,
                p.observacao,
                pr.id as id_produto,
                pr.id_categoria as id_categoria_produto,
                pr.nome as nome_produto,
                pr.descricao as descricao_produto,
                pr.valor as valor_produto,
                pr.imagem as imagem_produto 
            from
                producao p
            join produto pr
                on pr.id = p.id_produto`;

        const [data] = await dbConn.query(sql);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getAllProduction, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getProductionById = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { id } = req.query;

        const sql = 
            `
            select 
                p.id,
                p.data,
                p.quantidade,
                p.observacao,
                pr.id as id_produto,
                pr.id_categoria as id_categoria_produto,
                pr.nome as nome_produto,
                pr.descricao as descricao_produto,
                pr.valor as valor_produto,
                pr.imagem as imagem_produto 
            from
                producao p
            join produto pr
                on pr.id = p.id_produto
            where
                p.id = ?`;

        const [data] = await dbConn.query(sql, [id]);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getProductionById, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getProductionByProductId = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { productId } = req.query;

        const sql = 
            `
            select 
                p.id,
                p.data,
                p.quantidade,
                p.observacao,
                pr.id as id_produto,
                pr.id_categoria as id_categoria_produto,
                pr.nome as nome_produto,
                pr.descricao as descricao_produto,
                pr.valor as valor_produto,
                pr.imagem as imagem_produto 
            from
                producao p
            join produto pr
                on pr.id = p.id_produto
            where
                pr.id = ?`;

        const [data] = await dbConn.query(sql, [productId]);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getProductionByProductId, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getProductionByDate = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { date, operator } = req.query;

        const sqlOperator = `set @operator := ?`
        
        const sqlDate = `set @date := ?`

        const sql = 
            `
            select 
                p.id,
                p.data,
                p.quantidade,
                p.observacao,
                pr.id as id_produto,
                pr.id_categoria as id_categoria_produto,
                pr.nome as nome_produto,
                pr.descricao as descricao_produto,
                pr.valor as valor_produto,
                pr.imagem as imagem_produto 
            from
                producao p
            join produto pr
                on pr.id = p.id_produto
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
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getProductionByDate, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getProductionByAmount = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { amount, comparator } = req.query;

        const sqlOperator = `set @operator := ?`
        
        const sqlAmount = `set @amount := ?`

        const sql = 
            `
            select 
                p.id,
                p.data,
                p.quantidade,
                p.observacao,
                pr.id as id_produto,
                pr.id_categoria as id_categoria_produto,
                pr.nome as nome_produto,
                pr.descricao as descricao_produto,
                pr.valor as valor_produto,
                pr.imagem as imagem_produto 
            from
                producao p
            join produto pr
                on pr.id = p.id_produto
            where
                case 
                    when @operator = '>' then p.quantidade > @amount
                    when @operator = '<' then p.quantidade < @amount
                    when @operator = '=' then p.quantidade = @amount
                    else false
                end`;

        await dbConn.query(sqlOperator, [comparator]);
        await dbConn.query(sqlAmount, [amount]);
        const [data] = await dbConn.query(sql);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getProductionByAmount, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getProductionByObservation = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { observation } = req.query;

        const sql = 
            `
            select 
                p.id,
                p.data,
                p.quantidade,
                p.observacao,
                pr.id as id_produto,
                pr.id_categoria as id_categoria_produto,
                pr.nome as nome_produto,
                pr.descricao as descricao_produto,
                pr.valor as valor_produto,
                pr.imagem as imagem_produto 
            from
                producao p
            join produto pr
                on pr.id = p.id_produto
            where
                p.observacao like ?`;

        const [data] = await dbConn.query(sql, [`%${observation}%`]);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getProductionByObservation, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getProductionByProductCategoryId = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { categoryId } = req.query;

        const sql = 
            `
            select 
                p.id,
                p.data,
                p.quantidade,
                p.observacao,
                pr.id as id_produto,
                pr.id_categoria as id_categoria_produto,
                pr.nome as nome_produto,
                pr.descricao as descricao_produto,
                pr.valor as valor_produto,
                pr.imagem as imagem_produto 
            from
                producao p
            join produto pr
                on pr.id = p.id_produto
            where
                pr.id_categoria = ?`;

        const [data] = await dbConn.query(sql, categoryId);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getProductionByObservation, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}