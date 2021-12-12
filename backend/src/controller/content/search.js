const express = require('express');
const router = express.Router();
const ContentService = require("../../service/ContentService");


router.get('/hashtag/:tag', async (req, res) => {
    const tag = req.params.tag;
    const contentService = new ContentService()
    const content = await contentService.hashtag(tag)
    res.status(200).send(content);
});

router.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    const contentService = new ContentService()
    const content = await contentService.userid(id)
    res.status(200).send(content);
});

router.get('/text/:text', async (req, res) => {
    const text = req.params.text;
    const contentService = new ContentService()
    const content = await contentService.body(text)
    res.status(200).send(content);
});

module.exports = router;