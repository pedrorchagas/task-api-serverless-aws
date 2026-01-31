const subscribeService = require('../../shared/services/subscription');

const handler = async (event) => {
  try {
    // criar o modelo do subscribe - OK
    // criar repository - ok
    // criar o service - ok
    const { endpoint, protocol } = JSON.parse(event.body);
    const subscribe = await subscribeService.createSubscribe({ endpoint, protocol });
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Inscrição criada com sucesso!',
        subscribeId: subscribe.id,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Não foi possível criar uma nova inscrição.',
      }),
    };
  }
};

module.exports = { handler };
