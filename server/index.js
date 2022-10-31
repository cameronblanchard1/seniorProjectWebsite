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

//turing branch
//password encryption


//if so, allow into site

app.post('/login', (req, res) => {
    const username2 = req.body.username;
    const password2 = req.body.password;
    //checking to make sure user and pass exist
    console.log("hello 1")
    console.log(username2)
    console.log(password2)
    const sqlSelect = "SELECT * FROM `SeniorProjectDatabase`.`userInfo` WHERE username = ? AND password = ?";

   db.query("SELECT * FROM `SeniorProjectDatabase`.`userInfo` WHERE username = ? AND password = ?", [username2, password2], (err, results) =>    {

        if (err) {
            res.send({err: err});
        } else{
            if(results.length > 0) {
                console.log("HELLO")
                res.send(results)
            } else{
                console.log("hello 3")
                res.send({message: "Invalid input. Please try again"})
                console.log(res.data)

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

// app.listen(3001, () => {
//     console.log("Listening on port 3001");
// });

// app.get("/", (req, res) => {
    //testing to make sure the database properly connected
    // const sqlInsert = "INSERT INTO `SeniorProjectDatabase`.`userInfo` (`username`, `password`) VALUES ('innode', 'testingautoincrement');"
    // db.query(sqlInsert, (err, results) => {
    //     if (err) throw err;
    //     res.send(results);
    // })

// });

app.post("/likes", (req, res) => {
    const movietitle1 = req.body.movietitle;
    const username1 = req.body.username;
    console.log(movietitle1)
    console.log(username1)

    const sqlInsert = "INSERT INTO SeniorProjectDatabase.likedMovies (username, movieName) VALUES (?,?)";
    db.query(sqlInsert, [username1, movietitle1], (err, results) => {
        if (err) throw err;
        console.log("success");
        // console.log(results);
    })
});

app.post("/dislikes", (req, res) => {
    const movietitle1 = req.body.movietitle;
    const username1 = req.body.username;
    console.log(movietitle1)
    console.log(username1)

    const sqlInsert = "INSERT INTO SeniorProjectDatabase.dislikedMovies (username, movieName) VALUES (?,?)";
    db.query(sqlInsert, [username1, movietitle1], (err, results) => {
        if (err) throw err;
        console.log("success");
        // console.log(results);
    })
});


app.post("/yourmovies", (req, res) => {
    const username1 = req.body.username3;
    console.log(username1)
    db.query("SELECT * FROM `SeniorProjectDatabase`.`likedMovies` WHERE username = ?", [username1], (err, results) =>    {
       console.log(results)
        res.send(results)
    })
});

app.post("/yourdislikes", (req, res) => {
    const username1 = req.body.username3;
    console.log(username1)
    db.query("SELECT * FROM `SeniorProjectDatabase`.`dislikedMovies` WHERE username = ?", [username1], (err, results) =>    {
       console.log(results)
        res.send(results)
    })
});

app.post("/pending", (req, res) => {
    const username = req.body.username;
    const pendingfriend = req.body.pendingfriend;
    console.log(username)
    console.log(pendingfriend)

    const sqlInsert = "INSERT INTO SeniorProjectDatabase.pendingRequests (senderusername, pendingfriend) VALUES (?, ?)";
    db.query(sqlInsert, [username, pendingfriend], (err, results) => {
        if (err) throw err;
        res.send(results);
        console.log("success");
        // console.log(results);
    })
});


app.post("/yourpendingrequests", (req, res) => {
    const username = req.body.username;
    console.log(username)
    db.query("SELECT * FROM SeniorProjectDatabase.pendingRequests WHERE pendingfriend = ?", [username], (err, results) =>    {
       console.log("in pending request")
        res.send(results)
    })
});


app.post("/yoursentrequests", (req, res) => {
    const username = req.body.username;
    console.log(username)
    db.query("SELECT * FROM SeniorProjectDatabase.pendingRequests WHERE senderusername = ?", [username], (err, results) =>    {
       console.log(results)
        res.send(results)
    })
});


app.post("/yoursentrequests", (req, res) => {
    const username = req.body.username;
    console.log(username)
    db.query("SELECT * FROM SeniorProjectDatabase.pendingRequests WHERE senderusername = ?", [username], (err, results) =>    {
       console.log(results)
        res.send(results)
    })
});


app.post("/addfriends", (req, res) => {
    const friend1 = req.body.friend1;
    const friend2 =req.body.friend2;
    // console.log(username)
    const sqlInsert = "INSERT INTO SeniorProjectDatabase.friends (friendone, friendtwo) VALUES (?, ?)";
    db.query(sqlInsert, [friend1, friend2], (err, results) => {
        if (err) throw err;
        // res.send(results);
        console.log("successfully added friends");
        // console.log(results);
    })

    const sqlDelete = "DELETE FROM  SeniorProjectDatabase.pendingRequests WHERE senderusername = ? AND pendingfriend = ?"
    db.query(sqlDelete, [friend1, friend2], (err, results) => {
        if (err) throw err;
        // res.send(results);
        console.log("successfully deleted from pending");
        // console.log(results);
    })

    const sqlDelete2 = "DELETE FROM  SeniorProjectDatabase.pendingRequests WHERE senderusername = ? AND pendingfriend = ?"
    db.query(sqlDelete2, [friend2, friend1], (err, results) => {
        if (err) throw err;
        // res.send(results);
        console.log("successfully deleted from pending");
        // console.log(results);
    })
});



app.post("/rejectrequest", (req, res) => {
    const friend1 = req.body.friend1;
    const friend2 =req.body.friend2;
    // console.log(username)

    const sqlDelete = "DELETE FROM  SeniorProjectDatabase.pendingRequests WHERE senderusername = ? AND pendingfriend = ?"
    db.query(sqlDelete, [friend1, friend2], (err, results) => {
        if (err) throw err;
        // res.send(results);
        console.log("successfully deleted from pending");
        // console.log(results);
    })

    const sqlDelete2 = "DELETE FROM  SeniorProjectDatabase.pendingRequests WHERE senderusername = ? AND pendingfriend = ?"
    db.query(sqlDelete2, [friend2, friend1], (err, results) => {
        if (err) throw err;
        // res.send(results);
        console.log("successfully deleted from pending");
        // console.log(results);
    })




});









app.listen(3001, () => {
    console.log("Listening on port 3001");
});