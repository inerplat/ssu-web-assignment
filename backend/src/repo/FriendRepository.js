const SSUDB = require("../config/DbConfig");

class FriendRepository {
    constructor(table) {
        this.table = table;
        this.columns = [
            "seq",
            "suser",
            "duser",
            "type"
        ]
        this.conn = SSUDB
    }

    async addFollow(suser, duser, type) {
        const sql = `INSERT INTO ${this.table} (suser, duser, type)
                     VALUES (?, ?, ?)`;
        const params = [suser, duser, 'F'];
        return this.conn.query(sql, params);
    }

    async deleteFollow(suser, duser) {
        console.log(suser, duser);
        const sql = `DELETE
                     FROM ${this.table}
                     WHERE suser = ?
                       AND duser = ?
                       AND type = 'F'`;
        const params = [suser, duser];
        return this.conn.query(sql, params);
    }

    async getFollowers(duser) {
        const sql = `SELECT *
                     FROM ${this.table}
                     WHERE duser = ?`;
        const params = [duser];
        return this.conn.query(sql, params);
    }

    async getFollowee(suser) {
        const sql = `SELECT *
                     FROM ${this.table}
                     WHERE suser = ?`;
        const params = [suser];
        return this.conn.query(sql, params);
    }

    async getChatUser(suser) {
        const customSql = `SELECT friend.duser, user.username
                           from friend,
                                user
                           where friend.duser = user.id
                             and friend.suser = ?
                             and EXISTS(SELECT 1 FROM friend WHERE friend.duser = ? and friend.suser = user.id)`
        const params = [suser, suser];
        return this.conn.query(customSql, params);
    }
}

module.exports = FriendRepository