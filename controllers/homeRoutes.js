const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment} = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                'title',
                'words',
                "id",
            ],
            include: [
            {
                model:User,
                attributes: ['username'],
            },
            {
                model: Comment,
                attributes: ['comment_words', 'id', 'post_id', 'user_id', 'created_at'],
                include: {
                    model:User,
                    attributes: ["username"]
                }
            }
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true}));
        console.log("Posts for Homepage:" ,posts)
    res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
    });
    
    } catch (err) {
        res.status(500).json(err)
    }
});



router.get('/newPost', (req,res) => {
    console.log("req.session:", req.session);
    if(req.session.loggedIn){
      res.render('newPost',{
        loggedIn: true,
        username: req.session.username,
      });
    }
});

router.get('/login', async (req,res) => {
    console.log('req.session: ', req.session);
    if (req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req,res) => {
    res.render('signup');
})

router.get('/post/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const postData = await Post.findOne({
            where:{
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'words',
            ],
            include: [
            {
                model:User,
                attributes: ['username'],
            },
            {
                model: Comment,
                attributes: ['comment_words', 'user_id', 'post_id', 'created_at'],
                include: {
                    model:User,
                    attributes: ["username"]
                }
            }
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true}));
        console.log("Post for Individual:", posts)
    res.render('single-post', {
        posts,
        loggedIn: req.session.loggedIn
    });
    
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router;

