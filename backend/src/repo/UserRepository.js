const SSUDB = require("../config/DbConfig");

class UserRepository {
    constructor(table) {
        this.table = table;
        this.columns = [
            "seq",
            "id",
            "username",
            "password",
            "email",
        ]
        this.conn = SSUDB
    }

    async insertUser(user) {
        return this.conn.query(
            `INSERT INTO ${this.table}
             SET id=?, password=CONCAT('*', UPPER(SHA1(UNHEX(SHA1((?)))))), email=?, username=?`,
            [user.id, user.password, user.email, user.username]
        )
    }

    async getUser(user) {
        return this.conn.query(
            `SELECT id, email, username
             FROM ${this.table}
             WHERE id = ?`,
            [user.id]
        )
    }

    async matchUser(user) {
        return this.conn.query(
            `SELECT id, email, username
             FROM ${this.table}
             WHERE id = ?
               AND password = CONCAT('*', UPPER(SHA1(UNHEX(SHA1((?))))))`,
            [user.id, user.password]
        )
    }

    async getAll() {
        return this.conn.query(
            `SELECT id, email, username
             FROM ${this.table}
             ORDER BY seq`
        )
    }

    async getAllUserWithFollow(user) {
        console.log(user.id)
        const customQuery = `select user.id, user.email, user.username, friend.type
                             from user
                                      left join friend on (user.id = friend.duser and friend.suser = ?)
                             ORDER BY user.seq`
        return this.conn.query(customQuery, [user.id])
    }
}

module.exports = UserRepository