const Sequelize = require("sequelize");

const conn = new Sequelize("pergunta","root","U4s2d1x3",{
    host: "localhost",
    dialect: "mysql"
});


module.exports = conn;