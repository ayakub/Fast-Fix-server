const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, Db } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json());




const uri = "mongodb+srv://<username>:<password>@sickcluster.nqy80.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const userCollection = client.db('practice-crud').collection('users')

async function run() {

}
run().catch(err => { console.log(err) })


app.get('/', (req, res) => {
    res.send('server is running')
})
app.listen(port, () => {
    console.log(`server is running on ${port}`)
})