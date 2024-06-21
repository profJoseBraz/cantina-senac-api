var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const SetCurrentTimeZone = (timeZoneDescription, closeConn, dbConn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `set time_zone = ?`;
        yield dbConn.query(sql, [timeZoneDescription]);
    }
    catch (err) {
        console.log(`Endpoint: SetCurrentTimeZone, Erro: ${err}`);
    }
    finally {
        if (dbConn && closeConn) {
            dbConn.end();
        }
    }
});
