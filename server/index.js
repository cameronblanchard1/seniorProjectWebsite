//requiring all express, cors, and sql dependencies needed for this site
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');

//establishing database connection
const db = mysql.createConnection({
    host: "us-cdbr-east-06.cleardb.net", 
    user: "bc776534261b7a",
    password: 'f2bb35e4',
    database: "heroku_907cf6e593e285e"
});

console.log("Connection established")

//setting an interval to keep the connection running on heroku, it goes down and must be completely restarted after
//several minutes of inactivity
setInterval(function () {
    db.query('SELECT 1');
}, 5000);


//requiring and express
app.use(cors());
app.use(express.json());

//login function for database querying
app.post('/login', (req, res) => {
    const username2 = req.body.username;
    const password2 = req.body.password;

    //checking to make sure user actually exists before logging in
    db.query("SELECT username FROM heroku_907cf6e593e285e.userinfo WHERE username = ? AND password = sha2(?, 224)", [username2, password2], (err, results) =>    {
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



//sign up function for database query
app.post("/register", (req, res) => {
    const username1 = req.body.username;
    const password1 = req.body.password;

    //making sure the username isnt taken
    db.query("SELECT * FROM `heroku_907cf6e593e285e`.`userinfo` WHERE username = ?", [username1], (err, results) =>    {
        console.log("in sign up")
        console.log(username1)
        console.log(results)
        if (results.length > 0){
            console.log("this ran")
            res.send("2") 
        } else {
            console.log("in sign up if")

            //if username isn't taken, inserting into db.
            const sqlInsert ="INSERT INTO heroku_907cf6e593e285e.userinfo (username, password) VALUES (?, SHA2(?, 224))";

            
            db.query(sqlInsert, [username1, password1], (err, results) => {
                if (err) throw err;
                console.log(username1);  
                res.send("1")  
            }) 
        }
     })
});



//function to like a movie
app.post("/likes", (req, res) => {
    const movietitle1 = req.body.movietitle;
    const username1 = req.body.username;
    console.log(movietitle1)
    console.log(username1)

    //on click, movie name and username are inserted into db
    const sqlInsert = "INSERT INTO heroku_907cf6e593e285e.likedMovies (username, movieName) VALUES (?,?)";
    db.query(sqlInsert, [username1, movietitle1], (err, results) => {
        if (err) throw err;
        console.log("success");
        // console.log(results);
    })
});


//function to dislike a movie
app.post("/dislikes", (req, res) => {
    const movietitle1 = req.body.movietitle;
    const username1 = req.body.username;
    console.log(movietitle1)
    console.log(username1)

    //on click, movie name and username are inserted into db
    const sqlInsert = "INSERT INTO heroku_907cf6e593e285e.dislikedMovies (username, movieName) VALUES (?,?)";
    db.query(sqlInsert, [username1, movietitle1], (err, results) => {
        if (err) throw err;
        console.log("success");
        // console.log(results);
    })
});


//function to select liked movies
app.post("/yourmovies", (req, res) => {
    const username1 = req.body.username3;
    console.log(username1)
    db.query("SELECT DISTINCT moviename FROM `heroku_907cf6e593e285e`.`likedMovies` WHERE username = ?", [username1], (err, results) =>    {
       console.log(results)
        res.send(results)
    })
});

//function to select disliked movies
app.post("/yourdislikes", (req, res) => {
    const username1 = req.body.username3;
    console.log(username1)
    db.query("SELECT  DISTINCT moviename FROM `heroku_907cf6e593e285e`.`dislikedMovies` WHERE username = ?", [username1], (err, results) =>    {
       console.log(results)
        res.send(results)
    })
});

//function to send a friend request
app.post("/pending", (req, res) => {
    const username = req.body.username;
    const pendingfriend = req.body.pendingfriend;
    console.log(username)
    console.log(pendingfriend)


    //making sure entered username is real 
    db.query("SELECT * FROM `heroku_907cf6e593e285e`.`userinfo` WHERE username = ?", [pendingfriend], (err, results) =>    {
        console.log(username)
        console.log(results)
        if (results.length > 0){
            //if so, inserting into pending request
            const sqlInsert = "INSERT INTO heroku_907cf6e593e285e.pendingRequests (senderusername, pendingfriend) VALUES (?, ?)";
            db.query(sqlInsert, [username, pendingfriend], (err, results) => {
                if (err) throw err;
                res.send("2");
                console.log("success");
                // console.log(results);
            })
        } else {
            res.send("1")
        }
     })




});

//function to grab pending requests to display
app.post("/yourpendingrequests", (req, res) => {
    const username = req.body.username;
    console.log(username)
    db.query("SELECT * FROM heroku_907cf6e593e285e.pendingRequests WHERE pendingfriend = ?", [username], (err, results) =>    {
       console.log("in pending request")
        res.send(results)
    })
});

//function to sent pending requests to display
app.post("/yoursentrequests", (req, res) => {
    const username = req.body.username;
    console.log(username)
    db.query("SELECT * FROM heroku_907cf6e593e285e.pendingRequests WHERE senderusername = ?", [username], (err, results) =>    {
       console.log(results)
        res.send(results)
    })
});


//functtion to add friends
app.post("/addfriends", (req, res) => {
    const friend1 = req.body.friend1;
    const friend2 =req.body.friend2;
    // console.log(username)
    
    //inserts the usernames of the friends into friend table
    const sqlInsert = "INSERT INTO heroku_907cf6e593e285e.friends (friendone, friendtwo) VALUES (?, ?)";
    db.query(sqlInsert, [friend1, friend2], (err, results) => {
        if (err) throw err;
        // res.send(results);
        console.log("successfully added friends");
        // console.log(results);
    })

    //deletes the friends from the pending requests table so it is no longer displayed
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



//function to reject requests
app.post("/rejectrequest", (req, res) => {
    const friend1 = req.body.friend1;
    const friend2 =req.body.friend2;
    // console.log(username)

    //deletes usernames from pending requests tables
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


//functions to display the friends on friends page
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


//function to delete a liked movie
app.post("/removelike", (req, res) => {
    const name = req.body.name;
    const moviename = req.body.moviename;
    console.log("helloo in remove likes")
    console.log(name)
    console.log(moviename)
    db.query("DELETE FROM heroku_907cf6e593e285e.likedmovies WHERE username = ? AND movieName = ?", [name, moviename], (err, results) =>    {
       console.log(results)
        res.send(results)
    })
});

//function to delete a disliked movie
app.post("/removedislike", (req, res) => {
    const name = req.body.name;
    const moviename = req.body.moviename;
    console.log("helloo in remove dislikes")
    console.log(name)
    console.log(moviename)
    db.query("DELETE FROM heroku_907cf6e593e285e.dislikedmovies WHERE username = ? AND movieName = ?", [name, moviename], (err, results) =>    {
       console.log(results)
        res.send(results)
    })
});

//function to remove a friend
app.post("/removefriend", (req, res) => {
    const user = req.body.user;
    const friend = req.body.friend;
    console.log("helloo in friend remove")
    console.log(user)
    console.log(friend)
    db.query("DELETE FROM heroku_907cf6e593e285e.friends WHERE friendone = ? AND friendtwo = ?", [user, friend], (err, results) =>    {
       console.log(results)
        // res.send(results)
    })
    db.query("DELETE FROM heroku_907cf6e593e285e.friends WHERE friendtwo = ? AND friendone = ?", [user, friend], (err, results) =>    {
        console.log(results)
        //  res.send(results)
     })



});




//setting heroku's environment port to listen on
app.listen(process.env.PORT || 8080, () => {
    console.log("Server running");
});

