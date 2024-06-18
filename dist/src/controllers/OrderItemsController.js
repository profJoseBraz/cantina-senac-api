var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const getAllOrderItems = (_, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `
            select 
                * 
            from 
                itens_pedido ip
            join pedido p
                on p.id = ip.id_pedido 
            join produto pr
                on pr.id = ip.id_produto`;
        const [data] = yield dbConn.query(sql);
        console.log(data);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`End point: getAllOrderItems, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getOrderItemsById = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const sql = `
            select 
                * 
            from 
                itens_pedido ip
            join pedido p
                on p.id = ip.id_pedido 
            join produto pr
                on pr.id = ip.id_produto
            where
                ip.id = ?`;
        const [data] = yield dbConn.query(sql, [id]);
        console.log(data);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`End point: getOrderItemsById, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getOrderItemsByCustomerName = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome_cliente } = req.query;
        const sql = `
            select 
                * 
            from 
                itens_pedido ip
            join pedido p
                on p.id = ip.id_pedido 
            join produto pr
                on pr.id = ip.id_produto
            where
                p.nome_cliente like ?`;
        const [data] = yield dbConn.query(sql, [`${nome_cliente}%`]);
        console.log(data);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`End point: getOrderItemsById, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
