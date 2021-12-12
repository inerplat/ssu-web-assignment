const SSUDB = require("../config/DbConfig");

class MsgRepository {
    constructor(table) {
        this.table = table;
        this.columns = [
            "suser",
            "duser",
            "msg",
        ]
        this.conn = SSUDB
    }

    async insertMsg(suser, duser, msg) {
        const sql = `INSERT INTO ${this.table} (${this.columns.join(",")})
                     VALUES (?, ?, ?)`;
        const params = [suser, duser, msg];
        return this.conn.query(sql, params);
    }

    async getMsg(suser, duser) {
        const sql = `SELECT *
                     FROM ${this.table}
                     WHERE suser = ?
                       AND duser = ?`;
        const params = [suser, duser];
        return this.conn.query(sql, params);
    }

    async getMsgBoth(suser, duser) {
        const sql = `SELECT *
                     FROM ${this.table}
                     WHERE (suser = ? AND duser = ?)
                        OR (suser = ? AND duser = ?)
                     ORDER BY sendAt`
        const params = [suser, duser, duser, suser];
        return this.conn.query(sql, params);
    }
}

module.exports = MsgRepository;