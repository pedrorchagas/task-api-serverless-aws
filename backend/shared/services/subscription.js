const { error } = require('node:console');
const subscriptionRepository = require('../repositories/subscribe');
const snsService = require('./sns');
const constants = require('../constants');

const createSubscription = async ({ endpoint, protocol }) => {
  if (constants.protocolOptions.includes(protocol)) {
    const subscription = await snsService.createSnsSubscription({ endpoint, protocol });
    await subscriptionRepository.createSubscription( 
      {
        endpoint,
        protocol,
        awsSubscription: subscription,
      },
    );
  } else {
    throw error('Opção de protocolo não permitida!');
  }
  return subscribe;
};

module.exports = { createSubscribe };
