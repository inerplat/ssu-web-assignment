const express = require('express');
const router = express.Router();
const multerConfig = require('../../config/MulterConfig');
const Content = require("../../model/Content");
const PostService = require("../../service/ContentService");

router.post('/upload', multerConfig.array('imagesArray', 5), async (req, res) => {
    if (!req.user)
        return res.status(401).json({error: 'Unauthorized'});
    const content = new Content(req.user.id, req.body.text, req.files);
    const postService = new PostService();
    try {
        const result = await postService.save(content);
        if (result.status)
            return res.status(200).json({message: '게시물 업로드 성공'});
        else
            return res.status(400).json({error: '게시물 업로드 실패'});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: '서버 응답 오류'});
    }
});

router.post('/modify', multerConfig.array('imagesArray', 5), async (req, res) => {
    if (!req.user)
        return res.status(401).json({error: 'Unauthorized'});
    const prevImage = req.body.prev.trim().split(',').map(item => {
        return {filename: item}
    })
    const content = new Content(req.user.id, req.body.text, prevImage.concat(req.files));
    const postService = new PostService();
    console.log(content)
    try {
        console.log((await postService.getContent(req.body.postid)))
        if ((await postService.getContent(req.body.postid)).data.id !== req.user.id)
            return res.status(401).json({error: 'Unauthorized'});
        const result = await postService.edit(req.body.postid, content);
        if (result.status)
            return res.status(200).json({message: '게시물 업로드 성공'});
        else
            return res.status(400).json({error: '게시물 업로드 실패'});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: '서버 응답 오류'});
    }
    return res.status(200).json({message: '게시물 업로드 성공'});
});


module.exports = router;