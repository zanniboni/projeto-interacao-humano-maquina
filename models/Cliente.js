// Criado schema do mongoDB para criação de categorias
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


//O schema serve para podermos inserir, deletar, atualizar e consultar informações mais rapidamente no mongoDB
const Cliente = new Schema({
    nome: {
        type: String,
        require: true
    },
    cpf: {
        type: String,
        require: true
    },
    data_nasc: {
            type: String,
            requide: true
    },
    cod_func: {
        type: Schema.Types.ObjectId,
        ref: "funcionario",
        require: true
    }
})

mongoose.model("cliente", Cliente)