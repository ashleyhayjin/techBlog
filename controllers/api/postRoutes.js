const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const { findOne } = require('../../models/Post');

router.post('/', async (req,res ) => {
  try {
    console.log('req', req);
    const userData = await User.findOne({ where: {username : req.session.username}})
    console.log("userData", userData);
    const postData = await Post.create({
      title: req.body.title,
      words: req.body.words,
      user_id: userData.id
    });
  } catch (err){
    res.status(400).json(err);
  }
})

router.get('/:id', async (req, res) => {
  try { 
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'created_at',
        'words'
      ],
      include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Comment,
            attributes: ['id', 'comment_words', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
        ]
    });
    const singlePosts = postData.map((singlePost) => singlePost.get({ plain:true}));

    res.render('single-post' , {
      singlePosts,
    }); 
  } catch(err){
    res.status(500).json(err);
  }
});


module.exports = router;
