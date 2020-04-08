const express = require('express');
const { User } = require('../db');
const router = express.Router();
const { hashPassword } = require('../common/helpers');

router.use('/register', async(req, res) => {
  const { username, email, password } = req.body;
  if(!username && !email && password){
    res.status(400).send('Missing required params');
  }
  const user = await User.findOne({
    where: {
      username
    }
  });
  if(user){
    res.status(400).send('Username already exists');

  }
  else {
    const newUser = await User.create({
      username,
      email,
      passwordHash: await hashPassword(password)
    });
    res.json(newUser);
  }
});

router.use('/login', async(req, res) => {
  const { username, password } = req.body;
  if(!username && password){
    res.status(400).send('Missing required params');
  }
  const user = await User.findOne({
    where: {
      username
    }
  });
  if(!user){
    res.status(400).send('User does not exits');
  }
  else{
    const passwordHash = await hashPassword(password);
    if(user.passwordHash === passwordHash){
      req.session.user = {
        id: user.id,
        username: user.username
      };
      res.send('Login success');
    }
    else{
      res.status(400).send('Incorrect username or password');
    }
  }
});
router.use('/profile', async(req, res) => {
  if(!req.session.user)
    res.status(400).send('Denied');
  else{
    const { id } = req.session.user;
    const user = await User.findOne({
      where: {
        id
      }
    });
    res.json(user);
  }
})

module.exports = router;