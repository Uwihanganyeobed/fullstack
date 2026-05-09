
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");


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

//get checking health of server

app.get('/', (req, res) => {
    res.send("Server is running")
});
app.get("/students", (req, res) => {
    db.query("SELECT * FROM students ", (err, result) => {
        if (err) {
            console.error("fail")
        }
        else {
            res.send(result)
        }
    }
    ) 
})


app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees ", (err, result) => {
        if (err) {
            console.error("fail")
        }
        else {
            res.send(result)
        }
    }
    ) 
})

app.post("/employees", (req, res) => {
    const { empname,empage,empsalary,empdept } = req.body;
    const sql = "INSERT INTO employees(empname,empage,empsalary,empdept)VALUE(?,?,?,?)";
    db.querry(sql,)
});

app.post("/students", (req, res) => {
    const { name, email } = req.body;
    const sql = "INSERT INTO students(name,email)VALUE(?,?)";
    db.querry(sql,)
});

//start server

app.listen(5000, () => {
    console.log("server is running on port 5000");
});