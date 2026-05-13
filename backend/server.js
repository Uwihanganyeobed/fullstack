

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

app.get('/',(req,res)=>{
    res.send('hello')
})
//middlewares

//verifying token
const verifyToken =async(req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(501).json({message: 'No token provided'})
    }
    const actualToken = token.split(" ")[1];
    const realToken = await jwt.verify(actualToken,'secretKey');
    req.user = realToken;
    next();
}

const checkRole=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message: 'Access denied'})
        }
        next()
    }
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
app.post('/api/logout',(req,res)=>{
    res.status(200).json({ message: 'Logout successful' });
})

//api/me
app.get('/api/me',verifyToken,async(req,res)=>{
    const id = req.user.id;
    //
    const myQuery = 'SELECT id,name,email,role from users where id =?';
    db.query(myQuery,[id],(err,results)=>{
        if(err){
            return res.status(500).json({message: 'db network error',err})
        }
        if(results.length===0){
            return res.status(500).json({message: 'user with id not found'})
        }
        return res.status(200).json({message: 'user found',results})

    })
})

// CRUD OPERATION FOR PRODUCTS

app.get('/api/products',async(req,res)=>{
    const myquery= 'SELECT * FROM products'
    db.query(myquery ,(err,results)=>{
        if(err){
            return res.status(200).json({message: 'server error',err})
        }
        return res.status(200).json({message: 'got products',results})
    })
})

//creating produts
app.post('/api/products',verifyToken,checkRole('admin'), async(req,res) =>{
    const {name,price,category} = req.body
    const myquery = 'INSERT INTO products(name,price,category) VALUES(?,?,?)'
    db.query(myquery, [name,price,category], (err,results) =>{
        if(err){
            return res.status(500).json({message: 'cannot create user',err})
        }
        return res.status(200).json({message: 'product created',results})
    })
})

//get by id

app.get('/api/products/:id',verifyToken, async(req,res) =>{
    const id= req.params.id
    const myquery= 'SELECT * FROM products WHERE id=?'
    db.query(myquery,[id], (err,results) =>{
        if (err){
            return res.status(500).json({message: 'id not found',err})
        }
        return res.status(200).json({message: 'product by id found',results})
    })
})
// UPDATE PRODUCT

app.put('/api/products/:id',verifyToken,checkRole('admin'), async(req,res) =>{
    const {name,price,category} = req.body
    const id= req.params.id
    const myquery ='UPDATE products SET name=? , price=? , category=? WHERE id=?'
    db.query(myquery,[name,price,category,id], (err,results) =>{
        if (err) {
            return res.status(500).json({message: 'cannot update product',err})
        }
        return res.status(200).json({message: 'product updated',results})
    })
})
//DELETE PRODUCT
app.delete('/api/products/:id',verifyToken,checkRole('admin'), async(req,res) =>{
    const id= req.params.id
    const myquery='DELETE FROM products WHERE id=?'
    db.query(myquery,[id], (err,results) => {
        if (err) {
            return res.status(500).json({message: 'cannot delete product',err})
        }
        return res.status(200).json({message: 'product deleted',results})
    })
})
//start server

app.listen(5000, () => {
    console.log("server is running on port 5000");
});