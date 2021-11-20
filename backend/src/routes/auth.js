const express = require('express');
const router = express.Router();
const passport = require('passport')
const path = require('path')


router.post('/login', (req, res, next)=>{
    passport.authenticate('local', (err, user, info)=>{
        if(err) {return next(err)}
        console.log(info)
        if(user){
            req.logIn(user, (err)=>{
                if(err) {return next(err)}
                res.send({"login": true})
            })
        }else{
            console.log(user)
            res.send({"login": false})
        }
    })(req, res, next)
})

router.get('/logout', (req, res)=>{
    req.logout()
    res.redirect('/login')
})

router.get('/user', (req, res)=>{
    if(req.user)
        res.json(req.user)
    else
        res.status(400).json("{}")
})

module.exports = router