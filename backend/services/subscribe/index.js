const handler = async (event) => {
  const httpMethod = event.httpMethod.toUpperCase();
  let response = {};

  switch (httpMethod) {
    case 'GET':
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Protocolos disponiveis',
          protocol_options: [
            'SMS',
            'EMAIL',
          ],
        }),
      };
      break;
    default:
      response = {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      };
  }

  return response;
};

module.exports = { handler };
