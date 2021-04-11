const router = require('express').Router();
const { User, Post } = require('../../models');

// router.get('/', (req, res) => {
//   console.log('======================');
//   Post.findAll({
//       attributes: [
//           'id',
//           'title',
//           'created_at',
//           'words'
//       ],
//     include: {
//         model: User,
//         attributes: ['username']
//     }
//   })
//     .then(dbPostData => res.json(dbPostData))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.post('/', async (req, res) => {
  if (req.session.loggedIn)
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
