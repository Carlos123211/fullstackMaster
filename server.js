
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

app.get('/', (req, resp) => {
    resp.json({ "hello": "world" });
});

app.get('/collections', async (req, resp) => {
    const documents = dbo.collection('calls');
    //Show all documents in the collection
    const cursor = documents.find({})
    //Validate if the collection has documents
    if ((await cursor.count()) === 0) {
        resp.send('Documents not found!!')
    }

    cursor.toArray().then((ans) => {
        resp.send(ans)
    })
})


app.put('/collections/:id', async (req, resp) => {
    const hex = /[0-9A-Fa-f]{6}/g
    const query = {
        message: req.body?.message,
        scope: req.body?.scope,
        host: req.body?.host,
        date: req.body?.message,
        location: req.body?.location
    }

    const documents = dbo.collection('calls');

    if (req.params.id.toString().trim() === '') {
        resp.status(400).json({ error: 'Id no ingresado' })
    } else {
        if (hex.test(req.params.id)) {
            documents.findOne({ _id: mongodb.ObjectId(req.params?.id) }).then((doc) => {
                if (doc) {
                    documents.update({ _id: mongodb.ObjectId(req.params?.id) }, { $set: query })
                        .then((docu) => {
                            console.log(docu)
                            resp.status(200).send("Updated Successfully")
                        })

                } else {
                    dbo.collection("calls").insertOne(query, (err, res) => {
                        if (err) throw err;
                        resp.status(201).send('Created new document')
                    })
                }
            })
        } else {
            dbo.collection("calls").insertOne(query, (err, res) => {
                if (err) throw err;
                resp.status(201).send('Created new document')
            })
        }
    }



    //const calls = await documents.findOne(query, {});

    //res.send(calls)
})

app.post('/create', (req, resp) => {

    let myobj = {
        message: req.body?.message,
        scope: req.body?.scope,
        host: req.body?.host,
        date: req.body?.message,
        location: req.body?.location
    };

    dbo.collection("calls").insertOne(myobj, (err, res) => {
        if (err) throw err;
    })

    resp.send('Added successfully')
})

app.listen(PORT, function () {

    console.log('Your node js server is running on PORT:', PORT);
});