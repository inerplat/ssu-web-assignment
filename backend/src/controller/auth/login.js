const express = require('express');
const router = express.Router();
const passport = require('passport')


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err)
        }
        console.log(info)
        if (user) {
            req.logIn(user, (err) => {
                if (err) {
                    return next(err)
                }
                res.send({"login": true})
            })
        } else {
            console.log(user)
            res.send({"login": false})
        }
    })(req, res, next)
})

module.exports = router;