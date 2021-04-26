const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');

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
    res.status(200).json(postData);
  } catch (err){
    res.status(400).json(err);
  }
})

router.put("/edit/:id", async (req,res) => {
  try {
    const postData = await Post.update({
      title: req.body.title,
      words: req.body.words
    },
    {
      where:{
        id: req.params.id
      }
    }) 
    res.status(200).json(postData);
  } catch (err){
    console.log(err);
  }
})

router.get('/', async (req, res) => {
  try { 
    const postData = await Post.findAll({
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
    const post = postData.map((post) => post.get({ plain:true}));

  } catch(err){
    res.status(500).json(err);
  }
});



module.exports = router;
