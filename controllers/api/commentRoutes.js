const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', async (req,res) => {
    try{
        const commentData = await Comment.findAll({})
    } catch(err){
        res.status(500).json(err);
    }
})


router.post('/', async (req,res) => {
    try{
        const commentData = await Comment.create({
            comment_words: req.body.comment_words,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
        res.status(200).json(commentData);
    } catch(err){
        res.status(400).json(err);
    }
})

router.delete('/:id', async (req,res) => {
    try{
        const commentData = await Comment.destroy({
           where:{
               id: req.params.id
           }
        })
    } catch(err){
        res.status(400).json(err);
    }
})

module.exports = router;