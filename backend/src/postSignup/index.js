const userService = require('../../shared/services/user');
const dbHelper = require('../../shared/dbHelper');

const create = async (event) => {
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
      message: 'User signed up successfully',
      token,
      user_id: user.id,
    }),
  };
};

const handler = async (event) => {
  const httpMethod = event.httpMethod.toUpperCase();
  let response = {};

  switch (httpMethod) {
    case 'POST':
      response = await create(event);
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
