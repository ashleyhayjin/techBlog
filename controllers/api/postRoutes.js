const router = require('express').Router();
const { User, Post } = require('../../models');

router.get('/', async (req,res ) => {
  try {
    const postData = await Post.create({
      postTitle: req.body.postTitle,
      postContent: req.body.postContent,
    });
  } catch (err){
    res.status(400).json(err);
  }
})


module.exports = router;
