import mysql from 'mysql2/promise';
import dotenv from 'dotenv'

dotenv.config();

const host = process.env.MYSQLHOST;
const port = process.env.MYSQLPORT;
const user = process.env.MYSQLUSER;
const password = process.env.MYSQLPASSWORD;
const database = process.env.MYSQLDATABASE;

const mysqlUrl = `mysql://${user}:${password}@${host}:${port}/${database}`;

export const createNewConnection = async () => {
    try {
        const db = await mysql.createConnection(mysqlUrl);
        return db;
    } catch (err) {
        console.log(`Erro ao se conectar ao banco de dados (${process.env.MYSQLDATABASE}): ${err}`);
        throw err;
    }
};

const testConnection = async () => {
    const db = await createNewConnection();

    if(db){
        console.log(`Conexão bem-sucedida ao banco de dados MySQL (${process.env.MYSQLDATABASE}).`);
        
        if(process.env.MYSQLHOST === 'localhost'){
            console.log(`Usando servidor LOCAL.`)
        }
        
        db.end();
    }
}
 
// testConnection();