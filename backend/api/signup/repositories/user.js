const UserModel = require('../models/user');

const createUser = async ({ username, password }) => {
  let user = new UserModel.User({
    username,
    password,
  });

  user = await user.save();
  return user;
};

const hasUser = async ({ username }) => {
  const res = await UserModel.User.query('username').eq(username)
    .using('gsi_username')
    .limit(1)
    .exec();
  return res;
};

module.exports = {
  createUser,
  hasUser,
};
