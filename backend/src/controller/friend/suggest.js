const express = require('express');
const router = express.Router();
const UserService = require("../../service/UserService");
const User = require("../../model/User");

router.get('/', async (req, res) => {
    if (!req.user)
        res.status(400).send("User not logged in");
    const user = new User({
        id: req.user.id,
    })
    const userService = new UserService('user')
    try {
        const users = await userService.suggest(user)
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;