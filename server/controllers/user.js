const express = require('express');
const { User } = require('../db');
const router = express.Router();
const { hashPassword } = require('../common/helpers');
const schema = require('../common/registrationSchema');

router.post('/register', async(req, res) => {
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
  try{
    const user = await schema.validateAsync({username, email, password});
    const newUser = await User.create({
      username: user.username,
      email: user.email,
      passwordHash: await hashPassword(user.password)
    });
    return res.json(newUser);
  }
 catch(err){
   return res.status(400).send(err.message);
 }
});

router.post('/login', async(req, res) => {
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

router.post('/logout', (req, res) => {
  req.session = null; 
  return res.end();
});

router.get('/profile', async(req, res) => {
  if(!req.session.user)
    return res.status(401).send('Denied');

  const { id } = req.session.user;
  const user = await User.findOne({
    where: {
      id
    }
  });
  return res.json({
    username: user.username,
    email: user.email,
    createdAt: user.createdAt
  });

})

module.exports = router;