// Criado schema do mongoDB para criação de categorias
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


//O schema serve para podermos inserir, deletar, atualizar e consultar informações mais rapidamente no mongoDB
const Orcamentos = new Schema({
    data: {
        type: Date,
        require: true
    },
    nome_cliente: {
        type: String,
        require: true
    },
    cond_pgto: {
            type: String,
            requide: true
    },
    val_orcamento: {
        type: Date
    },
    cod_func: {
        type: Schema.Types.ObjectId,
        ref: "funcionario",
        require: true
    },
    validade: {
        type: Date,
        require: true
    }
})

mongoose.model("orcamentos", Orcamentos)