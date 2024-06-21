var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const getAllPaymentMethods = (_, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `
            select 
                * 
            from 
                forma_pagamento`;
        const [data] = yield dbConn.query(sql);
        console.log(data);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getAllPaymentMethods, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getPaymentMethodsById = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const sql = `
            select 
                * 
            from 
                forma_pagamento
            where
                id = ?`;
        const [data] = yield dbConn.query(sql, [id]);
        console.log(data);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getPaymentMethodsById, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getPaymentMethodsByName = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const sql = `
            select 
                * 
            from 
                forma_pagamento
            where
                nome like ?`;
        const [data] = yield dbConn.query(sql, [`${name}%`]);
        console.log(data);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getPaymentMethodsByName, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
