const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path')
require('dotenv').config({path: path.join(__dirname, '../.env')});

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',
        session: true,
        passReqToCallback: false,
    }, (id, password, done) => {
        if (id === "login") {
            return done(null, {"id": id}, {message: "로그인 성공"})
        } else {
            return done(null, false, {message: "유효하지 않은 계정입니다"})
        }
    }))
};