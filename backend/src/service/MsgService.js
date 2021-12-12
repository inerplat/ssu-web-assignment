const MsgRepository = require('../repo/MsgRepository');

class MsgService {
    constructor(user) {
        this.user = user
        this.repository = new MsgRepository('chat')
    }

    async send(friend, msg) {
        const result = await this.repository.insertMsg(this.user, friend, msg)
        if (result) {
            return {
                status: true,
                message: '전송 성공',
                data: result[0]
            }
        }
    }

    async get(friend) {
        const result = await this.repository.getMsgBoth(this.user, friend)
        if (result[0]) {
            return {
                status: true,
                message: '조회 성공',
                data: result[0]
            }
        }
    }
}

module.exports = MsgService