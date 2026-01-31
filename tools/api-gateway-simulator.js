/**
 * Simulador de Load Balancer AWS
 * Simula as requisições que o load balancer da AWS envia para o lambda FilaHandle
 */

const express = require('express');
const signupRoute = require('../backend/services/signup/index');
const loginRoute = require('../backend/services/login/index');
const subscribeRoute = require('../backend/services/subscribe')

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para fazer parse do JSON
app.use(express.json());

app.post('/signup', async (req, res) => {
    const awsEvent = {
        httpMethod: req.method,
        path: req.path,
        queryStringParameters: req.query,
        headers: req.headers,
        body: JSON.stringify(req.body),
    };

    const response = await signupRoute.handler(awsEvent);

    res.status(response.statusCode).send(response.body);
});

app.post('/login', async (req, res) => {
    const awsEvent = {
        httpMethod: req.method,
        path: req.path,
        queryStringParameters: req.query,
        headers: req.headers,
        body: JSON.stringify(req.body),
    };

    const response = await loginRoute.handler(awsEvent);

    res.status(response.statusCode).send(response.body);
});

app.get('/subscribe/:params', async (req, res) => {
    const awsEvent = {
        httpMethod: req.method,
        path: req.path,
        queryStringParameters: req.query,
        headers: req.headers,
        body: JSON.stringify(req.body),
    };

    const response = await subscribeRoute.handler(awsEvent);

    res.status(response.statusCode).send(response.body);
});

// Inicia o servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Simulador do Api Gateway da AWS rodando na porta ${PORT}`);
  console.log(`\nServidor acessível externamente em: http://[SEU_IP]:${PORT}`);
});
