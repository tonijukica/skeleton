const { promisify } = require('util');
const crypto = require('crypto');

const pbkdf2 = promisify(crypto.pbkdf2);
const salt = process.env.SALT_SECRET;
const hashPassword = async(password) => {
  const hashBuffer = await pbkdf2(password, salt, 64, 100, 'SHA512');
  const hash = hashBuffer.toString('hex');
  return await hash.toString('hex');
}

module.exports = {
  hashPassword
}