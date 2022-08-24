const express = require('express');
const parser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const sequelize = require('./DataBase/database');
const TeacherData = require('./Models/teachers');
const StudentData = require('./Models/students');
var cors = require('cors')
app.set('view engine', 'ejs');
const path = require('path');
const { url } = require('inspector');

app.use(cookieParser());
app.use(cors());
app.use(session({
    name: 'currentlogin',
    resave: false,
    secret: 'secretsession',
    saveUninitialized:false,
    cookie:{
        maxAge: 1000*60*2,
        sameSite: true,
    }
}));

app.use(express.json());
sequelize.sync();

// // used for jason parsing while using api
// var jsonParser = parser.json()

// // create application/form-urlencoded parser
// var urlencodedParser = parser.urlencoded({ extended: false })

//------------------------------------------------------------------------------------------------

app.post('/register' ,async (req, res) => {
    var data = await TeacherData.findAll({
        raw: true,
        attributes: ["id"],
        where: {
            id: req.body.id
        }
    });
    if (data.length == 0) {
        const user = await TeacherData.create({ id: req.body.id, email: req.body.email, name: req.body.name, password: req.body.password });
        res.send("201");
    }
    else {
        res.send("400");
    }
});

app.post('/userlogin',async (req, res) => {

    var data = await TeacherData.findAll({
        raw: true,
        attributes: ["id", "password"],
        where: {
            id: req.body.id,
            password: req.body.password
        }
    });
    if (data.length == 0) {
        res.send("-1");
    }
    else {
        res.send(req.body.id);
    }
});

app.post('/getalldata',async (req,res) =>{
    var data = await StudentData.findAll({
                raw: true,
                attributes: ["rollno", "name","marks","dob"],
                where: {
                    teacher:req.body.userID
                }
            });
            res.send(data);
});
// app.post('/add', urlencodedParser,(req, res) => {
    
//     res.render('addStudent', { username: req.query.id, errorMesssage: "" });
// });
app.post('/add',async (req, res) => {
    console.log(req.body);
    var data = await StudentData.findAll({
        raw: true,
        where: {
            rollno: req.body.rollno,
            teacher:req.body.teacher
        }
    });
    if (data.length == 0) {
        const user = await StudentData.create({ rollno: req.body.rollno, dob: req.body.dob.toString().slice(0,10), name: req.body.name, marks: req.body.marks,teacher:req.body.teacher });  
        res.send("201");
    }
    else {
        res.send("400");
    }
});


// //-----------------------------------------------------------------------------------------------------
app.post('/updatedetails',async(req,res)=>{
    
  var x = await StudentData.update(
        {
        rollno: req.body.rollno,
        name: req.body.name,
        dob: req.body.dob,
        marks: req.body.marks,
        },
        {
        where:{
            rollno: req.body.rollno,
            teacher:req.body.teacher
        }
    });
  res.send("200");
});
// //-----------------------------------------------------------------------------------------------------
app.delete('/deletedetails',async(req,res)=>{
   await StudentData.destroy({
        where:{
            rollno: req.query.sid,
            teacher:req.query.id
        }
    });  

    res.send('200');
})

app.post('/getmarks',async(req,res)=>{
    var student = await StudentData.findAll({
        raw: true,
        where: {
            rollno: req.body.id,
            dob:req.body.dob
        }
    });
    if(student.length!=0){
        res.send(student);
    }
    else{
        res.send(null);
    }
});

app.listen(3001);