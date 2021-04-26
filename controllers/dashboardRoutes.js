const router = require('express').Router();
const { User, Post, Comment} = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

router.get('/',  async (req,res) => {
   
    try{
        console.log(req.session);
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
        res.render('allPost', {
            layout : "dashboard",
            posts,
            loggedIn: true,
        }); 

    } catch(err){
        res.status(500).json(err)
    }
});


router.get("/edit/:id", async (req,res) => {
   try{ 
       const postData = await Post.findOne({where: {id : req.params.id}, 
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
       console.log("data:", postData);
       const posts = postData.map((post) => post.get({ plain: true}));
       res.render('edit-post', {
           layout : "dashboard",
           posts,
           loggedIn: true,
       }); 

    } catch(err){
        res.status(500).json(err)
    }
});



module.exports = router;