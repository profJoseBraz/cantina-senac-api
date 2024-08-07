var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const getAllCategories = (_, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `
            select 
                * 
            from 
                categoria`;
        const [data] = yield dbConn.query(sql);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getCategories, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getCategoriesById = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const sql = `
            select 
                * 
            from 
                categoria 
            where 
                id = ?`;
        const [data] = yield dbConn.query(sql, [id]);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getCategoriesById, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getCategoriesByName = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const sql = `
            select 
                * 
            from 
                categoria 
            where 
                nome like ?`;
        const [data] = yield dbConn.query(sql, [`${name}%`]);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getCategoriesByName, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const addCategory = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, } = req.body;
        const sql = `
            insert into categoria
                (
                    nome
                )
            values
                (
                    ?
                )`;
        dbConn.beginTransaction();
        yield dbConn.query(sql, [name]);
        yield dbConn.commit();
        console.log(`Nova categoria cadastrada.`);
        res.status(201).json({ message: "Nova categoria cadastrada." });
    }
    catch (err) {
        if (dbConn) {
            dbConn.rollback();
        }
        console.log(`Endpoint: add, Erro: ${err}`);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
