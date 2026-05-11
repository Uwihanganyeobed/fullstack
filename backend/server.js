

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const app = express();
app.use(cors({origin:"http://localhost:5173"}));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "level-5-sod"
});


db.connect((err) => {
    if (err) {
        console.error("database failed💔", err);
    } else {
        console.log("connected successfully😍😘")
    }
});

//middlewares

//verifying token
const verifyToken =()=>{

}

const checkRole=()=>{

}
//api//register
app.post('/api/register',async(req,res)=>{
    const {name,email,password,role}= req.body;
    //check if user exists
    const myQuery = 'SELECT * FROM users where email = ?';
    db.query(myQuery,[email],async(err,results)=>{
        if(err){
            return res.status(500).json({message: 'Invalid user',err})
        }
        if(results.length>0){
            return res.status(404).json({message: 'user already exists'})
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const insertQuery = 'INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)';
        db.query(insertQuery,[name,email,hashedPassword,role],async(err,results)=>{
            if(err){
                return res.status(500).json({message: 'failed to create user',err})
            }
            return res.status(200).json({message: 'created a user',results});
        })
    })
})
//api/login
app.post('/api/login',async(req,res)=>{
    const {email,password} = req.body;
    //check if user exists
    const myQuery = 'SELECT * FROM users where email = ?';
    db.query(myQuery,[email],async(err,results)=>{
        if(err){
            return res.status(500).json({message: 'db network error',err})
        }
        if(results.length=== 0){
            return res.status(501).json({message:'user with email not found',err})
        }
        //compare password
        const isPasswordValid = await bcrypt.compare(password,results[0].password);
        if(!isPasswordValid){
            return res.status(501).json({message:'Invalid password',err})
        }
        //generating token
        const token = await jwt.sign({
            id: results[0].id,
            email: results[0].email,  
            role: results[0].role
        },'secretKey',{expiresIn: '1d'})
         if(!token){
            return res.status(501).json({message:'No token provided, plz try again',err})
        }

        return res.status(200).json({message:'Login Successfully',token})

    })
})
//api/logout
//api/me

//start server

app.listen(5000, () => {
    console.log("server is running on port 5000");
});