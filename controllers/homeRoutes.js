const router = require('express').Router();
const { User, Post} = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
            {
                model:User,
                attributes: ['username'],
            },
            ],
        });
    const posts = postData.map((post) => post.get({plain: true}));
    
    res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in
    });
    } catch (err) {
        res.status(500).json(err)
    }
});


router.get('/login', async (req,res) => {
res.render('login');
});

router.get('/signup', (req,res) => {
    res.render('signup');
})

module.exports = router;

