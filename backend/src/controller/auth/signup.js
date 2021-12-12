const express = require('express');
const router = express.Router();
const User = require("../../model/User");
const UserService = require("../../service/UserService");

router.post('/signup', async (req, res) => {
    const user = new User({
        id: req.body.id,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
    if (!user.isValid())
        res.status(400).json({error: "id, pass, email, username을 입력해주세요"})
    try {
        const userService = new UserService('user')
        const signUpResult = await userService.signUp(user)
        if (signUpResult.status)
            res.status(200).json({success: "회원가입에 성공하였습니다"})
        else
            res.status(400).json({error: "중복된 아이디가 존재합니다"})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "회원가입 요청이 실패하였습니다"})
    }
})

router.get('/signup/duplicate', async (req, res) => {
    const user = new User({
        id: req.query.id,
        username: "",
        password: "",
        email: ""
    })

    const userService = new UserService('user')
    if ((await userService.search(user)).status)
        res.status(200).json({result: true})
    else
        res.status(200).json({result: false})
})

module.exports = router;