const express = require('express');
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const passportConfig = require('./passport/ssu-dev')
const cors = require('cors');

const app = express()
const port = 10002
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: false, cookie: {_expires: (60 * 60 * 1000)}}));
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

app.use('/api/v1', require('./routes/auth'))

app.listen(port)
