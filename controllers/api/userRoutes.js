const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.create(
      {
      username: req.body.username,
      password: req.body.password
    });
    req.session.save(() => {
      req.session.username = userData.username;
      req.session.password = userData.password;
      req.session.loggedIn = true;
      res.status(200).json(userData);
    });   
    } catch (err) {
      res.status(400).json(err);
  }
});

router.post('/login', async (req,res) => {
  try {
    console.log('req' , req);
    const userData = await User.findOne({ 
      where: { username: req.body.username} });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;