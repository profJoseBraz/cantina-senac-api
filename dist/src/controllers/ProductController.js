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
                * 
            from 
                produto p
            join categoria c 
                on c.id = p.id_categoria`;
        const [data] = yield dbConn.query(sql);
        console.log(data);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`End point: getAllProducts, Erro: ${err}`);
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
                * 
            from 
                produto p
            join categoria c 
                on c.id = p.id_categoria
            where
                p.id = ?`;
        const [data] = yield dbConn.query(sql, [id]);
        console.log(data);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`End point: getProductsById, Erro: ${err}`);
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
                * 
            from 
                produto p
            join categoria c 
                on c.id = p.id_categoria
            where
                c.id = ?`;
        const [data] = yield dbConn.query(sql, [categoryId]);
        console.log(data);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`End point: getProductsById, Erro: ${err}`);
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
                * 
            from 
                produto p
            join categoria c 
                on c.id = p.id_categoria
            where
                p.nome like ?`;
        const [data] = yield dbConn.query(sql, [`${name}%`]);
        console.log(data);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`End point: getProductsByName, Erro: ${err}`);
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
                * 
            from 
                produto p
            join categoria c 
                on c.id = p.id_categoria
            where
                p.descricao like ?`;
        const [data] = yield dbConn.query(sql, [`${description}%`]);
        console.log(data);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`End point: getProductsByDescription, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
