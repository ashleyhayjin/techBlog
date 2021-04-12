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
  try {
    console.log(req.body);
    const userData = await User.create(
      {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    req.session.save(() => {
      req.session.username = userData.username;
      req.session.email= userData.email;
      req.session.password = userData.password;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });   
    } catch (err) {
      res.status(400).json(err);
  }
});
module.exports = router;
