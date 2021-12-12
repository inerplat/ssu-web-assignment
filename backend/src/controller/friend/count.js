const express = require('express');
const router = express.Router();
const FriendService = require("../../service/FriendService");


router.get('/', async (req, res) => {
    if (!req.user)
        res.status(400).send("User not logged in");
    const friendService = new FriendService(req.user.id);
    res.status(200).json(await friendService.getAllFollow())
})

module.exports = router;