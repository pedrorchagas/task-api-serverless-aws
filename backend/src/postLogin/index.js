const userService = require('../../shared/services/user');
const dbHelper = require('../../shared/dbHelper');

const login = async (event) => {
  try {
    await dbHelper.getConnection();
    const { username, password } = JSON.parse(event.body);

    const user = {
      username,
      password,
    };

    // gerar um token jwt e retornar para o front
    const token = await userService.loginUser(user);

    return {
      statusCode: 200,
      body: {
        message: 'Login realizado com sucesso!',
        token,
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        message: 'Não foi possível realizar o login',
      },
    };
  }
};

const handler = async (event) => {
  const httpMethod = event.httpMethod.toUpperCase();
  let response = {};

  switch (httpMethod) {
    case 'POST':
      response = await login(event);
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
