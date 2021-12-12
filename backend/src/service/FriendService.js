const FriendRepository = require("../repo/FriendRepository");

class FriendService {
    constructor(user) {
        this.user = user;
        this.repository = new FriendRepository('friend');
    }

    async addFollow(dist) {
        console.log(dist)
        const result = await this.repository.addFollow(this.user, dist, 'F')
        if (result[0].affectedRows > 0) {
            return {
                status: true,
            }
        } else {
            return {
                status: false,
            }
        }
    }

    async deleteFollow(dist) {
        const result = await this.repository.deleteFollow(this.user, dist, 'F')
        if (result[0].affectedRows > 0) {
            return {
                status: true,
            }
        } else {
            return {
                status: false,
            }
        }
    }

    async getAllFollow() {
        const [follower, followee] = await Promise.all([this.getFollowers(), this.getFollowee()])
        return {
            status: true,
            follower: follower.length,
            followee: followee.length,
        }
    }

    async getFollowers() {
        const result = await this.repository.getFollowers(this.user, 'F')
        return result[0]
    }

    async getFollowee() {
        const result = await this.repository.getFollowee(this.user, 'F')
        return result[0]
    }

    async getChatUser() {
        const result = await this.repository.getChatUser(this.user, 'F')
        return result[0]
    }
}

module.exports = FriendService;