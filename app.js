//Carregando módulos
    const express = require('express') //Base do app
    const handlebars = require('express-handlebars') //Utilizar handlebars + express
    const app = express() // Definição do nosso app
    const path = require('path') 
    const mongoose = require('mongoose') //Banco de dados
    const session = require('express-session') //Usado para definir sessões do navegador
    const flash = require('connect-flash') //Mensagens de popup de erro e sucesso
    const moment = require('moment') //Gerenciar horas nas publicações
    const passport = require("passport") //Autenticação 
    require("./config/auth")(passport) //Passar a definição do passport para o arquivo auth
    const db = require("./config/db") //Arquivo de gerenciamento do banco de dados

    //** Importando rotas */
    const admin = require('./routes/admin') //Rotas de administrador
    const usuarios = require('./routes/usuario') //Model de usuários
  
//Configurações
    // Enable CORS
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    // Configurar sessão
        app.use(session({
            secret: "blogapp",
            resave: true,
            saveUninitialized: true
        }))
        
    //Inicialização do passport e da session do passport
        app.use(passport.initialize())
        app.use(passport.session())
    
    //Definicação do flash para as mensagens
        app.use(flash())
    
    // Middleware
        //Definição de variáveis globais no app
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null
            if(req.user){
                res.locals.usuarioAdmin = req.user.isAdmin
                res.locals.nomeUsuario = req.user.nome
            }
            res.locals.mensagem = "N/A"
            
            next()
        })

    // Configurar BodyParser d o express
        app.use(express.urlencoded({extended: true}))
        app.use(express.json())
    // Handlebars
        app.engine("handlebars", handlebars({
                defaultLayout: 'main',
                helpers: {
                    formatDate: (date) => {
                        return moment(date).format("DD/MM/YYYY")
                    }
                }}))
        app.set('view engine', 'handlebars')
    //Mongoose
        //mongoose.Promise = global.Promise
        mongoose.connect(db.mongoURI, db.serverConfig).then(() => {
            console.log("Conectado ao mongo")
        }).catch((err) => {
            console.log("Erro ao se conectar: " + err)
        })
    
    //Public
        app.use(express.static(path.join(__dirname,"public")))
        
//Rotas

    app.get("/", (req, res) => {
        res.redirect("/usuarios/login")
    })

    //Utilizar arquivo de rotas do admin
    app.use('/admin', admin)

    //Utilizar arquivo de rotas para usuario
    app.use('/usuarios', usuarios)

    app.use((req, res, next) => {
        res.render("pages/error")
    });

//Outros
var PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Servidor rodando!")
})