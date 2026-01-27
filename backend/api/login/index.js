const signupLogin = require('./controllers/login');

const handler = async (event) => {
  const httpMethod = event.httpMethod.toUpperCase();
  let response = {};

  switch (httpMethod) {
    case 'POST':
      response = await signupLogin.login(event);
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
