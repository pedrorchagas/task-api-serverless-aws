# task-api-serverless-aws
Uma api de gerenciamento de Tasks baseada nos serviços serverless da AWS


# Rodar o projeto localmente:

## API: 
- Entre em cada pasta correspondente a cada enpoint e utilize o comando `npm install`
- Instale o dynamoDb local com o comando: `npm install --global dynamodb-local`
- (Talvez seja necessário reiniciar o console)
- Ative o dynamoDb Local com o comando: `dynamodb-local -sharedDb`
- Entre na pasta `/tools` e execute o comando `npm install`
- Execute o simulador do *API GATEWAY AWS* com o comando: `node api-gateway-simulator.js`
- Pronto, a api está funcionando localmente.