const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

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


router.post('/', withAuth, async (req,res ) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      words: req.body.words,
      user_id: req.session.user_id
    });
    res.status(200).json(postData);
  } catch (err){
    res.status(400).json(err);
  }
});

router.put("/:id", async (req,res) => {
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
});




module.exports = router;
