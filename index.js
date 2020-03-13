//Import express framework
const express = require("express")
//Initialize server object
const app = express()
const sqlite3 = require('sqlite3').verbose();
 
// open the database
let db = new sqlite3.Database('./db/data.db');
 
//Parse request data coming in
app.use(express.json())
//Serve ‘public’ folder as static website
app.use( express.static('public') )

app.get("/songs", (req, res) => {
    let sql = `SELECT * FROM songs`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
          //nothing for each row
        });
        console.log("GET /songs - songs sent to user");
        res.send(rows);
    });
})

app.get("/users", (req, res) => {
    let sql = `SELECT * FROM users`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
          //nothing for each row
        });
        console.log("GET /users - users sent to user");
        res.send(rows);
    });
})

app.get("/songs_users", (req, res) => {
    let sql = `SELECT * FROM songs_users`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
          //nothing for each row
        });
        res.send(rows);
    });
})

app.post("/addSong", (req, res) => {
    const newSong = req.body.newSong
    const sql = `INSERT INTO songs (name, artist) VALUES (?, ?)`
    const values = [newSong.name, newSong.artistName]
    let songID
    db.run(sql, values, function (err) {
        if (err)
            console.log(err)
        else {            
            console.log(`songid ${this.lastID} created`)
        }
    })
    
    res.json({
        message: 'Song added',
        songID: songID 
    })
})

app.post("/addUser", (req, res) => {
    const user = req.body.user
    const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`
    const values = [user.username, user.email, user.password]
    let userID
    db.run(sql, values, function (err) {
        if (err)
            console.log(err)
        else {            
            console.log(`userid ${this.lastID} created`)
        }
    })
    
    res.json({
        message: 'User added',
        userID: userID 
    })
})

app.post("/login", (req, res) => {
    const user = req.body.user
    const sql = `SELECT userID FROM users WHERE username=? AND password=?`
    const values = [user.username, user.password]
    let userID
    
    db.all(sql, values, (err, rows) => {
        //rows is an array from the SQL data base
        if (err) {
            throw err;
        }
        
        //rows.forEach((row) => {
          //nothing for each row
        //});
        //if no user
        if (rows.length == 0) {
            res.status(404)
            res.json({
                message: 'No such user',
                userID: null
            })
           //if user 
        } else {
            res.status(200)
            res.json({
                message: 'User logged in!',
                userID: rows[0].userID
            })
        }
    });
})

//Listens for web requests
app.listen(80, () => console.log("Server started") )