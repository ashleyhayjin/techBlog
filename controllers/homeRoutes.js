const router = require('express').Router();
const { User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
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
                attributes: ['comment_words'],
                include: {
                    model:User,
                    attributes: ["username"]
                }
            }
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true}));
    
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
        const postData = await Post.findOne({
            where:{
                id: req.params.id
            },
            attributes: [
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
                attributes: ['comment_words'],
                include: {
                    model:User,
                    attributes: ["username"]
                }
            }
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true}));
    
    res.render('single-post', {
        posts,
        loggedIn: req.session.loggedIn
    });
    
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router;

