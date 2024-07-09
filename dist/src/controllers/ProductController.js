var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const getAllProducts = (_, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `
            select 
                p.id,
                p.nome,
                p.descricao,
                p.valor,
                p.imagem,
                json_object('id', c.id, 'nome', c.nome) as categoria
            from 
                produto p
            join categoria c 
                on c.id = p.id_categoria
            order by
                2`;
        const [data] = yield dbConn.query(sql);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getAllProducts, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getProductsById = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const sql = `
            select 
                p.id,
                p.nome,
                p.descricao,
                p.valor,
                p.imagem,
                json_object('id', c.id, 'nome', c.nome) as categoria 
            from 
                produto p
            join categoria c 
                on c.id = p.id_categoria
            where
                p.id = ?`;
        const [data] = yield dbConn.query(sql, [id]);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getProductsById, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getProductsByCategoryId = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.query;
        const sql = `
            select 
                p.id,
                p.nome,
                p.descricao,
                p.valor,
                p.imagem,
                json_object('id', c.id, 'nome', c.nome) as categoria 
            from 
                produto p
            join categoria c 
                on c.id = p.id_categoria
            where
                c.id = ?
            order by
                2`;
        const [data] = yield dbConn.query(sql, [categoryId]);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getProductsById, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getProductsByName = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const sql = `
            select 
                p.id,
                p.nome,
                p.descricao,
                p.valor,
                p.imagem,
                json_object('id', c.id, 'nome', c.nome) as categoria 
            from 
                produto p
            join categoria c 
                on c.id = p.id_categoria
            where
                p.nome like ?
            order by
                2`;
        const [data] = yield dbConn.query(sql, [`${name}%`]);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getProductsByName, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getProductsByDescription = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description } = req.query;
        const sql = `
            select 
                p.id,
                p.nome,
                p.descricao,
                p.valor,
                p.imagem,
                json_object('id', c.id, 'nome', c.nome) as categoria 
            from 
                produto p
            join categoria c 
                on c.id = p.id_categoria
            where
                p.descricao like ?
            order by
                2`;
        const [data] = yield dbConn.query(sql, [`${description}%`]);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getProductsByDescription, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const addProduct = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId, name, description, value, image } = req.body;
        const sql = `
            insert into produto 
                (
                    id_categoria, 
                    nome, 
                    descricao, 
                    valor, 
                    imagem
                )
            values
                (
                    ?, 
                    ?, 
                    ?, 
                    ?,
                    ?
                )`;
        dbConn.beginTransaction();
        yield dbConn.query(sql, [categoryId, name, description, value, image]);
        yield dbConn.commit();
        res.status(201).json({ message: "Novo produto adicionado." });
    }
    catch (err) {
        console.log(`Endpoint: addProduct, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const updateProduct = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const { categoryId, name, description, value, image } = req.body;
        const sql = `
            update produto set
                id_categoria = ?, 
                nome = ?, 
                descricao = ?, 
                valor = ?, 
                imagem = ?
            where
                id = ?`;
        dbConn.beginTransaction();
        yield dbConn.query(sql, [categoryId, name, description, value, image, id]);
        yield dbConn.commit();
        res.status(200).json({ message: "Produto alterado com sucesso." });
    }
    catch (err) {
        console.log(`Endpoint: updateProduct, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const deleteProduct = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const sql = `
            delete from produto where id = ?`;
        dbConn.beginTransaction();
        yield dbConn.query(sql, [id]);
        yield dbConn.commit();
        res.status(200).json({ message: "Produto removido com sucesso." });
    }
    catch (err) {
        console.log(`Endpoint: deleteProduct, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
