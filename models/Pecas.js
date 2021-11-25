// Criado schema do mongoDB para criação de categorias
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

pecas: 
//O schema serve para podermos inserir, deletar, atualizar e consultar informações mais rapidamente no mongoDB
const Pecas = new Schema({
    descricao: {
        type: String,
        require: true
    }, 
    fator_medida: {
        type: String,
        require: true
    }, 
    classif_grupos: {
        type: String,
        require: true
    }, 
    qtde_min_est: {
        type: Number,
        require: true
    }, 
    qtde_max_est: {
        type: Number,
        require: true
    }, 
    fornecedor: {
        type: Schema.Types.ObjectId,
        ref: "fornecedor",
        require: true
    }, 
    data_compra: {
        type: Date,
        default: Date.now()
    }, 
    valor_compra: {
        type: Number,
        require: true
    }, 
    valor_venda: {
        type: Number,
        require: True
    },
    urlFoto: {
        type: String,
        require: false
    }
})

mongoose.model("pecas", Pecas)