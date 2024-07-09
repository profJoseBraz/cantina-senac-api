var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const getAllRestrictionProduct = (_, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `
            select
                rp.id,
                json_object(
                    'id', p.id,
                    'categoria', JSON_OBJECT(
                        'id', c.id,
                        'nome', c.nome
                    ),
                'nome', p.nome,
                'descricao', p.descricao,
                'valor', p.valor,
                'imagem', p.imagem 
                ) as produto,
                json_object(
                    'id', r.id,
                    'nome', r.nome,
                    'descricao', r.descricao 
                ) as restricao
            from
                restricao_produto rp
            join produto p
                on p.id = rp.id_produto
            join restricao r
                on r.id = rp.id_retricao
            join categoria c 
                on c.id = p.id_categoria`;
        const [data] = yield dbConn.query(sql);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getAllRestrictionProduct, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getRestrictionProductByRestrictionId = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restrictionId } = req.query;
        const sql = `
            select
                rp.id,
                json_object(
                    'id', p.id,
                    'categoria', JSON_OBJECT(
                        'id', c.id,
                        'nome', c.nome
                    ),
                'nome', p.nome,
                'descricao', p.descricao,
                'valor', p.valor,
                'imagem', p.imagem 
                ) as produto,
                json_object(
                    'id', r.id,
                    'nome', r.nome,
                    'descricao', r.descricao 
                ) as restricao
            from
                restricao_produto rp
            join produto p
                on p.id = rp.id_produto
            join restricao r
                on r.id = rp.id_retricao
            join categoria c 
                on c.id = p.id_categoria
            where
                r.id = ?`;
        const [data] = yield dbConn.query(sql, [restrictionId]);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getAllRestrictionProductById, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
export const getRestrictionProductByProductId = (req, res, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.query;
        const sql = `
            select
                rp.id,
                json_object(
                    'id', p.id,
                    'categoria', JSON_OBJECT(
                        'id', c.id,
                        'nome', c.nome
                    ),
                'nome', p.nome,
                'descricao', p.descricao,
                'valor', p.valor,
                'imagem', p.imagem 
                ) as produto,
                json_object(
                    'id', r.id,
                    'nome', r.nome,
                    'descricao', r.descricao 
                ) as restricao
            from
                restricao_produto rp
            join produto p
                on p.id = rp.id_produto
            join restricao r
                on r.id = rp.id_retricao
            join categoria c 
                on c.id = p.id_categoria
            where
                p.id = ?`;
        const [data] = yield dbConn.query(sql, [productId]);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(`Endpoint: getAllRestrictionProductById, Erro: ${err}`);
        return res.status(500).json(err);
    }
    finally {
        if (dbConn) {
            dbConn.end();
        }
    }
});
