const express = require('express');
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const passportConfig = require('./passport/LoginProd')
const cors = require('cors');

const app = express()
const port = 10003
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(session({secret: 'secret', resave: true, saveUninitialized: false, cookie: {_expires: (60 * 60 * 1000)}}));
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

app.use('/file', express.static('static'));

app.use('/api/v1/auth', require('./controller/auth/signup'))
app.use('/api/v1/auth', require('./controller/auth/login'))
app.use('/api/v1/auth', require('./controller/auth/logout'))
app.use('/api/v1/auth', require('./controller/auth/userSession'))

app.use('/api/v1/friend', require('./controller/friend/root'))
app.use('/api/v1/friend/count', require('./controller/friend/count'))
app.use('/api/v1/friend/suggest', require('./controller/friend/suggest'))

app.use('/api/v1/content', require('./controller/content/upload'))
app.use('/api/v1/content', require('./controller/content/root'))
app.use('/api/v1/content', require('./controller/content/page'))
app.use('/api/v1/content/search', require('./controller/content/search'))

app.use('/api/v1/msg', require('./controller/msg/root'))

app.listen(port)
