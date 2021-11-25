// Criado schema do mongoDB para criação de categorias
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


//O schema serve para podermos inserir, deletar, atualizar e consultar informações mais rapidamente no mongoDB
const Contas_Pagar = new Schema({
    descricao: {
        type: String,
        require: true
    },
    fornecedor: {
        type: Schema.Types.ObjectId,
        ref: "fornecedor"
    },
    valor: {
        type: Number,
        require: true
    },
    parcelas: {
        type: Number
    },
    data: {
        type: Date,
        require: true
    }
})

mongoose.model("contas_pagar", Contas_Pagar)