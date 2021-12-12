class ContentRepository {
    constructor(conn, table) {
        this.table = table;
        this.columns = [
            "seq",
            "id",
            "text",
            "file"
        ]
        this.conn = conn
    }

    async save(post) {
        const sql = `INSERT INTO ${this.table} (${this.columns.slice(1).join(",")})
                     VALUES (?, ?, ?)`;
        return this.conn.query(sql, [post.id, post.text, post.file]);
    }

    async findPostBySeq(id) {
        const sql = `SELECT *
                     FROM ${this.table}
                     WHERE seq = ?`;
        return this.conn.query(sql, [id]);
    }

    async findAllPost() {
        const sql = `SELECT *
                     FROM ${this.table}`;
        return this.conn.query(sql);
    }

    async count() {
        const sql = `SELECT COUNT(*) AS count
                     FROM ${this.table}`;
        return this.conn.query(sql);
    }

    async findPostByPage(page_no) {
        const sql = `SELECT *
                     FROM ${this.table}
                     ORDER BY seq DESC
                     LIMIT 9 OFFSET ?`;
        return this.conn.query(sql, (page_no - 1) * 9);
    }

    async deleteBySeq(seq) {
        const sql = `DELETE
                     FROM ${this.table}
                     WHERE seq = ?`;
        return this.conn.query(sql, [seq]);
    }

    async updatePost(seq, post) {
        const sql = `UPDATE ${this.table}
                     SET text = ?,
                         file = ?
                     WHERE seq = ?`;
        return this.conn.query(sql, [post.text, post.file, seq]);
    }

    async findAllBySeqArray(seqArray) {
        const sql = `SELECT *
                     FROM ${this.table}
                     WHERE seq IN (?)`;
        return this.conn.query(sql, [seqArray]);
    }

    async findAllById(id) {
        const sql = `SELECT *
                     FROM ${this.table}
                     WHERE id = ?`;
        return this.conn.query(sql, [id]);
    }

    async findAllByTextContains(text) {
        const sql = `SELECT *
                     FROM ${this.table}
                     WHERE text LIKE ?`;
        return this.conn.query(sql, ["%" + text + "%"]);
    }
}

module.exports = ContentRepository