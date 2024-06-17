import { Request, Response } from 'express';
import mysql from 'mysql2/promise';

export const getCategories = async (_: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const sql = `select * from categoria`;

        const [data] = await dbConn.query(sql);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log("Erro ao obter dados da tabela genero.");
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}