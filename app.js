const express = require("express");
const app = express();

const csrf = require('csurf')

require('dotenv').config()

const session = require('express-session')
const MongoStore = require("connect-mongo")
const flash = require('connect-flash')

const path = require('path');

const conectarAoMongoDB = require('./conexaoDB')
const globalMiddleware = require('./src/middlewares/middlewareGlobal');
const homeRoute = require('./routes/homeRoute');
const loginRoute = require('./routes/loginRoute');
const logoutRoute = require('./routes/logoutRoute')
const contatoRoute = require('./routes/contatoRoute')



const PORT = 3000;

// Função para conectar ao MongoDB e retornar uma promessa
async function conectarAoMongoDBAsync() {
  try {
    await conectarAoMongoDB();
    console.log('Conexão com o MongoDB estabelecida com sucesso!');
  } catch (erro) {
    console.error('Erro ao conectar ao MongoDB:', erro);
    throw erro;
  }
}
// Função para iniciar o servidor
async function iniciarServidor() {

  //Segurança

  // Pegar dados do formato do FORM Html
  app.use(express.urlencoded({ extended: true }));
  // Para JSON
  app.use(express.json())
  // Configurando arquivos estáticos (css, imagens, logos...)
  app.use(express.static(path.resolve(__dirname, 'public')));

  //SESSION E FLASH MESSAGE
  const sessionOptions = session({
    secret: process.env.SECRET_SESSION,
    store: MongoStore.create({ mongoUrl: process.env.URI_MONGODB }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //7 DIAS VAI DURAR
      httpOnly: true
    }
  })

  app.use(sessionOptions)
  app.use(flash())

  app.use(csrf())


  // Configurando VIEWS do meu projeto
  app.set('views', path.resolve(__dirname, 'src', 'views'));
  app.set('view engine', 'ejs');
  

  app.use(globalMiddleware.injectTexts);
  app.use(globalMiddleware.csrfMiddleware)
  app.use(globalMiddleware.checkCsrfError)

  // Rotas
  app.use("/home", homeRoute);
  app.use("/login", loginRoute)
  app.use('/logout', logoutRoute)
  app.use('/contato', contatoRoute)
 
  

  // Middleware para tratamento de erros
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
  });

  // Inicia o servidor
  app.listen(PORT, () => {
    console.log(`SERVIDOR INICIADO EM http://localhost:${PORT}/login`);
  });
}

// Aguarda a conexão com o MongoDB antes de iniciar o servidor
async function main() {
  try {
    await conectarAoMongoDBAsync();
    await iniciarServidor();
  } catch (erro) {
    console.error('Erro ao iniciar a aplicação:', erro);
  }
}

// Chama a função principal
main();
