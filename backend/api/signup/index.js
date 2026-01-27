const signupController = require('./controllers/signup');

const handler = async (event) => {
  const httpMethod = event.httpMethod.toUpperCase();
  let response = {};

  switch (httpMethod) {
    case 'POST':
      response = await signupController.create(event);
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
