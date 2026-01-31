const handler = async () => ({
  statusCode: 200,
  body: JSON.stringify({
    message: 'Protocolos disponiveis',
    protocol_options: [
      'SMS',
      'EMAIL',
    ],
  }),
});

module.exports = { handler };
