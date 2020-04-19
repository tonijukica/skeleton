const express = require('express');
const { User } = require('../db');
const router = express.Router();
const { hashPassword } = require('../common/helpers');
const Joi = require('@hapi/joi');

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
    const registrationSchema = Joi.object({
      username: Joi.string().min(3).max(30).required(), 
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(30)
    });
    const user = await registrationSchema.validateAsync({username, email, password});
    const newUser = await User.create({
      username: user.username,
      email: user.email,
      passwordHash: await hashPassword(user.password)
    });
    return res.json(newUser);
  }
 catch(err){
   console.log(err);
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
    return res.status(400).send('Denied');

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