const express = require('express');
const router = express.Router();
const Post = require("../../model/Content");
const ContentService = require("../../service/ContentService");


router.get('/specific/:id', async (req, res) => {
    const id = req.params.id;
    const contentService = new ContentService()
    const content = await contentService.getContent(id)
    res.status(200).send(content);
});

router.delete('/specific/:id', async (req, res) => {
    const id = req.params.id;
    const contentService = new ContentService()
    const content = await contentService.delete(id)
    res.status(200).send(content);
});

router.get('/count', async (req, res) => {
    if (!req.user)
        return res.status(401).json({error: 'Unauthorized'});
    const contentService = new ContentService()
    const count = await contentService.count()
    res.status(200).json(count)
});

module.exports = router;