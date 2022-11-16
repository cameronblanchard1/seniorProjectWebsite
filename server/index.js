const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');

const db = mysql.createConnection({
    host: "us-cdbr-east-06.cleardb.net", 
    user: "bc776534261b7a",
    password: 'f2bb35e4',
    database: "heroku_907cf6e593e285e"
});

console.log("Connection established")

app.use(cors());
// res.header("Access-Control-Allow-Origin", "https://makingmoviemagic.netlify.app"); 

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//     console.log(res.header)
//   });

app.use(express.json());


app.post('/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://637459fe12e31e7035ce3391--makingmoviemagic.netlify.app/"); // update to match the domain you will make the request from

    const username2 = req.body.username;
    const password2 = req.body.password;
    //checking to make sure user and pass exist
    console.log("hello 1")
    console.log(username2)
    console.log(password2)

   //db.query("SELECT * FROM `SeniorProjectDatabase`.`userInfo` WHERE username = ? AND password = ?", [username2, password2], (err, results) =>    {
    db.query("SELECT username FROM heroku_907cf6e593e285e.userInfo WHERE username = ? AND password = sha2(?, 224)", [username2, password2], (err, results) =>    {
        if (err) {
            res.send({err: err});
        } else{
            if(results.length > 0) {
                res.send(results)
            } else{
                console.log("hello 3")
                res.send({message: "Invalid input. Please try again"})
                console.log(results)
                console.log(res.data)

            }
        }
        console.log(results);
    })

});



app.post("/register", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://637459fe12e31e7035ce3391--makingmoviemagic.netlify.app/"); // update to match the domain you will make the request from
    const username1 = req.body.username;
    const password1 = req.body.password;

    db.query("SELECT * FROM `heroku_907cf6e593e285e`.`userInfo` WHERE username = ?", [username1], (err, results) =>    {
        console.log("in sign up")
        console.log(username1)
        console.log(results)
        if (results.length > 0){
            console.log("this ran")
            res.send("2") 
        } else {
            console.log("in sign up if")
            //const sqlInsert = "INSERT INTO `SeniorProjectDatabase`.`userInfo` (username, password) VALUES (?,?)";
            const sqlInsert ="INSERT INTO heroku_907cf6e593e285e.userInfo (username, password) VALUES (?, SHA2(?, 224))";
            db.query(sqlInsert, [username1, password1], (err, results) => {
                if (err) throw err;
                console.log(username1);  
                res.send("1")  
            }) 
        }
     })


});


app.post("/likes", (req, res) => {
    const movietitle1 = req.body.movietitle;
    const username1 = req.body.username;
    console.log(movietitle1)
    console.log(username1)

    const sqlInsert = "INSERT INTO heroku_907cf6e593e285e.likedMovies (username, movieName) VALUES (?,?)";
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

    const sqlInsert = "INSERT INTO heroku_907cf6e593e285e.dislikedMovies (username, movieName) VALUES (?,?)";
    db.query(sqlInsert, [username1, movietitle1], (err, results) => {
        if (err) throw err;
        console.log("success");
        // console.log(results);
    })
});


app.post("/yourmovies", (req, res) => {
    const username1 = req.body.username3;
    console.log(username1)
    db.query("SELECT * FROM `heroku_907cf6e593e285e`.`likedMovies` WHERE username = ?", [username1], (err, results) =>    {
       console.log(results)
        res.send(results)
    })
});

app.post("/yourdislikes", (req, res) => {
    const username1 = req.body.username3;
    console.log(username1)
    db.query("SELECT * FROM `heroku_907cf6e593e285e`.`dislikedMovies` WHERE username = ?", [username1], (err, results) =>    {
       console.log(results)
        res.send(results)
    })
});

app.post("/pending", (req, res) => {
    const username = req.body.username;
    const pendingfriend = req.body.pendingfriend;
    console.log(username)
    console.log(pendingfriend)

    const sqlInsert = "INSERT INTO heroku_907cf6e593e285e.pendingRequests (senderusername, pendingfriend) VALUES (?, ?)";
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
    db.query("SELECT * FROM heroku_907cf6e593e285e.pendingRequests WHERE pendingfriend = ?", [username], (err, results) =>    {
       console.log("in pending request")
        res.send(results)
    })
});


app.post("/yoursentrequests", (req, res) => {
    const username = req.body.username;
    console.log(username)
    db.query("SELECT * FROM heroku_907cf6e593e285e.pendingRequests WHERE senderusername = ?", [username], (err, results) =>    {
       console.log(results)
        res.send(results)
    })
});


app.post("/yoursentrequests", (req, res) => {
    const username = req.body.username;
    console.log(username)
    db.query("SELECT * FROM heroku_907cf6e593e285e.pendingRequests WHERE senderusername = ?", [username], (err, results) =>    {
       console.log(results)
        res.send(results)
    })
});


app.post("/addfriends", (req, res) => {
    const friend1 = req.body.friend1;
    const friend2 =req.body.friend2;
    // console.log(username)
    const sqlInsert = "INSERT INTO heroku_907cf6e593e285e.friends (friendone, friendtwo) VALUES (?, ?)";
    db.query(sqlInsert, [friend1, friend2], (err, results) => {
        if (err) throw err;
        // res.send(results);
        console.log("successfully added friends");
        // console.log(results);
    })

    const sqlDelete = "DELETE FROM  heroku_907cf6e593e285e.pendingRequests WHERE senderusername = ? AND pendingfriend = ?"
    db.query(sqlDelete, [friend1, friend2], (err, results) => {
        if (err) throw err;
        // res.send(results);
        console.log("successfully deleted from pending");
        // console.log(results);
    })

    const sqlDelete2 = "DELETE FROM  heroku_907cf6e593e285e.pendingRequests WHERE senderusername = ? AND pendingfriend = ?"
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

    const sqlDelete = "DELETE FROM  heroku_907cf6e593e285e.pendingRequests WHERE senderusername = ? AND pendingfriend = ?"
    db.query(sqlDelete, [friend1, friend2], (err, results) => {
        if (err) throw err;
        // res.send(results);
        console.log("successfully deleted from pending");
        // console.log(results);
    })

    const sqlDelete2 = "DELETE FROM  heroku_907cf6e593e285e.pendingRequests WHERE senderusername = ? AND pendingfriend = ?"
    db.query(sqlDelete2, [friend2, friend1], (err, results) => {
        if (err) throw err;
        // res.send(results);
        console.log("successfully deleted from pending");
        // console.log(results);
    })
});

app.post("/getfriendone", (req, res) => {
    const friendone = req.body.friendone;
    // console.log(friendone)
    db.query("SELECT * FROM heroku_907cf6e593e285e.friends WHERE friendone = ?", [friendone], (err, results) =>    {
        console.log("in friend one")
       console.log(results)
        res.send(results)
    })
});

app.post("/getfriendtwo", (req, res) => {
    const friendtwo = req.body.friendtwo;
    // console.log(friendtwo)
    db.query("SELECT * FROM heroku_907cf6e593e285e.friends WHERE friendtwo = ?", [friendtwo], (err, results) =>    {
        console.log("in friend two")
       console.log(results)
        res.send(results)
    })
});


app.listen(process.env.PORT || 8080, () => {
    console.log("Server running");
});




// app.listen(8080, () => {
//     console.log("Listening on port 3001");
// });