const dynamoose = require('dynamoose');

const getConnection = async () => {
  const ddb = new dynamoose.aws.ddb.DynamoDB({
    endpoint: 'http://localhost:8000',
    region: 'sa-east-1',
    credentials: { accessKeyId: 'dummy', secretAccessKey: 'dummy' },
  });
  await dynamoose.aws.ddb.set(ddb);
};

module.exports = {
  getConnection,
};
