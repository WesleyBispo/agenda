require('dotenv').config() //CONFIGURA VARIAVEIS DE AMBIENTE
const mongoose = require('mongoose');

async function conectarAoMongoDB() {
  try {
    await mongoose.connect(process.env.URI_MONGODB);
  } catch (erro) {
    throw erro
  }
}

module.exports = conectarAoMongoDB;
