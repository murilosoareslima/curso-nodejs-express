const express = require('express');
//um modulo do express que converte o body do request
//em um objeto quando chamado req.body.
const bodyParser = require('body-parser');
//importando arquivo com as rotas do usuario
const userRoute = require('./routes/userRoute');

const app = express();
//passando para o express utilizar o bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
const port = 3000;

//chamando a funcao de rotas do usuario
userRoute(app);

app.get('/', (req, res) => res.send("Olá mundo, pelo Express"));

app.listen(port, () => console.log("API rodando na porta: " + port));