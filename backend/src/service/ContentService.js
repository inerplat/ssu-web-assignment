const ContentRepository = require('../repo/ContentRepository')
const HashtagRepository = require('../repo/HashtagRepository')
const Hashtag = require('../model/Hashtag')
const pool = require("../config/DbConfig")
const mysql = require("mysql2/promise");

class ContentService {
    constructor() {
        this.conn = pool
        this.contentRepository = new ContentRepository(this.conn, 'post')
        this.hashtagRepository = new HashtagRepository(this.conn, 'hashtag')
    }

    async getPage(p) {
        try {
            let [rows, fields] = await this.contentRepository.findPostByPage(p)
            if (rows.length > 0) {
                return {
                    status: true,
                    message: '게시물 조회 성공',
                    data: rows
                }
            }
        } catch (err) {
            throw err
        }
    }

    async getContent(seq) {
        try {
            let [rows, fields] = await this.contentRepository.findPostBySeq(seq)
            if (rows.length === 1) {
                return {
                    status: true,
                    message: '게시물 조회 성공',
                    data: rows[0]
                }
            }
        } catch (err) {
            throw err
        }
    }

    async setHashtag(id, post) {
        const hashtag = post.getHashtag()
        if (hashtag.length === 0)
            return -1
        const hashtagArray = hashtag.map(hash => {
            return new Hashtag(hash, id)
        })
        const resultHashtag = await this.hashtagRepository.save(hashtagArray)
        return resultHashtag[0].affectedRows
    }

    async save(post) {
        try {
            const resultPost = await this.contentRepository.save(post)
            if (resultPost[0].affectedRows !== 1) {
                throw new Error('Error while saving post')
            }
            let hashtagResult = this.setHashtag(resultPost[0].insertId, post)
            if (resultPost[0].affectedRows === 1 && hashtagResult !== 0) {
                return {
                    status: true,
                    message: '게시물 저장 성공',
                    data: resultPost[0]
                }
            }
        } catch (err) {
            console.log(err)
            return {
                status: false,
                message: '게시물 저장 실패',
                data: err
            }
        }
    }

    async edit(id, post) {
        try {
            const resultPost = await this.contentRepository.updatePost(id, post)
            if (resultPost[0].affectedRows !== 1) {
                throw new Error('Error while saving post')
            }
            await this.hashtagRepository.delete(id)
            let hashtagResult = await this.setHashtag(id, post)
            if (resultPost[0].affectedRows === 1 && hashtagResult !== 0) {
                return {
                    status: true,
                    message: '게시물 저장 성공',
                    data: resultPost[0]
                }
            }
        } catch (err) {
            console.log(err)
            return {
                status: false,
                message: '게시물 저장 실패',
                data: err
            }
        }
    }

    async delete(seq) {
        try {
            const resultPost = await this.contentRepository.deleteBySeq(seq)
            if (resultPost[0].affectedRows !== 1) {
                throw new Error('Error while deleting post')
            }
            await this.hashtagRepository.delete(seq)
            return {
                status: true,
                message: '게시물 삭제 성공',
                data: resultPost[0]
            }
        } catch (err) {
            console.log(err)
            return {
                status: false,
                message: '게시물 삭제 실패',
                data: err
            }
        }
    }

    async count() {
        try {
            const result = await this.contentRepository.count()
            return {
                status: true,
                message: '게시물 수 조회 성공',
                data: result[0][0].count
            }
        } catch (err) {
            console.log(err)
            return {
                status: false,
                message: '게시물 수 조회 실패',
                data: err
            }
        }
    }

    async getAll() {
        const result = await this.contentRepository.findAllPost()
        if (result[0].length > 0) {
            return {
                status: true,
                message: '게시물 조회 성공',
                data: result[0]
            }
        } else {
            return {
                status: false,
                message: '게시물 조회 실패',
                data: result[0]
            }
        }
    }

    async hashtag(tag) {
        const hashResult = await this.hashtagRepository.findPostidByHashtag(tag)
        const seqArray = hashResult[0].map(data => {
            return data.postid
        })
        const result = await this.contentRepository.findAllBySeqArray(seqArray)
        if (result[0].length > 0) {
            return {
                status: true,
                message: '게시물 조회 성공',
                data: result[0]
            }
        } else {
            return {
                status: false,
                message: '게시물 조회 실패',
                data: result[0]
            }
        }
    }

    async userid(id) {
        const result = await this.contentRepository.findAllById(id)
        if (result[0].length > 0) {
            return {
                status: true,
                message: '게시물 조회 성공',
                data: result[0]
            }
        } else {
            return {
                status: false,
                message: '게시물 조회 실패',
                data: result[0]
            }
        }
    }

    async body(body) {
        const result = await this.contentRepository.findAllByTextContains(body)
        if (result[0].length > 0) {
            return {
                status: true,
                message: '게시물 조회 성공',
                data: result[0]
            }
        } else {
            return {
                status: false,
                message: '게시물 조회 실패',
                data: result[0]
            }
        }
    }
}

module.exports = ContentService;