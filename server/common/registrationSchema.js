'use strict'
const Joi = require('@hapi/joi');

const registrationSchema = Joi.object({
  username: Joi.string().
    min(3).max(30)
    .required()
    .error(
      new Error('Invalid username')
    ),
  email: Joi.string().
    email()
    .required()
    .error(
      new Error('Invalid email')
    ),
  password: Joi.string()
  .min(5).max(30)
  .error(
    new Error('Password must be atleast 5 characters long')
  )
});

module.exports = registrationSchema;