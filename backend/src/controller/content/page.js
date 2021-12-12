const express = require('express');
const router = express.Router();
const ContentService = require("../../service/ContentService");

router.get('/page/', async (req, res) => {
    if (!req.user)
        return res.status(401).json({error: 'Unauthorized'});
    const contentService = new ContentService()
    const content = await contentService.getAll()
    res.status(200).json(content)
});

router.get('/page/:id', async (req, res) => {
    if (!req.user)
        return res.status(401).json({error: 'Unauthorized'});
    const postService = new ContentService()
    const content = await postService.getPage(req.params.id)
    res.status(200).json(content)
});

module.exports = router;