const Sequelize = require('sequelize');
const sequelize = require('../DataBase/database');

const StudentData = sequelize.define("studentData", {
    id:{
        type : Sequelize.INTEGER,
        autoIncrement:true,
        allowNull : false,
        primaryKey:true,    
    },
    rollno:{
        type:Sequelize.INTEGER,
        allowNull:false,

    },
    dob:{
        type:Sequelize.STRING,
        allowNull:false
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },
    marks:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    teacher:{
        type:Sequelize.STRING
    }
},
    {
        initialAutoIncrement:1
});

module.exports = StudentData;