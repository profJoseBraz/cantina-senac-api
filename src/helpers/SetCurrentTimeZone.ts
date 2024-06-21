import mysql from 'mysql2/promise';

export const SetCurrentTimeZone = async (timeZoneDescription : string, closeConn : boolean, dbConn : mysql.Connection) => {
    try {
        const sql = `set time_zone = ?`;
        await dbConn.query(sql, [timeZoneDescription]);
    } catch (err) {
        console.log(`Endpoint: SetCurrentTimeZone, Erro: ${err}`);
    } finally {
        if(dbConn && closeConn){
            dbConn.end();
        }
    }
}