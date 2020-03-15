const appCxt = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const myConnDb = require('./database/database');
const perguntaModel = require('./database/Pergunta');
app = appCxt();

myConnDb
    .authenticate()
    .then(() => {
        console.log('Conectou no mySQL');
    })
    .catch((erro) => {
        console.log('Erro: ' + erro);
    });

app.set("view engine", "ejs");
app.use(appCxt.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); //API JSON
path.join(__dirname, 'views')

app.get("/", (req, res) =>{

    perguntaModel.findAll({ raw: true})
    .then(pergunta  => {
        //console.log(pergunta);

        res.render("index",{
            perguntas: pergunta
        });

    })
    .catch((erro) => {
        console.log("erro: " + erro);
    });

});

app.get("/perguntar", function(req,res){

    res.render("perguntar");

});

app.post("/perguntar", function(req,res){

    let tituloPost = req.body.titulo;
    let descricaoPost = req.body.descricao;

    perguntaModel.create({
        titulo: tituloPost,
        descricao:descricaoPost
    })
    .then(() => {
        res.redirect("/");
    })
    .catch((erro) => {
        res.send("POST ERRO !\r\nTítulo: " + tituloPost + " Descrição: " + descricaoPost);
    });

});

app.listen(8181, (req, res) => {

    console.log("Working !");

});