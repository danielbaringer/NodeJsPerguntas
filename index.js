const appCxt = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const myConnDb = require('./database/database');
const perguntaModel = require('./database/Pergunta');
const respostaModel = require('./database/Resposta');
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

    perguntaModel.findAll({ raw: true, order: [
        ['id','DESC']
    ]})
    .then(pergunta  => {

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

app.get("/responder/:id", (req,res) => {

    let idPergunta = req.params.id;

    perguntaModel.findOne({ 
        where: { id:idPergunta } 
    }).then(pergunta  => {

        if(pergunta != undefined){

            respostaModel.findAll({
                 where: { perguntaId:idPergunta } 
            }).then(resp  => {       
                
                res.render("responderPergunta",{
                    pergunta: pergunta,
                    respostas: resp
                });

            })
            .catch((erro) => {
                res.send("ERRO !\r\ " + erro);
            });;

            //console.log(arrayResp);

            

        } else {
            res.redirect("/");
        }

    })
    .catch((erro) => {
        console.log("erro: " + erro);
    });

    //res.render("perguntar");

});

app.post("/responder", (req,res) => {

    let resposta = req.body.resposta;
    let perguntaId = req.body.perguntaId;

    perguntaModel.findOne({ 
        where: { id:perguntaId } 
    }).then(pergunta  => {

        if(pergunta != undefined){
            
            
            respostaModel.create({
                corpo: resposta,
                perguntaId:perguntaId
            })
            .then(() => {
                res.redirect("/");
            })
            .catch((erro) => {
                res.send("POST ERRO !\r\Pergunta: " + resposta + " Resposta: " + resposta);
            });
            

        } else {
            res.redirect("/");
        }

    })
    .catch((erro) => {
        console.log("erro: " + erro);
    });


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