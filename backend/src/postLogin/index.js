const userService = require('../../shared/services/user');
const dbHelper = require('../../shared/dbHelper');

const handler = async (event) => {
  try {
    await dbHelper.getConnection();
    const { username, password } = JSON.parse(event.body);

    const user = {
      username,
      password,
    };

    const token = await userService.loginUser(user);

    return {
      statusCode: 200,
      body: {
        message: 'Login realizado com sucesso!',
        token,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Não foi possível realizar o login',
      }),
    };
  }
};

module.exports = { handler };
