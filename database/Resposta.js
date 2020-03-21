const Sequelize = require('sequelize');
const connDb = require('./database');


const Resposta= connDb.define('resposta',{
    corpo: {
        type: Sequelize.TEXT,
        allowNull:false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull:false
    }
});

Resposta.sync({force: false}).then(()=> {
    console.log('Tabela criada');
});

module.exports = Resposta;