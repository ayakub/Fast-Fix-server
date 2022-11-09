const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, Db } = require('mongodb');
const { ObjectID } = require('bson');
const port = process.env.PORT || 5000;
require('dotenv').config()
const app = express()

// middleware
app.use(cors())
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@sickcluster.nqy80.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        const serviceCollection = client.db('mobileRepair').collection('services');
        const reviewCollection = client.db('mobileRepair').collection('reviews')

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const result = await cursor.limit(3).toArray();
            res.send(result)
        })

        app.get('/services/all', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
        app.get('/services/all/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectID(id) };
            const result = await serviceCollection.findOne(query);
            res.send(result)

        })
        app.get('/reviews', async (req, res) => {
            let query = {};
            if (req.query.service) {
                query = {
                    service: req.query.service
                }
            }
            const cursor = reviewCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        })


        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })





    }
    finally {

    }

}
run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('server is running')
})
app.listen(port, () => {
    console.log(`server is running on ${port}`)
})