const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req,res) => {
 try { 
  const userData =  User.findAll({
      attributes: { exclude: ["password"]}
    });
    const users = userData.map((user) => user.get({ plain:true}));
  } catch (err){
    res.status(400).json(err);
  }
})

router.get('/:id', async (req,res) => {
  try { 
   const userData =  User.findOne({
       attributes: { exclude: ["password"]},
       where: {
         id: req.params.id,
       }, 
       include: [
         {
           model:Post,
           attributes: ["id", "title", "created_at", "words"]
         }, 
         {
           model: Comment,
           attributes: ["id", "comment_words", "created_at"],
           include: {
             model: Post,
             attributes: ["title"]             
           }
         }
       ]
     });
     const users = userData.map((user) => user.get({ plain:true}));
   } catch (err){
     res.status(400).json(err);
   }
 })


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
      req.session.id = userData.id;
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
    const userData = await User.findOne({ where: { username: req.body.username} });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username' });
      return;
    };
    console.log("req.body.password:", req.body.password);
    const validPassword = await userData.checkPassword(req.body.password);
    console.log('check', validPassword);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log('user Data:', userData );
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

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    })
    console.log(req.session);
  } else {
    res.status(404).end();
  }
});


module.exports = router;