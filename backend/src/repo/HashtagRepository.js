class HashtagRepository {
    constructor(conn, table) {
        this.table = table;
        this.columns = [
            "name",
            "postid",
        ]
        this.conn = conn
    }

    async save(hashtagArray) {
        const sql = `INSERT INTO ${this.table} (${this.columns.join(',')})
                     VALUES ?`;
        const values = hashtagArray.map(hashtag => [hashtag.name, hashtag.postid]);
        return this.conn.query(sql, [values]);
    }

    async delete(postid) {
        const sql = `DELETE
                     FROM ${this.table}
                     WHERE postid = ?`;
        return this.conn.query(sql, [postid]);
    }

    async findHashtagByPostid(postid) {
        const sql = `SELECT *
                     FROM ${this.table}
                     WHERE postid = ?`;
        const result = await this.conn.query(sql, postid);
        return new Hashtag(result.name, result.postid)
    }

    async findPostidByHashtag(tag) {
        const sql = `SELECT postid
                     FROM ${this.table}
                     WHERE name = ?`;
        return this.conn.query(sql, tag);
    }
}

module.exports = HashtagRepository;