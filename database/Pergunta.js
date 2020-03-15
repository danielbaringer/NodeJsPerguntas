const Sequelize = require('sequelize');
const connDb = require('./database');

const Pergunta= connDb.define('pergunta',{
    titulo: {
        type: Sequelize.STRING,
        allowNull:false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(()=> {
    console.log('Tabela criada');
});

module.exports = Pergunta;