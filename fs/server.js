const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "NationalExamDB"
});

db.connect((err) => {
    if (err) {
        console.error("database failed💔", err);
    } else {
        console.log("connected successfully😍😘")
    }
});

//check role of user//

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;  //this is the token that we will send from 
    // frontend in the header of the request

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        });
    }
    try {
        const actualToken = token.split(" ")[1]; //this will split the token and get the actual token from the header
        const decoded = await jwt.verify(actualToken, 'secretKey'); //this will decode the token 
        // and give us the payload which we have set while creating the token
        req.user = decoded;
        next();
        // next() is used to pass the control to the next middleware function in the stack

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
}


//RBAcess

const checkRole = (...roles) => {
    return (req, res, next) => {//this is a middleware function that will check the role of the user
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }
        next();//if the role is valid then pass the control to the next middleware function
    }
}

app.get('/', (req, res) => {
    res.send("Server is running")
});



app.post("/api/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    //check if user already exists
    const myQuery = "SELECT * FROM users WHERE email = ?";
    db.query(myQuery, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error registering user" });
        }
        //user exists
        if (result.length > 0) {
            return res.status(500).json({ message: "User already exists" });
        }


        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //insert user in db

        const insertQuery = 'INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)';
        db.query(insertQuery, [name, email, hashedPassword, role], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error registering user" });
            }
            return res.status(200).json({ message: "User registered successfully", result });
        })
    })

})

//login

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    //check if user exists
    const myQuery = "SELECT * FROM users WHERE email = ?";
    db.query(myQuery, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error logging in" });
        }
        if (result.length === 0) {
            return res.status(500).json({ message: "User does not exist" });
        }

        //check and compare password

        const isPasswordValid = await bcrypt.compare(password, result[0].password);
        if (!isPasswordValid) {
            return res.status(500).json({ message: "Invalid password" });
        }

        //create token
        const token = await jwt.sign({
            id: result[0].id,
            email: result[0].email,
            role: result[0].role
        }, 'secretKey', { expiresIn: '1h' });

        return res.status(200).json({ message: "Login successful", token });
    })

})

//logout

app.post('/api/logout', (req, res) => {

    return res.status(200).json({ message: "Logout successful" });
})

app.get('/api/me', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const myQuery = 'SELECT id,name,email,role from users where id = ?'
        db.query(myQuery, [userId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching user' })
            }
            if (result.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            return res.status(200).json({ user: result[0] })
        })
    } catch (error) {
    }
})


app.get('/api/users', verifyToken, checkRole('admin'), async (req, res) => {

    const myQuery = 'SELECT * from users ';

    db.query(myQuery, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching products" });
        }
        return res.status(200).json({ message: 'got users =>', results });
    })

})

app.post('/api/products', verifyToken, checkRole('admin'), async (req, res) => {

    const { name, price, category } = req.body;
    /* CREATE TABLE products (
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(30),
    price int,
    category varchar(30));*/
    const myQuery = 'INSERT INTO products(name,price,category) VALUES(?,?,?)';
    db.query(myQuery, [name, price, category], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error creating product" });
        }
        else {
            return res.status(200).json({ message: "Product created successfully", result });
        }
    })

})

//get products

app.get('/api/products', verifyToken, async (req, res) => {
    const myQuery = 'SELECT * from products';
    db.query(myQuery, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching products" });
        }
        return res.status(200).json({ message: 'got products =>', results });
    })
})

app.get('/api/products/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    const myQuery = 'SELECT * from products where id = ?';
    db.query(myQuery, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching products" });
        }
        return res.status(200).json({ message: 'got product =>', results });
    })
})

app.put('/api/products/:id', verifyToken, checkRole('admin'), (req, res) => {
    const id = req.params.id;
    const { name, price, category } = req.body;
    const myQuery = 'UPDATE products SET name = ?, price = ?, category = ? WHERE id = ?';
    db.query(myQuery, [name, price, category, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error updating product" });
        }
        else {
            return res.status(200).json({ message: "Product updated successfully", result });
        }
    })
})


app.delete('/api/products/:id', verifyToken, checkRole('admin'), async (req, res) => {
    const id = req.params.id;
    const myQuery = 'DELETE FROM products where id = ?';
    db.query(myQuery, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error removing products" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product removed successfully', results });
    })
})
