const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    //might have to change this to turing when launching on turing server, check old notes from last year
    host: "localhost",
    password: "",
    database: "LoginSystem"
});

app.listen(3000, () => {
    console.log("running on port 3000");
});