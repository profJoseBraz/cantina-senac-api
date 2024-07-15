import { Request, Response } from 'express';
import mysql from 'mysql2/promise';

export const getAllProduction = async (_: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const sql = 
            `
            select
                p.id,
                json_object(
                    'id', pr.id,
                    'categoria', JSON_OBJECT(
                        'id', c.id,
                        'nome', c.nome
                    ),
                'nome', pr.nome,
                'descricao', pr.descricao,
                'valor', pr.valor,
                'imagem', pr.imagem 
                ) as produto,
                p.data,
                p.quantidade,
                p.observacao
            from
                producao p
            join produto pr 
                on pr.id = p.id_produto
            join categoria c 
                on c.id = pr.id_categoria
            order by
                pr.nome`;

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
                json_object(
                    'id', pr.id,
                    'categoria', JSON_OBJECT(
                        'id', c.id,
                        'nome', c.nome
                    ),
                'nome', pr.nome,
                'descricao', pr.descricao,
                'valor', pr.valor,
                'imagem', pr.imagem 
                ) as produto,
                p.data,
                p.quantidade,
                p.observacao
            from
                producao p
            join produto pr 
                on pr.id = p.id_produto
            join categoria c 
                on c.id = pr.id_categoria
            where
                p.id = ?
            order by
                pr.nome`;

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
                json_object(
                    'id', pr.id,
                    'categoria', JSON_OBJECT(
                        'id', c.id,
                        'nome', c.nome
                    ),
                'nome', pr.nome,
                'descricao', pr.descricao,
                'valor', pr.valor,
                'imagem', pr.imagem 
                ) as produto,
                p.data,
                p.quantidade,
                p.observacao
            from
                producao p
            join produto pr 
                on pr.id = p.id_produto
            join categoria c 
                on c.id = pr.id_categoria
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
                json_object(
                    'id', pr.id,
                    'categoria', JSON_OBJECT(
                        'id', c.id,
                        'nome', c.nome
                    ),
                'nome', pr.nome,
                'descricao', pr.descricao,
                'valor', pr.valor,
                'imagem', pr.imagem 
                ) as produto,
                p.data,
                p.quantidade,
                p.observacao
            from
                producao p
            join produto pr 
                on pr.id = p.id_produto
            join categoria c 
                on c.id = pr.id_categoria
            where
                case 
                    when @operator = '>' then date(p.data) > @date
                    when @operator = '<' then date(p.data) < @date
                    when @operator = '=' then date(p.data) = @date
                    else false
                end
            order by
                pr.nome`;

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
                json_object(
                    'id', pr.id,
                    'categoria', JSON_OBJECT(
                        'id', c.id,
                        'nome', c.nome
                    ),
                'nome', pr.nome,
                'descricao', pr.descricao,
                'valor', pr.valor,
                'imagem', pr.imagem 
                ) as produto,
                p.data,
                p.quantidade,
                p.observacao
            from
                producao p
            join produto pr 
                on pr.id = p.id_produto
            join categoria c 
                on c.id = pr.id_categoria
            where
                case 
                    when @operator = '>' then p.quantidade > @amount
                    when @operator = '<' then p.quantidade < @amount
                    when @operator = '=' then p.quantidade = @amount
                    else false
                end
            order by
                pr.nome`;

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
                json_object(
                    'id', pr.id,
                    'categoria', JSON_OBJECT(
                        'id', c.id,
                        'nome', c.nome
                    ),
                'nome', pr.nome,
                'descricao', pr.descricao,
                'valor', pr.valor,
                'imagem', pr.imagem 
                ) as produto,
                p.data,
                p.quantidade,
                p.observacao
            from
                producao p
            join produto pr 
                on pr.id = p.id_produto
            join categoria c 
                on c.id = pr.id_categoria
            where
                p.observacao like ?
            order by
                pr.nome`;

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
                json_object(
                    'id', pr.id,
                    'categoria', JSON_OBJECT(
                        'id', c.id,
                        'nome', c.nome
                    ),
                'nome', pr.nome,
                'descricao', pr.descricao,
                'valor', pr.valor,
                'imagem', pr.imagem 
                ) as produto,
                p.data,
                p.quantidade,
                p.observacao
            from
                producao p
            join produto pr 
                on pr.id = p.id_produto
            join categoria c 
                on c.id = pr.id_categoria
            where
                pr.id_categoria = ?
            order by
                pr.nome`;

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

export const getProductionByProductName = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { name } = req.query;

        const sql = 
            `
            select
                p.id,
                json_object(
                    'id', pr.id,
                    'categoria', JSON_OBJECT(
                        'id', c.id,
                        'nome', c.nome
                    ),
                'nome', pr.nome,
                'descricao', pr.descricao,
                'valor', pr.valor,
                'imagem', pr.imagem 
                ) as produto,
                p.data,
                p.quantidade,
                p.observacao
            from
                producao p
            join produto pr 
                on pr.id = p.id_produto
            join categoria c 
                on c.id = pr.id_categoria
            where
                pr.nome like ?
            order by
                pr.nome`;

        const [data] = await dbConn.query(sql, [`%${name}%`]);
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

export const getProductionByProductCategoryName = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { name } = req.query;

        const sql = 
            `
            select
                p.id,
                json_object(
                    'id', pr.id,
                    'categoria', JSON_OBJECT(
                        'id', c.id,
                        'nome', c.nome
                    ),
                'nome', pr.nome,
                'descricao', pr.descricao,
                'valor', pr.valor,
                'imagem', pr.imagem 
                ) as produto,
                p.data,
                p.quantidade,
                p.observacao
            from
                producao p
            join produto pr 
                on pr.id = p.id_produto
            join categoria c 
                on c.id = pr.id_categoria
            where
                c.nome like ?
            order by
                pr.nome`;

        const [data] = await dbConn.query(sql, [`%${name}%`]);
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

export const addProduction = async (req: Request, res: Response, dbConn : mysql.Connection) => {
    try{
        const {
            productId,
            date,
            amount,
            observation
        } = req.body;

        const sql =
            `
            insert into producao 
                (
                    id_produto, 
                    data, 
                    quantidade, 
                    observacao
                )
            values
                (
                    ?, 
                    ?, 
                    ?, 
                    ?
                )`;

        dbConn.beginTransaction();

        await dbConn.query(sql, [productId, date, amount, observation]);

        await dbConn.commit();

        res.status(201).json({ message: "Nova produção adicionada." });
    }catch(err){
        console.log(`Endpoint: addProduction, Erro: ${err}`);
        return res.status(500).json(err);
    }finally{
        if(dbConn){
            dbConn.end();
        }
    }
}