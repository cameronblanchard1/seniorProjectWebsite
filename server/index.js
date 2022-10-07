const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: 'password',
    database: "SeniorProjectDatabase"
});

app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}));

//logic for login
//select all usernames
//make sure entered username matches one of the usernames inside
//if not, print error
//if so, allow into site

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    //checking to make sure user and pass exist
    const sqlSelect = "SELECT * FROM `SeniorProjectDatabase`.`userInfo` WHERE username = ? AND password = ?)";
    db.query(sqlSelect, [username, password], (err, results) => {
        if (err) {
            res.send({err: err});
        } else{
            if(results.length > 0) {
                res.send(results)
            } else{
                res.send({message: "Invalid input. Please try again"})
            }
        }
        console.log(results);
    })
});



//remaining logic for sign up
//make sure the username isnt already taken
//if not, THEN insert and allow into site
//remove form from  url



app.post("/register", (req, res) => {
    const username1 = req.body.username;
    const password1 = req.body.password;
    const sqlInsert = "INSERT INTO `SeniorProjectDatabase`.`userInfo` (username, password) VALUES (?,?)";
    db.query(sqlInsert, [username1, password1], (err, results) => {
        if (err) throw err;
        console.log(username1);
        // console.log(results);
    })
});

app.listen(3001, () => {
    console.log("Listening on port 3001");
});

// app.get("/", (req, res) => {
    //testing to make sure the database properly connected
    // const sqlInsert = "INSERT INTO `SeniorProjectDatabase`.`userInfo` (`username`, `password`) VALUES ('innode', 'testingautoincrement');"
    // db.query(sqlInsert, (err, results) => {
    //     if (err) throw err;
    //     res.send(results);
    // })

// });