const express = require('express');
const router = express.Router();
const MsgService = require('../../service/MsgService')

router.get('/', async (req, res) => {
    if (!req.user)
        return res.status(401).send('Unauthorized')
    try {
        const msgService = new MsgService(req.user.id)
        const getResult = await msgService.get(req.query.id)
        if (getResult.status)
            return res.status(200).send(getResult.data)
    } catch (e) {
        console.log(e)
        return res.status(500).send({error: '서버가 응답할 수 없습니다'})
    }
})

router.post('/', async (req, res) => {
    if (!req.user)
        return res.status(401).send('Unauthorized')
    try {
        const msgService = new MsgService(req.user.id)
        const postResult = await msgService.send(req.body.id, req.body.msg)
        if (postResult.status)
            return res.status(200).send({success: '전송 성공'})
        else
            return res.status(400).send({error: '전송 실패'})
    } catch (e) {
        console.log(e)
        return res.status(500).send({error: '서버가 응답할 수 없습니다'})
    }
})

module.exports = router