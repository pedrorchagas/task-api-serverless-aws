const Dynamoose = require('dynamoose');
const crypto = require('crypto');
const constants = require('../constants');

const pkSubscription = (subscriptionId) => `${constants.subscriptionType}#${subscriptionId}`;
const skSubscription = () => constants.subscriptionType;

const Subscription = Dynamoose.model(
  constants.subscribeModel,
  {
    id: {
      type: String,
      hashKey: true,
      default: () => pkSubscription(crypto.randomUUID()),
    },
    type: {
      type: String,
      rangeKey: true,
      default: skSubscription(),
    },
    userId: {
      type: String,
      required: true,
      index: {
        name: 'gsi_userid',
        global: true,
      },
    },
    awsId: {
      type: String,
      required: true,
      index: {
        name: 'gsi_awsid',
        global: true,
      },
    },
    endpoint: {
      type: String,
      required: true,
    },
    protocol: {
      type: String,
      required: true,
    },
  },
);

module.exports = {
  Subscription,
  pkSubscription,
  skSubscription,
};
