const express = require('express');
const router = express.Router();


router.get('/user/session', (req, res) => {
    if (req.user)
        res.json(req.user)
    else
        res.status(400).json("{}")
})

module.exports = router