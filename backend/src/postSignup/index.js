const userService = require('../../shared/services/user');
const dbHelper = require('../../shared/dbHelper');

const handler = async (event) => {
  try {
    await dbHelper.getConnection();
    const { username, password } = JSON.parse(event.body);

    if (await userService.hasUser({ username, password })) {
      return {
        statusCode: 400,
        body: 'User aready signed',
      };
    }

    let user = {
      username,
      password,
    };

    user = await userService.createUser(user);

    const token = await userService.generateToken(user);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Usuário cadastrado com sucesso!',
        token,
        user_id: user.id,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Não foi possível realizar o cadastro do usuário',
      }),
    };
  }
};

module.exports = { handler };
