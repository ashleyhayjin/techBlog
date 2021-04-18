const router = require('express').Router();
const { User, Post } = require('../../models');
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

// router.get('/', async (req,res ) => {
//   try {
//     console.log('req', req);
//     const postData = await Post.findAll({
//     });
//   } catch (err){
//     res.status(400).json(err);
//   }
// })



module.exports = router;
