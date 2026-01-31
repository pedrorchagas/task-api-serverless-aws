const Dynamoose = require('dynamoose');
const crypto = require('crypto');
const constants = require('../constants');

const pkUser = (userId) => `${constants.userType}#${userId}`;
const skUser = () => constants.userType;

const User = Dynamoose.model(
  constants.userModel,
  {
    id: {
      type: String,
      hashKey: true,
      default: () => pkUser(crypto.randomUUID()),
    },
    type: {
      type: String,
      rangeKey: true,
      default: skUser(),
    },
    username: {
      type: String,
      required: true,
      index: {
        name: 'gsi_username',
        global: true,
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
);

module.exports = {
  User,
  pkUser,
  skUser,
};
