const router = require('express').Router();
const { User, Post, Comment} = require('../models');
const sequelize = require('../config/connection');
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
        res.render('allPost', {
            layout : "dashboard",
            posts,
            loggedIn: true,
        }); 

    } catch(err){
        res.status(500).json(err)
    }
});


router.get("/edit/:id", withAuth, async (req,res) => {
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
        const posts = postData.get({ plain: true});
        console.log("posts: ", posts);

        res.render('edit-post', {
            layout : "dashboard",
            loggedIn: true,
            posts,
        }); 
        // res.status(200).json({message: "Succesfully edited post"});
        } catch(err){
            res.status(404).json({message: "No post found with this id"})
        }
});



module.exports = router;