var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SetCurrentTimeZone } from '../helpers/SetCurrentTimeZone.js';
import { addOrderItems } from './OrderItemsController.js';
export const getAllOrders = (_, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `
            select 
                p.id,
                json_object(
                    'id', fp.id, 
                    'nome', fp.nome
                ) as forma_pagamento,
                p.nome_cliente,
                date_format(date(p.data), '%d/%m/%Y') as data,
                time(p.data) as hora
            from 
                pedido p
            join forma_pagamento fp 
                on fp.id = p.id_forma_pagamento`;
        const [data] = yield dbConn.query(sql);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`End point: getAllOrders, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getOrdersById = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const sql = `
            select 
                p.id,
                json_object(
                    'id', fp.id, 
                    'nome', fp.nome
                ) as forma_pagamento,
                p.nome_cliente,
                date_format(date(p.data), '%d/%m/%Y') as data,
                time(p.data) as hora
            from 
                pedido p
            join forma_pagamento fp 
                on fp.id = p.id_forma_pagamento
            where
                p.id = ?`;
        const [data] = yield dbConn.query(sql, [id]);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`End point: getOrdersById, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getOrdersByPaymentMethodId = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paymentMethodId } = req.query;
        const sql = `
            select 
                p.id,
                json_object(
                    'id', fp.id, 
                    'nome', fp.nome
                ) as forma_pagamento,
                p.nome_cliente,
                date_format(date(p.data), '%d/%m/%Y') as data,
                time(p.data) as hora
            from 
                pedido p
            join forma_pagamento fp 
                on fp.id = p.id_forma_pagamento
            where
                fp.id = ?`;
        const [data] = yield dbConn.query(sql, [paymentMethodId]);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`End point: getOrdersByPaymentMethodId, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getOrdersByCustomerName = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerName } = req.query;
        const sql = `
            select 
                p.id,
                json_object(
                    'id', fp.id, 
                    'nome', fp.nome
                ) as forma_pagamento,
                p.nome_cliente,
                date_format(date(p.data), '%d/%m/%Y') as data,
                time(p.data) as hora
            from 
                pedido p
            join forma_pagamento fp 
                on fp.id = p.id_forma_pagamento
            where
                p.nome_cliente like ?`;
        const [data] = yield dbConn.query(sql, [`${customerName}%`]);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`End point: getOrdersByCustomerName, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getOrdersByDate = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, operator } = req.query;
        const sqlOperator = `set @operator := ?`;
        const sqlDate = `set @date := ?`;
        const sql = `
            select 
                p.id,
                json_object(
                    'id', fp.id, 
                    'nome', fp.nome
                ) as forma_pagamento,
                p.nome_cliente,
                date_format(date(p.data), '%d/%m/%Y') as data,
                time(p.data) as hora
            from 
                pedido p
            join forma_pagamento fp 
                on fp.id = p.id_forma_pagamento
            where
                case 
                    when @operator = '>' then date(p.data) > @date
                    when @operator = '<' then date(p.data) < @date
                    when @operator = '=' then date(p.data) = @date
                    else false
                end`;
        yield dbConn.query(sqlOperator, [operator]);
        yield dbConn.query(sqlDate, [date]);
        const [data] = yield dbConn.query(sql);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`End point: getOrdersByDate, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getOrdersByPaymentMethodName = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const sql = `
            select 
                p.id,
                json_object(
                    'id', fp.id, 
                    'nome', fp.nome
                ) as forma_pagamento,
                p.nome_cliente,
                date_format(date(p.data), '%d/%m/%Y') as data,
                time(p.data) as hora
            from 
                pedido p
            join forma_pagamento fp 
                on fp.id = p.id_forma_pagamento
            where
                fp.nome like ?`;
        const [data] = yield dbConn.query(sql, [`%${name}%`]);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`End point: getOrdersByCustomerName, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const addOrder = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paymentMethodId, customerName } = req.body;
        const sql = `
            insert into pedido
                (
                    id_forma_pagamento,
                    nome_cliente,
                    data
                )
            values
                (
                    ?,
                    ?,
                    now()
                )`;
        dbConn.beginTransaction();
        yield SetCurrentTimeZone('America/Sao_Paulo', false, dbConn);
        const [result] = yield dbConn.query(sql, [paymentMethodId, customerName]);
        yield addOrderItems(result.insertId, false, req, res, dbConn);
        yield dbConn.commit();
        console.log(`Novo pedido cadastrado.`);
        res.status(201).json({ message: "Novo pedido cadastrado." });
    }
    catch (err) {
        if (dbConn) {
            dbConn.rollback();
        }
        console.log(`Endpoint: addOrder, Erro: ${err}`);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
