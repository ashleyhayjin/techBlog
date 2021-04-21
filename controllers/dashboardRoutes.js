const router = require('express').Router();
const { User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req,res) => {
   
    try{
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'created_at',
                'words',
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_words', 'user_id', 'post_id','created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                } 
            ],
        });
        
        const posts = postData.map((post) => post.get({ plain: true}));
        console.log(posts)
        res.render('dashboard', {
            posts,
            loggedIn: true,
        }); 
    } catch(err){
        res.status(500).json(err)
    }
});







module.exports = router;