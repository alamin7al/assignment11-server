//HUfLi3LHdZNMXiOE
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const { query } = require('express');
const app = express();
const port =process.env.PORT|| 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ow5x2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect()
        const database = client.db('tourListsT')
        const tourCollection = database.collection('toursist')

        const database2 = client.db('travel')
        const dataCollection = database2.collection('traveldata')

        //  //get All Products
        app.get('/toursist', async (req, res) => {
            const id = tourCollection.find({})
            const result = await id.toArray()
            res.json(result)
        })
        app.get('/orders', async (req, res) => {
            const id = tourCollection.find({})
            const result = await id.toArray()
            res.json(result)
        })
        //Add Events
        app.post('/toursist', async (req, res) => {
            const service = req.body;
            console.log('hit the post api', service);

            const result = await tourCollection.insertOne(service);
            console.log(result);
            res.json(result)
        });
        
        //order
        app.post('/traveldata', async (req, res) => {
            const order = req.body
            const result = await dataCollection.insertOne(order)
            res.json(result)

        })
        app.get('/traveldata', async (req, res) => {
            const id = dataCollection.find({})
            console.log(id);
            const result = await id.toArray()
            console.log(result);
            res.json(result)

        })
        app.get('/traveldata/:id', async (req, res) => {
            const user = req.params.id
            const quarry = { _id: ObjectId(user) }
            const result = await dataCollection.findOne(quarry)
            res.json(result)

        })

        app.get('/single/:id', async (req, res) => {

            const user = req.params.id
            const quarry = { _id: ObjectId(user) }
            const result = await tourCollection.findOne(quarry)
            res.json(result)
        })

        //myorder id
        // app.get('/myorderdata/:id', async (req, res) => {
        //     const user = req.params.id
        //     console.log(user);
        //     const quarry = { _id: ObjectId(user) }
        //     const result = await tourCollection.findOne(quarry)
        //     console.log(result);
        //     res.send(result)
        // })

        //delet product
        app.delete('/productD/:id', async (req, res) => {
            const id = req.params.id
            const quarry = { _id: ObjectId(id) }
           
            const deleting = await dataCollection.deleteOne(quarry)
            res.json(deleting)
          
        })
        //orders
        app.get('/order', async (req, res) => {
            const user = tourCollection.find({})
            const result =await user.toArray()
            res.json(result)
        })

    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Running my CRUD Server');
});

app.listen(port, () => {
    console.log('Running Server on port', port);
})
