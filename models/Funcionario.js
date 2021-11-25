// Criado schema do mongoDB para criação de categorias
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


//O schema serve para podermos inserir, deletar, atualizar e consultar informações mais rapidamente no mongoDB
const Funcionario = new Schema({
    nome: {
        type: String,
        require: true
    },
    funcao: {
        type: String,
        require: true
    },
    cpf: {
        type: String,
        requide: true
    },
    data_nasc: {
        type: Date
    },
    urlFoto: {
        type: String,
        require: false
    }
})

mongoose.model("funcionario", Funcionario)