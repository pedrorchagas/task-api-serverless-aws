const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

const generatePolicy = ({ userId, effect, resource, context }) => ({
  principalId: userId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [{
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource,
    }],
  },
  context,
});

const handler = (event) => {
  try {
    // Extrair token do header
    const token = event.authorizationToken.replace('Bearer ', '');

    // Validar JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    console.log('Token válido para usuário:', decoded.userId);

    // Retornar policy de PERMISSÃO
    return generatePolicy(
      { userId: decoded.userId, effect: 'Allow', resource: event.methodArn, context: decoded },
    );
  } catch (error) {
    console.error('Token inválido:', error.message);

    // Retornar policy de NEGAÇÃO
    return generatePolicy(
      { userid: 'user', effect: 'Deny', resource: event.methodArn },
    );
  }
};

module.exports = { handler };
