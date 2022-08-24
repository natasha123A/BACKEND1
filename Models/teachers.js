
const Sequelize = require('sequelize');
const sequelize = require('../DataBase/database');

const TeacherData = sequelize.define("teacherData", {
    id:{
        type : Sequelize.STRING,
        allowNull : false,
        primaryKey:true,    
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports = TeacherData;