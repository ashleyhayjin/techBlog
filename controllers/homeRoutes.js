const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // console.log("session", session);
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
        console.log("Posts for Homepage:" ,posts);
    res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
    });
    
    } catch (err) {
        res.status(500).json(err)
    }
});



router.get('/newPost', withAuth, (req,res) => {
    if(req.session.loggedIn){
      res.render('newPost',{
        loggedIn: true,
        username: req.session.username
      });
      console.log("session", req.session);

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

router.get('/posts/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const postData = await Post.findOne({where: {id:req.params.id},
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
         const post = postData.get({ plain: true});
         console.log("postinfo", post);
    res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
    });
    
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router;

