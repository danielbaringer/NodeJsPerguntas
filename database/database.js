const Sequelize = require("sequelize");

const conn = new Sequelize("guiaperguntas","acesso","acesso",{
    host: "localhost",
    dialect: "mysql"
});


module.exports = conn;