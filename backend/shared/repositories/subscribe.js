const SubscriptionModel = require('../models/subscription');

const createSubscription = async ({ endpoint, protocol, awsId }) => {
  let subscribe = new SubscriptionModel.Subscription({
    endpoint,
    protocol,
    awsId,
  });

  subscribe = await subscribe.save();
  return subscribe;
};

const getSubscriptionById = async (subscribeId) => {
  const subscribe = await SubscriptionModel.Subscription.query('id').eq(subscribeId)
    .limit(1)
    .exec();

  return subscribe[0];
};

const updateSubscription = async () => {
  // todo
};

module.exports = {
  createSubscription,
  getSubscriptionById,
  updateSubscription,
};
