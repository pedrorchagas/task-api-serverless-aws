const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user');

const hashPassword = async (password) => {
  const hash = await argon2.hash(password);
  return hash;
};

const verifyPassword = async ({ inputPassword, storedHash }) => {
  if (await argon2.verify(storedHash, inputPassword)) {
    return true;
  }
  return false;
};

const generateToken = async (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
  };

  const secretKey = process.env.JWT_TOKEN || 'secret_key';

  const token = jwt.sign(payload, secretKey, {
    expiresIn: '1h',
  });

  return token;
};

const loginUser = async (user) => {
  let token;
  const storedUser = await userRepository.getUserByUsername(user.username);

  if (await verifyPassword({
    inputPassword: user.password,
    storedHash: storedUser.password,
  })) {
    token = await generateToken(user);
  } else {
    throw new Error('Senha incorreta!');
  }

  return token;
};

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  loginUser,
};
