const argon2 = require('argon2');
const userRepository = require('../repositories/user');
const jwt = require('jsonwebtoken')

const hashPassword = async (password) => {
  const hash = await argon2.hash(password);
  return hash;
};

const verifyPassword = async ({ inputPassword, storedHash }) => {
  if (await argon2.verify(inputPassword, storedHash)) {
    return true;
  }
  return false;
};

const createUser = async ({ username, password }) => {
  const hashedPassword = await hashPassword(password);

  const response = await userRepository.createUser(
    {
      username,
      password: hashedPassword,
    },
  );

  return response;
};

const hasUser = async ({ username }) => {
  const response = await userRepository.hasUser({ username });
  if (response.count > 0) {
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

module.exports = {
  hashPassword,
  verifyPassword,
  createUser,
  hasUser,
  generateToken,
};
