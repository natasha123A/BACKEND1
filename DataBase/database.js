const Sequelize = require('sequelize');

const sequelize = new Sequelize("studentmarksheetmanagementdb","myserver@febeserver","nishtha!123A",{
    dialect:"mysql",
    host:"febeserver.mysql.database.azure.com"
});

module.exports = sequelize;