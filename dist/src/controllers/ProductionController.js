var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const getAllProduction = (_, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `
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
        const [data] = yield dbConn.query(sql);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getAllProduction, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getProductionById = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const sql = `
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
        const [data] = yield dbConn.query(sql, [id]);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getProductionById, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getProductionByProductId = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.query;
        const sql = `
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
        const [data] = yield dbConn.query(sql, [productId]);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getProductionByProductId, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getProductionByDate = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, operator } = req.query;
        const sqlOperator = `set @operator := ?`;
        const sqlDate = `set @date := ?`;
        const sql = `
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
        yield dbConn.query(sqlOperator, [operator]);
        yield dbConn.query(sqlDate, [date]);
        const [data] = yield dbConn.query(sql);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getProductionByDate, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getProductionByAmount = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, comparator } = req.query;
        const sqlOperator = `set @operator := ?`;
        const sqlAmount = `set @amount := ?`;
        const sql = `
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
        yield dbConn.query(sqlOperator, [comparator]);
        yield dbConn.query(sqlAmount, [amount]);
        const [data] = yield dbConn.query(sql);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getProductionByAmount, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getProductionByObservation = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { observation } = req.query;
        const sql = `
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
        const [data] = yield dbConn.query(sql, [`%${observation}%`]);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getProductionByObservation, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getProductionByProductCategoryId = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.query;
        const sql = `
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
        const [data] = yield dbConn.query(sql, categoryId);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getProductionByObservation, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getProductionByProductCategoryName = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const sql = `
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
        const [data] = yield dbConn.query(sql, [`%${name}%`]);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getProductionByObservation, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const addProduction = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, date, amount, observation } = req.body;
        const sql = `
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
        yield dbConn.query(sql, [productId, date, amount, observation]);
        yield dbConn.commit();
        res.status(201).json({ message: "Nova produção adicionada." });
    }
    catch (err) {
        console.log(`Endpoint: addProduction, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
