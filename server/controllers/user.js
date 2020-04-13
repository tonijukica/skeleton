const express = require('express');
const { User } = require('../db');
const router = express.Router();
const { hashPassword } = require('../common/helpers');

router.use('/register', async(req, res) => {
  const { username, email, password } = req.body;
  if(!username && !email && password)
    return res.status(400).send('Missing required params');

  const user = await User.findOne({
    where: {
      username
    }
  });
  if(user)
    return res.status(400).send('Username already exists');
  
  const newUser = await User.create({
    username,
    email,
    passwordHash: await hashPassword(password)
  });
  return res.json(newUser);
});

router.use('/login', async(req, res) => {
  const { username, password } = req.body;
  if(!username && password)
    return res.status(400).send('Missing required params');
  
  const user = await User.findOne({
    where: {
      username
    }
  });
  if(!user)
    return res.status(400).send('User does not exits');

  const passwordHash = await hashPassword(password);
  if(user.passwordHash === passwordHash){
    req.session.user = {
      id: user.id,
      username: user.username
    };
    return res.json({
      status: 'Login success',
      userId: user.id
    });
  }
  else
    return res.status(400).send('Incorrect username or password');
  
});
router.use('/profile', async(req, res) => {
  if(!req.session.user)
    return res.status(400).send('Denied');

  const { id } = req.session.user;
  const user = await User.findOne({
    where: {
      id
    }
  });
  return res.json(user);

})

module.exports = router;