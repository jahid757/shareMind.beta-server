const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

app.use(bodyParser.json())
app.use(cors())



const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lntcp.mongodb.net/ShareMind?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const userPostCollection = client.db("ShareMind").collection("User");

  app.post("/addPost",(req, res) => {
      const post = req.body
      userPostCollection.insertOne(post)
      .then(result => {
          res.send(result.insertedCount > 0)
      })
  })
  app.get("/post",(req, res) => {
      userPostCollection.find({}).sort({_id:-1})
      .toArray((errors,document) => {
          res.send(document)
      })
  })


    console.log('database connect success');
});










app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen( process.env.PORT || 5000)