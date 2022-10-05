const express = require("express");
const app = express();
const mysql = require("mysql");


const db = mysql.createPool({
    host: "localhost", 
    user: "root", 
    // password: 'password', 
    database: "SeniorProjectDatabase"
});

app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO userInfo (username, password) VALUES ('cameron', 'test');"
    db.query(sqlInsert, (err, result) => {
        res.send("hello");
    })
});


app.listen(3001, () => {
    console.log("Listening on port 3001");
});