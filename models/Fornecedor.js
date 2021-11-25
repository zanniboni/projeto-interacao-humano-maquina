const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Fornecedor = new Schema({
    nome: {
        type: String,
        require: true
    }
})

mongoose.model("fornecedor", Fornecedor)