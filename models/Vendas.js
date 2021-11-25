// Criado schema do mongoDB para criação de categorias
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


//O schema serve para podermos inserir, deletar, atualizar e consultar informações mais rapidamente no mongoDB
const Vendas = new Schema({
    cod_cliente: {
        type: Schema.Types.ObjectId,
        ref: "cliente",
        require: true
    },
    cod_peca: {
        type: Schema.Types.ObjectId,
        ref: "pecas"
    },
    quantidade: {
        type: Number,
        require: true
    },
    data: {
        type: Date,
        require: true
    }
})

mongoose.model("vendas", Vendas)