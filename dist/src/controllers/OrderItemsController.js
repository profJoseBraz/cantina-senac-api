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
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getAllOrderItems, Erro: ${err}`);
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
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getOrderItemsById, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getOrderItemsByOrderId = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.query;
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
                p.id like ?`;
        const [data] = yield dbConn.query(sql, [orderId]);
        console.log(data);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getOrderItemsByOrderId, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getOrderItemsByProductId = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.query;
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
                pr.id like ?`;
        const [data] = yield dbConn.query(sql, [productId]);
        console.log(data);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getOrderItemsByProductId, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getOrderItemsTotalById = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const sql = `
            select
                p.id as id,
                p.nome_cliente as nome_cliente,
                date_format(date(p.data), '%d/%m/%Y') as data,
                time(p.data) as hora,
                sum(p2.valor * ip.quantidade) as valor_total 
            from
                itens_pedido ip 
            join pedido p 
                on p.id = ip.id_pedido 
            join produto p2 
                on p2.id = ip.id_produto
            where
                p.id = ?
            group by
                p.id,
                p.nome_cliente`;
        const [data] = yield dbConn.query(sql, [id]);
        console.log(data);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getOrderItemsByProductId, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const addOrderItems = (orderId, closeConn, req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderItems } = req.body;
        const sql = `
            insert into itens_pedido 
                (
                    id_pedido,
                    id_produto,
                    quantidade
                )
            values
                (
                    ?,
                    ?,
                    ?
                )`;
        dbConn.beginTransaction();
        for (const orderItem of orderItems) {
            try {
                yield dbConn.query(sql, [orderId, orderItem.productId, orderItem.amount]);
            }
            catch (error) {
                throw new Error(`Erro ao inserir os itens do pedido. Motivo: ${error}`);
            }
        }
        yield dbConn.commit();
        console.log(`Itens adicionados com sucesso.`);
    }
    catch (err) {
        if (dbConn) {
            dbConn.rollback();
        }
        console.log(`Endpoint: addOrderItems, Erro: ${err}`);
    }
    finally {
        if (dbConn && closeConn) {
            dbConn.end();
        }
    }
});
