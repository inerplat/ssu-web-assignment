const express = require('express');
const router = express.Router();
const FriendService = require('../../service/FriendService');

router.get('/', async (req, res) => {
    if (!req.user)
        return res.status(401).json({error: 'Unauthorized'});
    const friendService = new FriendService(req.user.id)
    try {
        const friends = await friendService.getChatUser()
        return res.json(friends);
    } catch (error) {
        return res.status(500).json({error: '조회 실패'});
    }
});

router.put('/', async (req, res) => {
    if (!req.user)
        return res.status(401).json({error: 'Unauthorized'});
    const friendService = new FriendService(req.user.id)
    try {
        const friend = await friendService.addFollow(req.body.id);
        if (friend.status) {
            return res.status(200).json({message: '팔로우 성공'});
        } else {
            return res.status(400).json({error: '팔로우 실패'});
        }
    } catch (error) {
        return res.status(500).json({error: '서버가 응답할 수 없음'});
    }
});

router.delete('/', async (req, res) => {
    if (!req.user)
        return res.status(401).json({error: 'Unauthorized'});
    const friendService = new FriendService(req.user.id)
    try {
        const friend = await friendService.deleteFollow(req.body.id);
        if (friend.status) {
            return res.status(200).json({message: '언팔로우 성공'});
        } else {
            return res.status(400).json({error: '언팔로우 실패'});
        }
    } catch (error) {
        return res.status(500).json({error: '서버가 응답할 수 없음'});
    }
});

module.exports = router;