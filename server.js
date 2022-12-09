
const express = require('express');
const app = express();
const mongodb = require('mongodb');
const bodyParser = require("body-parser");

const config = require('./db');
const PORT = 4000;
const client = mongodb.MongoClient;
let dbo;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

client.connect(config.DB, { useNewUrlParser: true }, function (err, db) {
    if (err) {
        console.log('database is not connected')
    }
    else {
        dbo = db.db("mongo-fullstack");

        console.log('connected!!')
    }
});

app.get('/', function (req, res) {
    res.json({ "hello": "world" });
});

app.post('/create', function (req, res) {
    console.log('requerimientos', req.body)
    let myobj = { message: req.body.message, scope: req.body.scope, host: req.body.host, date: req.body.message, location: req.body.location };
    dbo.collection("calls").insertOne(myobj, (err, res) => {
        if (err) throw err;
        console.log(myobj)
        console.log(res)
        console.log('DOcument inserted in database');
    })
    res.send('Added successfully')
})

app.listen(PORT, function () {

    console.log('Your node js server is running on PORT:', PORT);
});