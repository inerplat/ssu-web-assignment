const UserRepository = require("../repo/UserRepository");

class UserService {
    constructor(table) {
        this.repository = new UserRepository('user');
    }

    async signUp(user) {
        if ((await this.search(user)).status) {
            return {
                status: false,
                message: "이미 존재하는 아이디 입니다."
            }
        }
        const result = await this.repository.insertUser(user)
        if (result[0].affectedRows === 1) {
            return {
                status: true,
                message: "회원가입이 완료되었습니다."
            }
        } else {
            throw Error("INSERT 실패")
        }
    }

    async search(user) {
        const result = await this.repository.findUserById(user)
        if (result[0].length === 1) {
            return {
                status: true,
                message: "조회 성공",
                data: result[0][0]
            }
        } else {
            return {
                status: false,
                message: "조회 실패",
                data: {}
            }
        }

    }
    async searchEmail(user){
        const result = await this.repository.findUserByEmail(user)
        if (result[0].length !== 0) {
            return {
                status: true,
                message: "조회 성공",
                data: result[0][0]
            }
        } else {
            return {
                status: false,
                message: "조회 실패",
                data: {}
            }
        }
    }
    async validate(user) {
        const result = await this.repository.matchUser(user)
        if (result[0].length === 1) {
            return {
                status: true,
                message: "로그인 성공",
                data: result[0][0]
            }
        } else {
            return {
                status: false,
                message: "로그인 실패",
                data: {}
            }
        }
    }

    async suggest(user) {
        const result = await this.repository.getAllUserWithFollow(user)
        if (result[0].length > 0) {
            return {
                status: true,
                message: "조회 성공",
                data: result[0]
            }
        } else {
            return {
                status: false,
                message: "조회 실패",
                data: {}
            }
        }
    }
}

module.exports = UserService;