//biblioteca para lidar com file system.
const fs = require('fs');
const { join } = require('path');

//como ainda nao tem banco de dados, vamos simular como 
//se os dados estivesse no BD mas vai estar em um arquivo json.
const filePath = join(__dirname, 'users.json');

//metodo para pegar o usuario
const getUsers = () => {
    //vendo se o arquivo existe, usando metodos sincronos do fs
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : [];

    try {
        return JSON.parse(data);
    } catch(error) {
        return [];
    }
}

//metodo para salvar o usuario
const saveUser = (users) => {
    //escrevendo no JSON e tabulando com \t
    fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'));
}

//funcao das rotas do usuario
const userRoute = (app) => {
    //mapeamento do get
    app.route('/users/:id?').get((req, res) => {
        const users = getUsers();
        res.send({ users })
    })
    .post((req, res) => {
        const users = getUsers();
        users.push(req.body);

        saveUser(users);
        res.status(201).send("OK");
    })
    .put((req, res) => {
        const users = getUsers();

        //para cada usuario, vai verificar qual o usuario q tem o msmo id da requisicao
        //e se achar, retorna a mescla dos 2 objetos e se nao achar, retonar para o save
        //apenas o usuario atual, como esta mesmo
        saveUser(users.map(user => {
            if(user.id === req.params.id) {
                //retorna o usuario atual com o body da req com as alteracoes
                return {
                    ...user,
                    ...req.body
                }
            }
            return user;
        }))
        return res.status(200).send('OK');
    })
    .delete((req, res) => {
        const users = getUsers();
        saveUser(users.filter(user => user.id !== req.params.id));
        return res.status(200).send('OK');
    })
}

//exportando a funcao userRoute para que possa ser chamada em outro arquivo.
module.exports = userRoute;