class User {
    constructor(user) {
        this.id = user.id
        this.password = user.password || ""
        this.username = user.username || ""
        this.email = user.email || ""
    }

    getUserWithoutPassword() {
        return {
            id: this.id,
            username: this.username,
            email: this.email
        }
    }

    getUser() {
        return {
            id: this.id,
            password: this.password,
            username: this.username,
            email: this.email,
        }
    }

    isValid() {
        return this.id !== "" && this.password !== "" && this.username !== "" && this.email !== ""
    }

    setUser(user) {
        this.id = user.id
        this.password = user.password || ""
        this.username = user.username || ""
        this.email = user.email || ""
    }
}

module.exports = User