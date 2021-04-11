const router = require('express').Router();
const { User, Post} = require('../models');

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


router.get('/login', async (req,res) => {
    if (req.session.cookie.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req,res) => {
    res.render('signup');
})

module.exports = router;

