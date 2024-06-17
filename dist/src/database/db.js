var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
const host = process.env.MYSQLHOST;
const port = process.env.MYSQLPORT;
const user = process.env.MYSQLUSER;
const password = process.env.MYSQLPASSWORD;
const database = process.env.MYSQLDATABASE;
const mysqlUrl = `mysql://${user}:${password}@${host}:${port}/${database}`;
export const createNewConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield mysql.createConnection(mysqlUrl);
        return db;
    }
    catch (err) {
        console.log(`Erro ao se conectar ao banco de dados (${process.env.MYSQLDATABASE}): ${err}`);
        throw err;
    }
});
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield createNewConnection();
    if (db) {
        console.log(`Conexão bem-sucedida ao banco de dados MySQL (${process.env.MYSQLDATABASE}).`);
        if (process.env.MYSQLHOST === 'localhost') {
            console.log(`Usando servidor LOCAL.`);
        }
        db.end();
    }
});
// testConnection();
