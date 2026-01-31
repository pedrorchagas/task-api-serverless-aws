const createSnsSubscription = async ({ endpoint, protocol }) => {
  // criar o tópico se já não existir do usuário.
  //  Se existir a propriedade no user awsTopicArn irá utilizar
  //  se não deve criar um novo topico e alterar o usuário com o novo topico

  // criar a subscription na aws com o endpoint e protocolo
  // retornar o id na aws dessa subscription
};

module.exports = { createSnsSubscription };