import { Request, Response } from 'express';
import mysql from 'mysql2/promise';

export const getBdImgsToken = async (_: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const sql = 
            `
            select 
                banco_imgs_token 
            from 
                config`;

        const [data] = await dbConn.query(sql);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getBdImgsToken, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}