//Instanciado express para criação de routers / rotas
const express = require("express")
const router = express.Router()

//Intancia do middlerware 'eAdmin' para utilizarmos na definição das rotas para checar se o usuário é ou não administrador
const {eAdmin} = require("../helpers/eAdmin")  

//Importado mongoose
const mongoose = require('mongoose')

// --- Importação de models
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
// --- Fim da importação de models

// Configuração de upload de arquivos
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/img/img-produto/")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage})

// Rota da página inicial do painel admin
router.get("/index", eAdmin, (req, res) => {
    res.render("admin/index")
})

//Rota para página de usuários
router.get('/usuarios', eAdmin, (req, res) => {
    Usuario.find().lean().then((usuarios) => {
        res.render("admin/usuarios", {usuarios: usuarios})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as categorias")
        res.redirect("/")
    })

})

router.get("/usuarios/edit/:id", eAdmin, (req, res) => {
    //Findone é semelhante ao select, recebendo parametros de 'WHERE'
    Usuario.findOne({
        _id: req.params.id
    }).lean().then((usuarios) => {
        res.render("admin/editusuario", {usuarios: usuarios})
    }).catch((err) => {
        req.flash("error_msg", "Erro ao encontrar usuário")
        res.redirect("/admin/usuarios")
    })

})

//É necessário exportar o router para podermos acessar as rotas em outras partes do projeto
module.exports = router